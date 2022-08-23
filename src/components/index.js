import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'
import UploadImg from '@/components/UploadImg'
import Calendar from '@/components/Calendar'
import FullScreen from '@/components/FullScreen'
import ToggleLang from '@/components/ToggleLang'

const component = [
  PageTools,
  UploadExcel,
  UploadImg,
  Calendar,
  FullScreen,
  ToggleLang
]

export default {
  install(Vue) {
    component.forEach((item) => {
      Vue.component(item.name, item)
    })
  }
}
