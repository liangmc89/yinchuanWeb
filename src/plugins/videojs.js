
import Vue from 'vue'
import 'videojs-flash'
import VueVideoPlayer from 'vue-video-player'

// require videojs style
import 'video.js/dist/video-js.css'

export default ({Vue }) => {
  Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)
}
