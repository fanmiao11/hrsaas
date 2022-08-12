import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'

const component = [PageTools, UploadExcel]

export default {
  install(Vue) {
    component.forEach((item) => {
      Vue.component(item.name, item)
    })
  }
}
