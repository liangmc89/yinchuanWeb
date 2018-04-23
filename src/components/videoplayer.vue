<template>

          <div class="player-box fit">
            <div class="video-player" >
              <video-player  style="width: 100%;height: 100%"
                             ref="videoPlayer"
                             :options="playerOptions"
                             customEventName="changed"
                            >
              </video-player>
            </div>
            <div class="video-item">
              <swiper :options="videoswiperOption" style="height: 100%;padding: 1rem;background: rgb(233,234,235)">
                <swiper-slide  :key="index" v-for="(item,index) in lanmudata.dataList1" >
                     <div class="videoposter shadow-4" @click="playVideo(index)" v-bind:class="[index==videoIndex?'video-focus':'']" >
                       <img  :src="getUrl(item.Icon)">
                       <div class="video-title text-no-wrap overflow-hidden">{{item.Title}}</div>
                     </div>
                </swiper-slide>
              </swiper>
            </div>

          </div>



</template>

<script>
  import {ResourceUrl} from '../config/config.js'
  export default {
    props: ["lanmudata"],
    data() {
      return {
        videoIndex:0,
        videoswiperOption: {
          slidesPerView: 4,
          spaceBetween: 30

        },
        playerOptions: {
          autoplay: true,
          controlBar: {
            fullscreenToggle: false
          },
          sources: [{src:this.getUrl(this.lanmudata.dataList1[0].Path)}],
          language: 'zh-CN',
          techOrder: ['html5','flash'],
           //poster: this.getUrl(this.lanmudata.dataList1[0].Icon)
        }
      }
    },
    mounted:function () {


    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      },
      videolist(){
        let list=[];
        this.lanmudata.dataList1.forEach((item)=>{
          list.push({poster:this.getUrl(item.Icon),src:this.getUrl(item.Path)});
        });
        return list;
      }

    },
    methods: {
      playVideo:function (index) {
         this.videoIndex=index;
         this.playerOptions.sources=[this.videolist[this.videoIndex]]||[];
         this.playerOptions.poster=this.videolist[this.videoIndex].poster||'';
      },
      getUrl: function (str) {
        if (!str) return '';
        return ResourceUrl + str;
      }
    }
  }
</script>
<style>


  .video-player{
    height: 80%;
  }
  .video-item{
    height: 20%;
  }
  .videoposter{
    box-sizing: border-box;
    border:5px solid transparent;
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
  }
  .videoposter img{
    width: 100%;
    height: 100%;
  }
  .video-title{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20%;
    background: rgba(0,0,0,.5);
    color: white;
    text-align: center;
    font-size: 1.8rem;

  }


</style>
