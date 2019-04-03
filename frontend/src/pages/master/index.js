import API from '@/api'

export default {
  data() {
    return {
      showOffCanvas: false
    }
  },
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
          <router-link class="navbar-brand" to="/team">咪咪翻译</router-link>
          <button
            class={"navbar-toggler" + (this.showOffCanvas ? ' collapsed' : '')}
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={this.toggleOffCanvas}
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class={"navbar-collapse collapse" + (this.showOffCanvas ? ' show' : '')} id="navbarCollapse" style="">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <router-link class="nav-link" to="/auth/my">账号</router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="javascript:;" onClick={this.handleClickLogout}>注销</a>
              </li>
            </ul>
          </div>
        </nav>
        <router-view />
      </div>
    )
  },
  methods: {
    toggleOffCanvas() {
      this.showOffCanvas = !this.showOffCanvas
    },
    handleClickLogout() {
      this.$http.post(API.LOGOUT)
      this.$router.replace('/auth/login')
      this.$http.logout()
    }
  }
}