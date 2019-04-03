import API from '@/api'

const FakeImage = {
  name: 'fake-image',
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image cap">
        <rect x="0" y="0" width="100%" height="100%" fill="#aaa" />
      </svg>
    )
  }
}

const masterFragment = {
  functional: true,
  render(h, context) {
    return (
      <div class="container project-list">
        <div class="row justify-content-space-between align-items-center">
          <div class="col-6">
            <h1 class="display-4">账号</h1>
          </div>
        </div>
        {context.children}
      </div>
    )
  }
}

export default {
  components: {
    masterFragment
  },
  data() {
    return {
      loading: true,
      email: '',
      nickName: '',
      avatar: ''
    }
  },
  render() {
    if (this.loading) {
      return (
        <master-fragment>
          <div class="row">
            <div class="col-sm-12 col-md-10 col-lg-7 col-xl-4">
              <span class="spinner-grow spinner-lg mt-5"></span>
            </div>
          </div>
        </master-fragment>
      )
    }

    return (
      <master-fragment>
        <div class="row">
          <div class="col-sm-12 col-md-10 col-lg-7 col-xl-4">
            <form>
              <div class="form-group">
                <label>邮箱</label>
                <input type="email" class="form-control" value={this.email} disabled={true}/>
              </div>
              <div class="form-group">
                <label>昵称</label>
                <input type="text" class="form-control" value={this.nickName}/>
              </div>
              <div class="form-group">
                <label>头像</label>
                <FakeImage class="mb-3" width="100" height="100" style="display:block;"/>
                <button type="button" class="btn btn-primary">上传</button>
              </div>
            </form>
          </div>
        </div>
      </master-fragment>
    )
  },
  async mounted() {
    let resData

    try {
      resData = await this.$http.get(API.ACCOUNT_INFO)
      resData = resData.data
    } catch (err) {
      return this.$alert.danger(err.message)
    }

    Object.assign(this, {
      nickName: resData.nickname,
      email: resData.email,
      avatar: resData.avatar,
      loading: false
    })
  },
  methods: {

  }
}