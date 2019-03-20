@component('mail::message')
# 重置密码
我们刚刚收到了您的密码重置请求，并为您的账号奋力生成了一个密码重置链接，请点击下面的链接重置您的密码，链接将在 **{{ $expire / 60 }}** 个小时之后失效：

@component('mail::button', ['url' => url(config('app.url').'/password/reset/'.$token), 'color' => 'red'])
{{ url(config('app.url').'/password/reset/'.$token) }}
@endcomponent

@component('mail::subcopy')
如果链接不能正常显示，请复制上面的链接到浏览器的地址栏后访问。
@endcomponent
@endcomponent
