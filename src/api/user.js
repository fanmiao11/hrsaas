import request from '@/utils/request'

/**
 * 登录 请求
 * @param {Object} data  password mobile
 * @returns Promise
 */
export function login(data) {
  // 如果不写return 返回值是undefined   写return返回promise
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 * @returns promise
 */
export function getUserInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

/**
 * 获取员工基本信息
 * @param {*} id userId
 * @returns Promise
 */
export function getUserDetail(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
