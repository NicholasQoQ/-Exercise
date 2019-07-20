import MyCrumbs from './MyCrumbs.vue'
import MyChannel from './MyChannel.vue'
import MyUpload from './MyUpload.vue'

export default {
  install (Vue) {
    Vue.component(MyCrumbs.name, MyCrumbs)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyUpload.name, MyUpload)
  }
}
