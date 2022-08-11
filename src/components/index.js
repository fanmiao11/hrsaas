import PageTools from '@/components/PageTools'

const component = [PageTools]

export default {
  install(Vue) {
    component.forEach(item=>{
        Vue.component(item.name, item)
    })
  }
}
