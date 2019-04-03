import router from '@/router'

const rootRouter = {
  router,
  render() {
    return (
      <router-view id="app" />
    )
  }
}

const app = {
  name: 'app',
  el: document.getElementById('app'),
  components: { rootRouter },
  data() {
    return {
      checked: false
    }
  },
  render() {
    if (this.checked) {
      return <root-router />
    }

    return (
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-2 text-center">
            <div class="spinner-border" role="status"></div>
            <p class="mt-3">系统加载中</p>
          </div>
        </div>
      </div>
    )
  },
  mounted() {
    this.$darkMode = true

    const succeed = this.$http.login()

    if (succeed) {
      this.checked = true
      return
    }

    this.checked = true
  }
}

export default app