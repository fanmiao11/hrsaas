import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    }
  },
  actions: {
    async getToken(context, payload) {
      const res = await login(payload)
      console.log(res);
      // res 已经在响应拦截器中做过处理 此时拿到的是响应拦截器返回的数据 可以直接存res
      context.commit('setToken', res)
    }
  }
}
