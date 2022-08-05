import request from '@/utils/request'

/**
 * 获取组织架构的数据
 * @returns promise
 */
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
