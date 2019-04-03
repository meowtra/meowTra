export default {
  render() {
    return (
      <div class="container">
        <br/>
        <div class="row align-items-center justify-content-center">
          <div class="col-xs-10 col-sm-10 col-md-10 col-md-8">
            <h1 class="display-3">404</h1>
            <p>页面不存在</p>
            <router-link to="/team" class="btn btn-outline-primary">返回首页</router-link>
          </div>
        </div>
      </div>
    )
  }
}