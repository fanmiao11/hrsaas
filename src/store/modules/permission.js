import router, { constantRoutes, asyncRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: [],
    // 我们自己维护的路由规则，所有路由规则（静态路由+筛选后的路由）
    points: []
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = [...constantRoutes, ...routes]
    },
    setPoints(state, points) {
      state.points = points
    }
  },
  actions: {
    filtersRoutes(context, roles) {
      const routes = asyncRoutes.filter((item) => {
        return roles.menus.includes(item.meta.id)
      })
      context.commit('setRoutes', routes)
      context.commit('setPoints',roles.points)
      console.log(roles);
      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true }
      ])
    },

  }
}
