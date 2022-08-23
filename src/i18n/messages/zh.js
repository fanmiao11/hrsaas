import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
export default {
  name: '中文',
  dashboard: {
    calendar: '工作日历'
  },
  ...zhLocale, // 或者用 Object.assign({ message: '你好' }, zhLocale)
  route: {
    dashboard: '首页',
    social: '社保',
    attendance: '考勤',
    权限管理:'权限管理',
    组织架构: '组织架构',
    员工: '员工',
    工资: '工资',
    公司设置: '公司设置',
    approval: '审批'
  }
}
