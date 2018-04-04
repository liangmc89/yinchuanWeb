
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'

export default ({ app, router, Vue }) => {

  Vue.use(BaiduMap, {
    /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
    ak:'nKc4vkYeafnIzv9VjwsPqNHdwGatRwf3'  //狂龙的
  })
}
