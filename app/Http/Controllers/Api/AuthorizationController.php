<?php

namespace App\Http\Controllers\Api;

use Auth;
use Password;
use App\Proxy\HttpKernelProxy;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Requests\Api\RegisterRequest;
use App\Http\Requests\Api\SendVerifyEmailRequest;
use App\Http\Requests\Api\SendResetEmailRequest;
use App\Http\Requests\Api\ResetPasswordRequest;
use App\Http\Transformers\UserTransformer;
use App\Events\LoginEvent;
use App\Mail\SendVerifyEmail;

class AuthorizationController extends BaseController
{
    use ThrottlesLogins;

    const CACHE_KEY_ACTIVE_EMAIL = 'activation_token:';

    /**
     * A tool for proxying requests to the existing application.
     *
     * @var HttpKernelProxy
     */
    protected $proxy;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(HttpKernelProxy $proxy)
    {
        $this->middleware('auth:api', ['except' => [
            'login',
            'register',
            'sendVerifyEmail',
            'sendResetEmail',
            'resetPassword'
        ]]);
        $this->proxy = $proxy;
    }

    /**
     * Get the login username to be used by the controller.
     *
     * @return string
     */
    public function username()
    {
        return 'email';
    }

    public function login(LoginRequest $request)
    {
        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        return $this->requestPasswordGrant($request);
    }

    public function register(RegisterRequest $request)
    {
        // 验证邮箱激活码
        $tokenKey = static::CACHE_KEY_ACTIVE_EMAIL.$request->token;
        $tokenData = Cache::get($tokenKey);

        if (!$tokenData) {
            return $this->response->error('激活码不合法或已失效，您可以尝试重发激活邮件', 400);
        }

        if (!hash_equals($tokenData, $request->email)) {
            return $this->response->error('激活码错误', 400);
        }

        // 删除激活码缓存
        Cache::forget($tokenKey);

        $user = User::create([
            'email'    => $request->email,
            'nickname' => $request->nickname,
            'password' => bcrypt($request->password),
        ]);

        // 标记为已激活
        $user->markEmailAsVerified();

        return $this->requestPasswordGrant($request)->setStatusCode(201);
    }

    public function sendVerifyEmail(SendVerifyEmailRequest $request)
    {
        $email = $request->email;

        // 获取token超时时间
        $tokenExpire = Arr::get(config('auth.verify'), 'users.expire') * 60;
        // 生成激活的token
        $token = Str::random(6);

        // 放置token到cache中等待验证
        Cache::put(static::CACHE_KEY_ACTIVE_EMAIL.$token, $email, $tokenExpire);

        // 发送激活邮件
        Mail::to($email)->queue(new SendVerifyEmail($token));
        
        return $this->response->array([
            'status_code' => 200,
            'message' => 'success',
            'code' => 0
        ]);
    }

    public function sendResetEmail(SendResetEmailRequest $request)
    {
        $sendingResponse = $this->broker()->sendResetLink(
            $request->only('email')
        );

        if ($sendingResponse == Password::INVALID_USER) {
            return $this->response->errorNotFound('该账号不存在');
        }

        if ($sendingResponse !== Password::RESET_LINK_SENT) {
            return $this->response->error('发送失败', 500);
        }

        return $this->response->array([
            'status_code' => 200,
            'message' => '邮件发送成功',
            'code' => 0
        ]);
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $response = $this->broker()->reset(
            $request->only(
                'email',
                'password',
                'password_confirmation',
                'token'
            ),
            function ($user, $password) {
                $user->password = bcrypt($password);
                $user->updated_at = now();
                $user->save();

                event(new PasswordReset($user));

                $this->guard()->login($user);

                event(new LoginEvent($user)); //触发login事件
            }
        );

        if ($response !== Password::PASSWORD_RESET) {
            if ($response == Password::INVALID_USER) {
                return $this->response->errorNotFound('邮箱错误');
            }
            if ($response == Password::INVALID_TOKEN) {
                return $this->response->errorBadRequest('token已失效，请重试');
            }
        }

        return $this->response->array([
            'status_code' => 200,
            'message' => '密码重置成功',
            'code' => 0
        ]);
    }

    /**
     * Refresh an access token.
     *
     */
    public function refresh(Request $request)
    {
        $token = $request->cookie('refresh_token');

        if (!$token) {
            return $this->response->errorBadRequest('missing refresh token');
        }

        $response = $this->proxy->postJson('oauth/token', [
            'client_id' => config('auth.proxy.client_id'),
            'client_secret' => config('auth.proxy.client_secret'),
            'grant_type' => 'refresh_token',
            'refresh_token' => $token,
            'scopes' => '[*]',
        ]);

        if ($response->isSuccessful()) {
            return $this->respondWithToken($response);
        }

        return $this->response->error($response->getContent(), $response->getStatusCode());
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function logout()
    {
        if (!empty($this->user())) {
            $this->user()->token()->revoke();
            return $this->response->array([
                'status_code' => 204,
                'message' => '登出成功',
                'code' => 0
            ]);
        } else {
            return $this->response->errorUnauthorized('The token is invalid.');
        }
    }

    /**
     * Create a new access token from a password grant client.
     *
     */
    public function requestPasswordGrant(Request $request)
    {
        $response = $this->proxy->postJson('oauth/token', [
            'client_id' => config('auth.proxy.client_id'),
            'client_secret' => config('auth.proxy.client_secret'),
            'grant_type' => config('auth.proxy.grant_type'),
            'username' => $request->email,
            'password' => $request->password,
            'scopes' => '[*]'
        ]);

        if ($response->isSuccessful()) {
            $this->clearLoginAttempts($request);
            return $this->respondWithToken($response);
        }

        $this->incrementLoginAttempts($request);
        
        return $this->response->error($response->getContent(), $response->getStatusCode());
    }

    /**
     * Return a successful response for requesting an api token.
     *
     */
    public function respondWithToken($response)
    {
        $data = json_decode($response->getContent());

        return $this->response->array([
            'access_token' => $data->access_token,
            'token_type' => $data->token_type,
            'expires_in' => $data->expires_in
        ]);
    }

    public function me()
    {
        return $this->response->item($this->user(), new UserTransformer);
    }

    public function broker()
    {
        return Password::broker();
    }
}
