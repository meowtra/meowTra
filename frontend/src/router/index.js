import VueRouter from 'vue-router'

const masterPage = {
  name: 'master-page',
  render: h => h('router-view')
}

const rootMasterPage = {
  name: 'master-page',
  render() {
    return <router-view class="container" />
  }
}

const routes = [{
  path: '/auth/(|login|register|forgot-password)',
  component: rootMasterPage,
  children: [{
    path: '/auth/login',
    component: () => import('@/pages/authorize/login')
  }, {
    path: '/auth/register',
    component: () => import('@/pages/authorize/register')
  }, {
    path: '/auth/forgot-password',
    component: () => import('@/pages/authorize/forgot-password')
  }, {
    path: '/auth',
    redirect: '/auth/login'
  }]
}, {
  path: '/',
  component: () => import('@/pages/master'),
  children: [{
    path: 'auth/my',
    component: () => import('@/pages/authorize/my')
  }, {
    path: '',
    redirect: '/team'
  }, {
    path: 'team',
    component: () => import('@/pages/team')
  }, {
    path: 'team/create',
    component: () => import('@/pages/team/create')
  }, {
    path: 'team/:teamId',
    component: () => import('@/pages/project')
  }, {
    path: 'team/:teamId/setting',
    component: () => import('@/pages/team/setting')
  }]
}, {
  path: '*',
  component: () => import('@/pages/error/404')
}]

const router = new VueRouter({
  mode: 'history',
  routes
})

window.routerInstance = router

export default router