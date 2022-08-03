import { getUserDetail, getUserInfoApi, login } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: ''
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    // 登录获取token
    async getToken(context, payload) {
      const res = await login(payload)
      // console.log(res)
      // res 已经在响应拦截器中做过处理 此时拿到的是响应拦截器返回的数据 可以直接存res
      context.commit('setToken', res)
      setTokenTime()
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
      // setTimeout(()=>{
      //   const res = {name:'张三'}
      //   commit('setUserInfo',res)
      // },1000)
      const userBaseInfo = await getUserInfoApi()
      const userInfo = await getUserDetail(userBaseInfo.userId)
      commit('setUserInfo', { ...userBaseInfo, ...userInfo })
    },

    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
    }
  }
}
