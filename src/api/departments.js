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

/**
 * 新增部门
 * @param {Object} data
 * @returns Promise
 */
export function addDepartments(data) {
  return request({
    url: `/company/department`,
    method: 'POST',
    data
  })
}

/**
 * 根据id获取部门详情
 * @param {String} id 部门id
 * @returns
 */
export function getDepartment(id) {
  return request({
    url: `/company/department/${id}`
  })
}

/**
 * 根据id修改部门
 * @param {Object} data 
 * @returns 
 */
export function editDepartment(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data,
  })
}
