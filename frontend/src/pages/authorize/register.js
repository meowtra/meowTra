import API from '@/api'

const EMAIL_SEND = 2
const EMAIL_SENDING = 1
const EMAIL_UNSEND = 0

const largeFormControl = {
  render() {
    return (
      <input
        class="form-control form-control-lg"
        onInput={this.onInput}
        onChange={this.onChange}
      />
    )
  },
  methods: {
    onInput(e) {
      this.$emit('input', e)
    },
    onChange(e) {
      this.$emit('change', e)
    }
  }
}

const formGroup = {
  functional: true,
  props: {
    label: String
  },
  render(h, context) {
    return (
      <div class="form-group">
        <label>{context.props.label}</label>
        {context.children}
      </div>
    )
  }
}

export default {
  name: 'page-register',
  components: {
    formGroup,
    largeFormControl
  },
  data() {
    return {
      emailSend: EMAIL_UNSEND,
      pendding: false,
      formData: {
        email: '',
        pwd1: '',
        pwd2: '',
        verify: '',
        nickname: ''
      }
    }
  },
  render() {
    return (
      <div>
        <br/>
        <form action="">
          <div class="row align-items-center justify-content-center">
            <div class="col-xs-12 col-sm-10 col-md-10 col-lg-6 col-xl-6">
              <h1 class="display-4 mb-3">注册</h1>
              <div class="form-group">
                <label>邮箱</label>
                <large-form-control
                  data-key="email"
                  onInput={this.handleInput}
                  type="email"
                  placeholder="邮箱"
                />
              </div>
              <form-group label="验证码">
                <div class="input-group input-group-lg">
                  <input
                    data-key="verify"
                    onInput={this.handleInput}
                    type="text"
                    class="form-control"
                    placeholder="验证码"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-secondary"
                      type="button"
                      disabled={this.emailSend !== EMAIL_UNSEND}
                      onClick={this.handleClickSendEmail}
                    >
                      {
                        this.emailSend === EMAIL_UNSEND
                          ? '发送验证码'
                          : this.emailSend === EMAIL_SENDING
                            ? '正在发送'
                            : '验证码已发送'
                      }
                    </button>
                  </div>
                </div>
              </form-group>
              <form-group label="昵称">
                <large-form-control
                  data-key="nickname"
                  onInput={this.handleInput}
                  type="text"
                  placeholder="用于系统内展示的昵称"
                />
              </form-group>
              <form-group label="密码">
                <large-form-control
                  data-key="pwd1"
                  min="6"
                  max="60"
                  onInput={this.handleInput}
                  type="password"
                  placeholder="密码"
                />
              </form-group>
              <form-group label="再次输入密码">
                <large-form-control
                  data-key="pwd2"
                  min="6"
                  max="60"
                  onInput={this.handleInput}
                  type="password"
                  placeholder="密码"
                />
              </form-group>
            </div>
          </div>
          <br/>
          <div class="row align-items-center">
            <div class="col-xs-12 offset-sm-1 col-sm-10 offset-lg-3 col-lg-3 col-xl-3 offset-xl-3">
              <button
                type="submit"
                class="btn btn-primary btn-lg btn-block"
                onClick={this.handleClickSubmit}
                disabled={this.pendding}
              >
                {
                  this.pendding && [
                    <span class="spinner-grow spinner-grow-sm" style="width:1em;height:1em"></span>,
                    <span>&nbsp;</span>
                  ]
                }
                <span>完成注册</span>
              </button>
              <br/>
            </div>
            <div class="col-xs-12 offset-sm-1 col-sm-10 col-lg-3 offset-lg-0 col-xl-3 offset-xl-0">
              <router-link to="/auth/login" class="btn btn-text btn-lg btn-block" onClick={this.handleClickSubmit}>返回登录</router-link>
              <br/>
            </div>
          </div>
        </form>
      </div>
    )
  },
  methods: {
   async handleClickSendEmail() {
      this.emailSend = EMAIL_SENDING
      try {
        await this.$http.post(API.SEND_VERIFY_CODE, {
          email: this.formData.email
        })
      } catch (err) {
        this.emailSend = EMAIL_UNSEND
        return this.$alert.danger('邮件发送失败：' + (err.message || err))
      }

      this.$alert.success('验证邮件已发送')
      this.emailSend = EMAIL_SEND
    },
    handleInput(e) {
      const dom = e.currentTarget
      const { key } = dom.dataset

      this.formData[key] = dom.value
    },
    async handleClickSubmit(e) {
      e.preventDefault()

      if (this.pendding)
        return

      if (this.formData.email.trim() === '') {
        return this.$alert.danger('邮箱不能为空')
      }

      if (this.formData.verify.trim() === '') {
        return this.$alert.danger('验证码不能为空')
      }

      if (this.formData.nickname.trim() === '') {
        return this.$alert.danger('昵称不能为空')
      }

      if (this.formData.pwd1.trim() !== this.formData.pwd2.trim()) {
        return this.$alert.danger('两次输入的密码不一致')
      }

      if (this.formData.pwd1.trim() === '') {
        return this.$alert.danger('密码不能为空')
      }

      if (this.formData.pwd1.length < 6) {
        return this.$alert.danger('密码长度必须为6至60个字符')
      }

      let res
      this.pendding = true

      try {
        res = await this.$http.post(API.REGISTER, {
          email: this.formData.email.trim(),
          password: this.formData.pwd1.trim(),
          nickname: this.formData.nickname.trim(),
          token: this.formData.verify.trim()
        })
      } catch (err) {
        this.pendding = false
        return this.$alert.danger('注册失败：' + (err.message || err))
      }

      this.$http.login(res)
      this.$router.replace('/team')
      return this.$alert.success('注册成功，系统将自动登录')
    }
  }
}