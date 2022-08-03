// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTokenTime } from './auth'
import router from '@/router'

// 判断token是否过期
function isTimeOut() {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  const timeout = 2 * 60 * 60 * 1000
  // console.log(currentTime,tokenTime);
  return currentTime-tokenTime > timeout
}

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  //   用环境变量

  //接口会有三套
  //   开发 测试 上线
  timeout: 5000
}) // 创建一个axios的实例

service.interceptors.request.use(async (config) => {
  // 当前请求的配置
  // console.log(config)
  if (store.state.user.token) {
    // const currentTime = Date.now()
    // const tokenTime = getTokenTime()
    // const timeout = 10 * 1000
    // if (currentTime - tokenTime > timeout) {
    if (isTimeOut()) {
      // 判断token是否过期 过期 跳到登录页面
      // 跳转前先退出 清空token
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录过期'))
    } else {
      // token 没有过期 携带
      config.headers.Authorization = 'Bearer ' + store.state.user.token
    }
  }
  return config
}) // 请求拦截器

service.interceptors.response.use(
  (res) => {
    // 接口按需控制
    // if(res.config.url==='api/sys/login'){
    //   return res
    // }

    // 成功的回调
    // 请求到的数据先到响应拦截器 拦截器返回什么数据能拿到什么数据
    // console.log(res);
    // return res.data.data
    // 请求成功不代表真正的成功 需要根据返回的success进行判断
    const { success, data, message } = res.data
    // 处理成功
    if (success) {
      return data
    }
    // 如果没有成功 处理失败
    Message.error(message) //错误提示
    return Promise.reject(new Error(message))
  },
  // axios中文文档中查
  async function (error) {
    // 失败的回调   （请求方式、地址写错....）
    // 对响应错误做点什么
    // 如果直接进error也可以给一个错误提示
    // console.dir(error);
    // Message.error('系统异常')
    // 前端被动处理 token过期  后端返回的有状态码
    // ?. es11 链式运算符
    if(error?.response?.status === 401){
      Message.error('登录过期')
      await store.dispatch('user/logout')
      router.push('/login')
    }else{
      Message.error(error.message)
    }
    // Message.error(error.message)
    return Promise.reject(error)
  }
) // 响应拦截器
export default service // 导出axios实例
