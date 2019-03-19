<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', [
    'namespace' => 'App\Http\Controllers\Api'
], function ($api) {
    // 获取api版本
    $api->get('version', function () {
        return response('this is version v1');
    });
    // 用户授权相关接口
    $api->group([
        'prefix' => 'auth'
    ], function ($api) {
        // 获取登录用户信息
        $api->get('me', 'AuthorizationController@me');
        // 用户登录
        $api->post('login', 'AuthorizationController@login');
        // 用户注册
        $api->group([
            'middleware' => 'api.throttle',
            'limit' => config('api.rate_limits.register.limit'),
            'expires' => config('api.rate_limits.register.expires'),
        ], function($api) {
            $api->post('register', 'AuthorizationController@register');
        });
        // 发送邮箱激活码，并限制发送频率
        $api->group([
            'middleware' => 'api.throttle',
            'limit' => config('api.rate_limits.verify.limit'),
            'expires' => config('api.rate_limits.verify.expires'),
        ], function($api) {
            $api->post('sendVerifyEmail', 'AuthorizationController@sendVerifyEmail');
        });
        // 退出登录
        $api->get('logout', 'AuthorizationController@logout');
        // 刷新token
        $api->post('refresh', 'AuthorizationController@refresh');
        // 找回密码
        $api->post('recovery', 'AuthorizationController@sendResetEmail');
        // 重设密码
        $api->post('reset', 'AuthorizationController@resetPassword');
    });
    // 用户相关接口
    $api->group([
        'prefix' => 'user'
    ], function ($api) {
        // 获取用户信息
        $api->get('info', 'UsersController@info');
    });
});
