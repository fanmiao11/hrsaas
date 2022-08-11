import request from '@/utils/request'

/**
 * 获取角色列表
 */
export function getRolesApi(params) {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 *
 * @param {Object} data {name,region}
 */
export function addRoleApi(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

export function removeRoleApi(id) {
  return request({
    url: `/sys/role/${id}`,
    method:'DELETE'
  })
}
