import store from '@/store'
// 定义自定义指令
export const imgError = {
  // 当被绑定的元素插入到DOM中时
  // 令绑定的元素插入到dom的时候，图片数据还没请求回来
  inserted: function (el, { value }) {
    if (!el.src) {
      // src为空 或 null false 代表src没有
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
  //   指令所绑定的元素更新时触发
  update(el, { value }) {
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  }
}

export const isHas = {
  inserted(el, binding) {
    console.log(el);
    const has = store.state.permission.points.includes(binding.value)
    if(!has){
      el.remove()
    }
  }
}
