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
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <a class="nav-link" href="javascript:;" onClick={this.handleClickLogout}>注销登录</a>
              </li>
              {
                // <li class="nav-item active">
                //   <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                // </li>
                // <li class="nav-item">
                //   <a class="nav-link" href="#">Link</a>
                // </li>
                // <li class="nav-item">
                //   <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                // </li>
              }
            </ul>
            {
              // <form class="form-inline mt-2 mt-md-0">
              //   <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
              //   <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              // </form>
            }
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