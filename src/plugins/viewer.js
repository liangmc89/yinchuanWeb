import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'

// leave the export, even if you don't use it
export default ({Vue}) => {
  Vue.use(Viewer);
}
