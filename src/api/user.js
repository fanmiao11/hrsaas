import request from '@/utils/request'

/**
 * 登录 请求
 * @param {Object} data  password mobile
 * @returns Promise
 */
export function login(data) {
    // 如果不写return 返回值是undefined   写return返回promise
    return request({
        url:'/sys/login',
        method:'POST',
        data,
    })
}