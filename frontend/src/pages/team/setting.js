export default {
  render() {
    return (
      <div class="container">
        <h1 class="display-4">团队设置</h1>
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
        <div class="row mb-4">
          <div class="col-sm-12 col-md-8">
            <div class="card">
              <div class="card-header">工作流</div>
              <div class="card-body">
                <div class="row justify-content-space-between align-items-center">
                  <div class="col-8">
                    <h5 class="card-title">强制工作流</h5>
                    <p class="card-text">开启强制工作流，将限制项目的进度进程</p>
                  </div>
                  <div class="col-4">
                    <button class="btn btn-sm btn-block btn-outline-primary">点击关闭</button>
                  </div>
                </div>
              </div>
              <div class="card-body border-top">
                <h5 class="card-title">工作流编辑</h5>
                <button class="btn btn-sm btn-secondary mr-1">进度111</button>
                <button class="btn btn-sm btn-secondary mr-1">进度222</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-sm-12 col-md-8">
            <div class="card">
              <div class="card-header">成员</div>
              <div class="card-body">
                <input type="text" class="form-control mb-3" placeholder="筛选成员"/>
                <ul class="list-group mb-3">
                  <li class="list-group-item">
                    咪咪&nbsp;&nbsp;<span class="badge badge-primary">admin</span>
                    <b class="text-success float-right">✓</b>
                  </li>
                  <li class="list-group-item">
                    咪咪&nbsp;&nbsp;<span class="badge badge-primary">admin</span>
                  </li>
                  <li class="list-group-item">
                    咪咪
                    <b class="text-success float-right">✓</b>
                  </li>
                  <li class="list-group-item">
                    咪咪
                    <b class="text-success float-right">✓</b>
                  </li>
                  <li class="list-group-item">
                    咪咪
                  </li>
                </ul>
                <div class="row">
                  <div class="col-12">
                    <button type="button" class="btn btn-outline-secondary btn-block">新增成员</button>
                  </div>
                </div>
                <br/>
                <div class="row justify-content-space-between align-items-center mb-3">
                  <div class="col-6">已选 3 人</div>
                  <div class="col-6 text-right">
                    <button class="btn btn-link">取消选择</button>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                    <button type="button" class="btn btn-block btn-outline-primary">设为管理员</button>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                    <button type="button" class="btn btn-block btn-outline-primary">设为一般成员</button>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                    <button type="button" class="btn btn-block btn-outline-danger">移出团队</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-sm-12 col-md-8">
            <div class="card border-danger">
              <div class="card-header border-danger bg-danger text-white">危险</div>
              <div class="card-body">
                <div class="row">
                  <div class="col-8">
                    <h5 class="card-title">解散团队</h5>
                    <p class="card-text">团队一旦解散，所有成员将被移出该团队，所有项目将自动归档。</p>
                  </div>
                  <div class="col-4"><button class="btn btn-block btn-sm btn-danger">解散团队</button></div>
                </div>
              </div>
              <div class="card-body border-top border-danger">
                <div class="row">
                  <div class="col-8">
                    <h5 class="card-title">归档项目</h5>
                    <p class="card-text">项目一旦归档，将禁止所有成员对项目内容进行任何操作，只有团队管理员才可重新解档项目。</p>
                  </div>
                  <div class="col-4"><button class="btn btn-block btn-sm btn-danger">归档项目</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}