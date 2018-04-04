<template>
  <q-page >
    <div class="pageLayout">
    <div class="pageHeader">
      <div class="logo"></div>
    </div>
    <div class="pageBody relative-position">
      <div class="bodyContent">
        <div class="content-container fit relative-position">
          <!--<keep-alive>-->
          <pdfplayer v-show="currentNav==0" :pdflist="RBpdflist"></pdfplayer>
          <contentplayer  v-show="currentNav==5" :lanmudata="lanmuData"></contentplayer>
          <!--</keep-alive>-->
          <!--<mymap></mymap>-->

        <!--<pdfplayer :pdflist="pdflist"></pdfplayer>-->
        <!--<contentplayer></contentplayer>-->
        </div>

      </div>

      <div class="navMenu relative-position">

        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide style="width: auto" :key="index" v-for="(item,index) in lanmuList">

            <button @click="navBtnClick(index,item)" glossy
                    class="navbtns  q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-push q-focusable q-hoverable text-white"
                    v-bind:class="[index==currentNav?'navbtn-focus':'']">
              <div class="navbtn">
                <img v-if="item.VerticalIcon" :src="getUrl(item.VerticalIcon)">
                <div v-else class="noIcon"></div>
                <div class="text-no-wrap">{{item.Title}}</div>
              </div>
            </button>
          </swiper-slide>

        </swiper>
        <div class="swiper-button-prev ss" style="left: 0" slot="button-prev"></div>
        <div class="swiper-button-next ss" style="right: 0" slot="button-next"></div>
      </div>
    </div>
    <div class="pageFoot">
      <video controls :src="videolist[currentVideoIndex]" muted id="myVideo" ref="myVideo" autoplay preload="auto"
             @ended="nextVideo">

      </video>
    </div>
    </div>
  </q-page>
</template>
<script>
  import {ResourceUrl,csid,pwd} from '../config/config.js'
  import mymap from '../components/mymap.vue'
  import pdfplayer from '../components/pdfplayer.vue'
  import contentplayer from '../components/contentplayer.vue'
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: 'PageIndex',
    components: {
      pdfplayer,
      swiper,
      swiperSlide,
      contentplayer,
      mymap

    },
    filters:{

    },
    methods: {
      getUrl: function(str){
        if(!str) return '';
        return ResourceUrl+str;
      },
      getLanmuData: function () {
          this.$axios.get('/Service/h5/LanmuData.ashx',{params:{csid:csid,pwd:pwd}}).then((response)=>{
          if (response.status == 200) {
               var data=eval('(' + response.data + ')');
              this.dataList1=data.dataList1;
              this.dataList2=data.dataList2;
              this.dataList3=data.dataList3;
              this.lanmuList=data.lanmuList.sort(function (a,b) {
                return a.Orders-b.Orders;
              });


          } else {

          }
        }).catch((err) => {
          this.$q.notify({

            message: `获取报纸错误！`,
            timeout: 4000, // in milliseconds; 0 means no timeout
            type: 'negative',
            color: 'positive',
            textColor: 'black', // if default 'white' doesn't fits
            icon: 'warning',
            detail: err.message,
            position: 'top' //'top-right', // 'top', 'left', 'bottom-left' etc
          });
        })
      },

      navBtnClick: function (index,item) {

        this.currentNav=index;
        //this.LanmuID=item.LanmuID;
        let dl_1=this.dataList1.filter(function (d) {
          return d.Lm_ID=item.LanmuID;
        })
//        var obj=new object();
//        obj.dataList1=dl_1;
//        obj.dataList2=this.dataList2;
//        obj.dataList3=this.dataList3;
//        this.lanmuData=obj;
////        {dataList1:dl_1,dataList2:this.dataList2,dataList3:this.dataList3};

      },
      nextVideo: function () {

        let count = this.videolist.length;
        if (this.currentVideoIndex < count - 1) {
          this.currentVideoIndex++;
        } else {
          this.currentVideoIndex = 0;
        }
        this.$refs.myVideo.play();
      }
    },
    mounted: function () {
      this.getLanmuData();
    },
    data() {
      return {
        currentNav:0,
        lanmuData:{},
        dataList1:[],//一级菜单
        dataList2:[],//二级菜单
        dataList3:[],//内容
        lanmuList:[],//栏目列表
        LanumID: 0,//当前栏目
        currentVideoIndex: 0,
        videolist: ['http://occcudapv.bkt.clouddn.com/guchenghu/bb7c6e4c-e62e-4ea7-bdc9-f9ce3a678274.mp4'
//          ,
//                 'http://vjs.zencdn.net/v/oceans.mp4'
        ],
        navButtons: [
          {label: '银川日报', value: 'one'},
          {label: '银川日报', value: 'two'},
          {label: '银川日报', value: 'three'},
          {label: '银川日报', value: 'a'},
          {label: '银川日报', value: 'b'},
          {label: '银川日报', value: 'c'},
          {label: '银川日报', value: 'd'},
          {label: '银川日报', value: 'e'},
          {label: '银川日报', value: 'f'},
          {label: '银川日报', value: 'g'},
          {label: '银川日报', value: 'h'},
          {label: '银川日报', value: 'i'}
        ],
        swiperOption: {
          slidesPerView: "auto",
          spaceBetween: 3,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }

        },
        RBpdflist: ['../statics/1.pdf', '../statics/2.pdf', '../statics/3.pdf', '../statics/4.pdf', '../statics/5.pdf']
      }

    }
  }
</script>
<style>
  .pageLayout {
    /*max-width: 1280px;*/
    /*max-height: 1920px;*/
    width: 640px;
    height: 960px;
    margin: 0 auto;
    border: 1px solid red;

    /*width: 100%;*/
    /*height:100%;*/
  }


  .pageHeader {
    background: rgb(34, 53, 74);
    width: 100%;
    padding: 1rem;
  }

  .logo {
    background: url("../statics/icons/logo.png") no-repeat 0 0/100% 100%;
    width: 10rem;
    height: 3rem;
  }

  .pageBody {
    background: rgb(210, 210, 211);
  }

  .bodyContent{
    width: 100%;
    height:40rem;
    padding: 1rem;

  }

  .navMenu {
    background: url("../statics/icons/menuBg.png") repeat;
    padding: 1rem;

  }

  .content-container{
    border-radius: .3rem;
    background-color: white;

  }

  .navMenu::-webkit-scrollbar {
    display: none;
  }

  .navbtn {
    /*height: 3rem;*/
    /*width: 3rem;*/
    padding: 1.2rem .2rem;
  }

  .navbtn img {
    width: 2rem;
    height: 2rem;
  }
  .noIcon{
    width: 2rem;
    height: 2.3rem;
  }

  .navbtns {
    background: url("../statics/icons/btnBg0001.png") no-repeat 0 0/100% 100%;
    border-radius: 10px;
    color: white;
    font-size: .7rem;
  }

  .navbtn-focus {
    background: url("../statics/icons/btnBg0002.png") no-repeat 0 0/100% 100%;
  }

  .ss {
    width: 1.08rem;
    height: 1.32rem;
    background-size: 1.08rem 1.32rem;
    margin-top: -0.8rem;

  }


  #myVideo {
    width: 100%;
    height: 27rem;
    background: black;
  }


</style>
