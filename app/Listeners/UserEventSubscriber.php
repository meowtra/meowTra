<?php

namespace App\Listeners;

use App\Events\LoginEvent;
use App\Models\User;
use Carbon\Carbon;

class UserEventSubscriber
{
    /**
     * 为订阅者注册监听器。
     *
     * @param  Illuminate\Events\Dispatcher  $events
     */
    public function subscribe($events)
    {
        $events->listen(
            'App\Events\LoginEvent',
            'App\Listeners\UserEventSubscriber@onUserLogin'
        );
    }

    /**
     * 处理用户登录事件。
     */
    public function onUserLogin(LoginEvent $event)
    {
        $user = $event->user;
        $user->save();
    }
}
