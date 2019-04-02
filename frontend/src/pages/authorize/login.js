import API from '@/api'

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
  name: 'page-login',
  components: {
    formGroup,
    largeFormControl
  },
  data() {
    return {
      pendding: false,
      formData: {
        email: '',
        password: ''
      }
    }
  },
  render() {
    return (
      <div class="mt-3">
        <form action="">
          <div class="row align-items-center justify-content-center">
            <div class="col-xs-12 col-sm-10 col-md-10 col-lg-6 col-xl-6">
              <h1 class="display-4 mb-3">登录</h1>
              <form-group label="邮箱">
                <large-form-control
                  data-key="email"
                  type="email"
                  placeholder="邮箱"
                  onInput={this.handleInput}
                />
              </form-group>
              <form-group label="密码">
                <large-form-control
                  data-key="password"
                  type="password"
                  placeholder="密码"
                  onInput={this.handleInput}
                />
              </form-group>
            </div>
          </div>
          <br/>
          <div class="row align-items-center">
            <div class="col-xs-12 offset-sm-1 col-sm-10 offset-lg-3 col-lg-3 col-xl-3 offset-xl-3">
              <button disabled={this.pendding} type="submit" class="btn btn-primary btn-lg btn-block" onClick={this.handleClickSubmit}>
                {
                  this.pendding && [
                    <span class="spinner-grow spinner-grow-sm" style="width:1em;height:1em"></span>,
                    <span>&nbsp;</span>
                  ]
                }
                <span>登录</span>
              </button>
              <br/>
            </div>
            <div class="col-xs-12 offset-sm-1 col-sm-10 col-lg-3 offset-lg-0 col-xl-3 offset-xl-0">
              <router-link to="/auth/register" class="btn btn-light btn-lg btn-block">注册</router-link>
              <br/>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 offset-sm-1 col-sm-10 offset-lg-3 col-lg-3 col-xl-3 offset-xl-3">
              <router-link to="/auth/forgot-password" class="btn btn-light btn-lg btn-block">忘记密码</router-link>
            </div>
          </div>
        </form>
      </div>
    )
  },
  mounted() {
  },
  methods: {
    handleInput(e) {
      const dom = e.currentTarget
      const { key } = dom.dataset

      this.formData[key] = dom.value
    },
    async handleClickSubmit(e) {
      e.preventDefault()

      if (this.pendding)
        return

      let res
      this.pendding = true

      try {
        res = await this.$http.post(API.LOGIN, {
          email: this.formData.email,
          password: this.formData.password
        })
      } catch (err) {
        this.pendding = false
        return this.$alert.danger(err.message || err)
      }

      this.$http.login(res)
      this.$alert.success('登录成功')
      this.$router.replace('/team')
    }
  }
}