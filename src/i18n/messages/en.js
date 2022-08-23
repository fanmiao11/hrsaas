import enLocale from 'element-ui/lib/locale/lang/en'
export default {
  name: 'English',
  dashboard: {
    calendar: 'calendar'
  },
  ...enLocale, // 或者用 Object.assign({ message: 'hello' }, enLocale)
  route: {
    dashboard: 'dashboard', //首页
    approval: 'approvals', //审批
    attendance: 'attendance',
    权限管理:'permission',
    组织架构: 'department',
    员工: 'employees',
    工资: 'salarys',
    公司设置: 'setting',
    social: 'social' //社保
  }
}
