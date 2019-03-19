@component('mail::message')
# 邮箱验证码

{{ $token }} (为了保障您帐号的安全性，请在{{ $expire / 60 }}小时内完成验证。)

Thanks,<br>
{{ config('app.name') }}
@endcomponent
