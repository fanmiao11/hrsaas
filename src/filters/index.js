// 在该文件中定义的函数可以变为过滤器

// 封装的好处 易维护 可复用
// 可以当做普通函数使用 也可以去注册过滤器

import dayjs from 'dayjs'


export const formatTime = (val)=>{
  return dayjs(val).format('YYYY-MM-DD')
}
