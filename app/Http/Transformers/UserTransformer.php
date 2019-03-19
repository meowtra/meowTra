<?php

namespace App\Http\Transformers;

use App\Models\User;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{
    public function transform(User $user)
    {
        return [
            'id' => (int) $user->id,
            'email' => $user->email,
            'nickname' => $user->nickname,
            'avatar' => $user->avatar,
            'is_verified' => (boolean) $user->hasVerifiedEmail(),
            //'is_banned' => (boolean) $user->isBanned(),
        ];
    }
}
