import API from '@/api'

const EMAIL_SEND = 2
const EMAIL_SENDING = 1
const EMAIL_UNSEND = 0

const largeFormControl = {
  render() {
    return (
      <input
        autocomplete="off"
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
        verify: ''
      }
    }
  },
  render() {
    return (
      <div class="mt-3">
        <form method="post" class="row align-items-center justify-content-center mb-3" autocomplete="off">
          <div class="col-xs-12 col-sm-10 col-md-10 col-lg-6 col-xl-6">
            <h1 class="display-4 mb-3">忘记密码</h1>
            <form-group label="邮箱">
              <large-form-control
                data-key="email"
                type="email"
                placeholder="邮箱"
                onInput={this.handleInput}
              />
            </form-group>
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
            <form-group label="新密码">
              <large-form-control
                data-key="pwd1"
                min="6"
                max="60"
                onInput={this.handleInput}
                type="password"
                placeholder="密码"
              />
            </form-group>
            <form-group label="再次输入新密码">
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
        </form>
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
              <span>重置密码</span>
            </button>
            <br/>
          </div>
        </div>
      </div>
    )
  },
  methods: {
   async handleClickSendEmail() {
      this.emailSend = EMAIL_SENDING
      try {
        await this.$http.post(API.SEND_RESET_PASSWORD_CODE, {
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

      if (this.formData.pwd1.trim() !== this.formData.pwd2.trim()) {
        return this.$alert.danger('两次输入的密码不一致')
      }

      if (this.formData.pwd1.trim() === '') {
        return this.$alert.danger('新密码不能为空')
      }

      if (this.formData.pwd1.length < 6) {
        return this.$alert.danger('新密码长度必须为6至60个字符')
      }

      this.pendding = true

      try {
        await this.$http.post(API.RESET_PASSWORD, {
          email: this.formData.email.trim(),
          password: this.formData.pwd1.trim(),
          password_confirmation: this.formData.pwd2.trim(),
          token: this.formData.verify.trim()
        })
      } catch (err) {
        this.pendding = false
        return this.$alert.danger('密码重置失败：' + (err.message || err))
      }

      this.$router.replace('/auth/login')
      return this.$alert.success('密码重置成功，请重新登录')
    }
  }
}