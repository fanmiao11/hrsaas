import router from '@/router'
import store from '@/store'
// 路由（全局）前置守卫
// 会在所有路由进入之前触发
// to:去哪里的路由信息‘
// from:来自于哪个路由的信息
// next:是否进入
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  const token = store.state.user.token
  if (token) {
    // 更改路由时如果没有获取过用户信息再去获取
    if (!store.state.user.userInfo.userId) {
      // 获取用户信息
    await store.dispatch('user/getUserInfo')
    }
    // 1 登录之后的权限
    //    是否进入登录页    是：跳到首页  否：直接进入
    if (to.path === '/login') next('/')
    else next()
  } else {
    // 2 未登录
    //    访问的页面是否在白名单（未登录也能访问的页面）   在：放行  不在：跳到登录页面
    const isCludes = whiteList.includes(to.path)
    if (isCludes) {
      next()
    } else {
      next('/login')
    }
  }
})
