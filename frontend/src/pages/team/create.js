export default {
  render() {
    return (
      <div class="container">
        <h1 class="display-4">新建团队</h1>
        <br/>
        <div class="row mb-4">
          <div class="col-sm-12 col-md-8">
            <div class="card">
              <div class="card-header">常规</div>
              <div class="card-body">
                <form>
                  <div class="form-group">
                    <label>团队名称</label>
                    <input type="text" class="form-control"/>
                  </div>
                  <div class="form-group">
                    <label>团队介绍</label>
                    <input type="text" class="form-control"/>
                  </div>
                  <button type="button" class="btn btn-primary">保存</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}