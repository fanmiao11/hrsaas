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
    method: 'DELETE'
  })
}

// 根据id获取角色详情
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}


// 给角色分配权限
/**
 * 
 * @param {*} data {id,permIds}
 * @returns 
 */
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
