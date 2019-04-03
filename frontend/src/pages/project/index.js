const FakeImage = {
  name: 'fake-image',
  render() {
    return (
      <svg width="100%" height="180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image cap"></svg>
    )
  }
}

const projectCard = {
  name: 'project-card',
  render() {
    return (
      <router-link to="/project/123" class="card bg-secondary text-white" style="width:100%;margin-bottom:20px">
        <FakeImage class="card-img"/>
        <div class="card-img-overlay">
          <h5 class="card-title">项目名字</h5>
          <p class="card-text">项目描述项目描述项目描述</p>
        </div>
      </router-link>
    )
  }
}

const projectList = {
  components: {
    projectCard
  },
  data() {
    return {
      listView: 1
    }
  },
  render() {
    const list = this.listView === 0 ? (
      <div class="row">
        <div class="col-12">
          <div class="list-group">
            <router-link to="/project/123" class="list-group-item list-group-item-action mb-4">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">List group item heading</h5>
                <small>三天前</small>
              </div>
              <p class="mb-1">项目描述</p>
            </router-link>
            <router-link to="/project/123" class="list-group-item list-group-item-action mb-4">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">List group item heading</h5>
                <small class="text-muted">三天前</small>
              </div>
              <p class="mb-1">项目描述</p>
            </router-link>
            <router-link to="/project/123" class="list-group-item list-group-item-action mb-4">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">List group item heading</h5>
                <small class="text-muted">三天前</small>
              </div>
              <p class="mb-1">项目描述</p>
            </router-link>
          </div>
        </div>
      </div>
    ) : (
      <div class="row">
        <div class="col-md-6 col-xl-4">
          <project-card />
        </div>
        <div class="col-md-6 col-xl-4">
          <project-card />
        </div>
        <div class="col-md-6 col-xl-4">
          <project-card />
        </div>
        <div class="col-md-6 col-xl-4">
          <project-card />
        </div>
        <div class="col-md-6 col-xl-4">
          <project-card />
        </div>
        <div class="col-md-6 col-xl-4">
          <project-card />
        </div>
        <div class="col-md-6 col-xl-4">
          <project-card />
        </div>
        <div class="col-md-6 col-xl-4">
          <project-card />
        </div>
      </div>
    )

    return (
      <div class="container project-list">
        <div class="row justify-content-space-between align-items-center">
          <div class="col-6">
            <h1 class="display-4">团队</h1>
          </div>
          <div class="col-6 text-right">
            <button
              class="btn btn-light"
              onClick={this.toggleListView}
            >{this.listView === 0 ? '卡片' : '列表'}视图</button>
          </div>
        </div>
        <br/>
        {list}
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-3 col-xl-2">
            <button type="button" class="btn btn-lg btn-block btn-primary mb-3">新建项目</button>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 col-xl-2">
            <router-link to="/team/123/setting" class="btn btn-lg btn-block btn-secondary">团队设置</router-link>
          </div>
        </div>
      </div>
    )
  },
  methods: {
    toggleListView() {
      this.listView = this.listView === 0 ? 1 : 0
    }
  }
}

export default projectList