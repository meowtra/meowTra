const teamCard = {
  render() {
    return (
      <router-link to="/team/123" class="card mb-3" style="text-decoration:none;color:inherit">
        <div class="card-body">
          <h5 class="card-title">XXX团队</h5>
          <h6 class="card-subtitle mb-2 text-muted">5个项目，32人</h6>
          <p class="card-text">团队描述</p>
          <router-link to="/team/123/setting" class="card-link">设置</router-link>
        </div>
      </router-link>
    )
  },
  methods: {
  }
}

const teamList = {
  components: {
    teamCard
  },
  data() {
    return {}
  },
  render() {
    return (
      <div class="container project-list">
        <div class="row justify-content-space-between align-items-center">
          <div class="col-5">
            <h1 class="display-4">首页</h1>
          </div>
          <div class="col-7 text-right">
            <router-link to="/team/create" class="btn btn-md btn-primary ml-2">新建</router-link>
          </div>
        </div>
        <br/>
        <div class="row">
          <div class="col-md-6 col-xl-4">
            <team-card />
          </div>
          <div class="col-md-6 col-xl-4">
            <team-card />
          </div>
          <div class="col-md-6 col-xl-4">
            <team-card />
          </div>
          <div class="col-md-6 col-xl-4">
            <team-card />
          </div>
          <div class="col-md-6 col-xl-4">
            <team-card />
          </div>
          <div class="col-md-6 col-xl-4">
            <team-card />
          </div>
          <div class="col-md-6 col-xl-4">
            <team-card />
          </div>
          <div class="col-md-6 col-xl-4">
            <team-card />
          </div>
        </div>
      </div>
    )
  },
  methods: {
  }
}

export default teamList