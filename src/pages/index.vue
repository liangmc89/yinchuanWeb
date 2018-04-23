<template>
  <q-page>
    <div class="pageLayout non-selectable" @click="CloseSaver">
      <div class="pageHeader">
        <div class="logo" @click="refresh"></div>
        <div class="date">
          <div class="data-day">
            <div class="date-date">{{time_date}}</div>
            <div class="date-week">{{time_week}}</div>
          </div>
          <div class="date-time">{{time_time}}</div>
        </div>
        <div class="weather">
          <iframe src="//www.seniverse.com/weather/weather.aspx?uid=U192E82C80&cid=CHNX000000&l=zh-CHS&p=SMART&a=0&u=C&s=3&m=0&x=1&d=0&fc=FFFFFF&bgc=&bc=&ti=0&in=0&li=" frameborder="0" scrolling="no" width="180" height="96" allowTransparency="true"></iframe>          <div class="weather-layer"></div>
        </div>

      </div>
      <div class="pageBody relative-position">
        <div class="bodyContent">
          <div class="content-container fit relative-position">
            <!--<transition-->
            <!--enter-active-class="animated fadeIn"-->
            <!--leave-active-class="animated fadeOut"-->
            <!--&gt;-->
            <!--吃在银川 lanmuid:68-->
            <Yzyc v-if="currentNav==68" :key="68" :lanmudata="lanmu"></Yzyc>
            <!--游在银川 lanmuid:68-->
            <Yzyc v-if="currentNav==69" :key="69" :lanmudata="lanmu"></Yzyc>
            <!--市监管局 lanmuid:62-->
            <Yzyc v-if="currentNav==62" :key="62" :lanmudata="lanmu"></Yzyc>
            <!--银川金凤 lanmuid:55-->
            <Yzyc v-if="currentNav==55" :key="55" :lanmudata="lanmu"></Yzyc>
            <!--宜居银川  LanmuID:70-->
            <Yzyc v-if="currentNav==70" :key="70" :lanmudata="lanmu"></Yzyc>
            <!--休闲娱乐  LanmuID:72-->
            <Yzyc v-if="currentNav==72" :key="72" :lanmudata="lanmu"></Yzyc>
            <!--投资理财 LanmuID:71-->
            <Yzyc v-if="currentNav==71" :key="71" :lanmudata="lanmu"></Yzyc>
            <!--医疗保健 LanmuID：73-->
            <Yzyc v-if="currentNav==73" :key="73" :lanmudata="lanmu"></Yzyc>
            <!--媒体矩阵 LanmuID：64-->
            <Yzyc v-if="currentNav==64" :key="64" :lanmudata="lanmu"></Yzyc>
            <!--社保医疗 LanmuID：58-->
            <Yzyc v-if="currentNav==58" :key="58" :lanmudata="lanmu"></Yzyc>
            <!--房产信息 LanmuID：27-->
            <Fcxx v-if="currentNav==27" :key="27" :lanmudata="lanmu"></Fcxx>
            <!--政務公開 LanmuID：20-->
            <Zwgk v-if="currentNav==20" :key="20" :lanmudata="lanmu"></Zwgk>
            <!--地图指引 LanmuID：24-->
            <mymap v-if="currentNav==24" :key="24" :lanmudata="lanmu"></mymap>
            <!--银川日报 LanmuID：35-->
            <newsplayer v-if="currentNav==35" :key="35" :pdflist="RBpdflist"></newsplayer>
            <!--<pdfplayer v-show="currentNav==35" :key="35" :pdflist="RBpdflist"></pdfplayer>-->
            <!--银川晚报 LanmuID：31-->
            <newsplayer v-if="currentNav==31" :key="31" :pdflist="WBpdflist"></newsplayer>
            <!--<contentplayer></contentplayer>-->
            <!--视屏点播 LanmuID：21-->
            <videoplayer v-if="currentNav==21" :lanmudata="lanmu"></videoplayer>
            <!--</transition>-->
          </div>

        </div>
        <div class="navMenu relative-position">
          <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide style="width: auto" :key="index" v-for="(item,index) in lanmuData">

              <button @click="navBtnClick(index,item)" glossy
                      class="navbtns  q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-push q-focusable q-hoverable text-white"
                      v-bind:class="[item.LanmuID==currentNav?'navbtn-focus':'']">
                <div class="navbtn">
                  <img v-if="item.VerticalIcon" :src="getUrl(item.VerticalIcon)">
                  <div v-else class="noIcon"></div>
                  <div class="text-no-wrap">{{item.Title}}</div>
                </div>
              </button>
            </swiper-slide>

          </swiper>
          <div class="swiper-button-prev swiper-button-white ss" style="left: 0" slot="button-prev"></div>
          <div class="swiper-button-next swiper-button-white ss" style="right: 0" slot="button-next"></div>
        </div>

        <div class="screensaver" v-show="isSaver">
          <q-carousel
            color="white"
            infinite
            :autoplay="10000"
            class="saver-carousel"
          >
            <q-carousel-slide class="saver-slide" :key="index" v-for="(item,index) in RBpdflist">
              <img style="width: 100%;height: 100%" :src="item"/>
            </q-carousel-slide>

          </q-carousel>
        </div>

      </div>
      <div class="pageFoot" >
        <div class="fit">
          <video-player  style="height: 100%;width: 100%"
                         ref="homevideoPlayer"
                         :options="homeplayerOptions"
                         @ended="nextVideo"
                         @error="nextVideo"
                         @pause="onPlayerPause($event)"
                         customEventName="changed">
          </video-player>
        </div>
      </div>
    </div>

  </q-page>
</template>
<script>
  import pdf from 'vue-pdf'
  import {ResourceUrl, csid, pwd} from '../config/config.js'
  import mymap from '../components/mymap.vue'
  import pdfplayer from '../components/pdfplayer.vue'
  import contentplayer from '../components/contentplayer.vue'
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import Yzyc from "../components/yzyc.vue"
  import Fcxx from "../components/fcxx.vue"
  import Zwgk from '../components/zwgk.vue'
  import Videoplayer from '../components/videoplayer'
  import Newsplayer from "../components/newsplayer";


  export default {
    name: 'PageIndex',
    components: {
      Newsplayer,
      Yzyc,
      pdfplayer,
      swiper,
      swiperSlide,
      contentplayer,
      mymap,
      Yzyc,
      Fcxx,
      Zwgk,
      Videoplayer,
      pdf


    },
    filters: {},
    computed:{
      player() {
        return this.$refs.homevideoPlayer.player
      }
    },
    methods: {
      datePad:function (s) {
        let result;
        if(s<10){
          result='0'+s;
        }else{
          result=s;
        }
        return result;
      },
      ShowClock:function () {
        setInterval(()=>{
          let d=new Date();
          this.time_date=d.getFullYear() + "年" +(d.getMonth() + 1) + "月" + d.getDate() + "日";
          this.time_week=' 星期'+'日一二三四五六'.charAt(d.getDay());
          this.time_time=this.datePad(d.getHours())+':'+this.datePad(d.getMinutes())+":"+this.datePad(d.getSeconds());
        },1000);
      },
      CloseSaver:function () {
        this.isSaver=false;
        this.saverStart=0;
      },
      refresh: function () {
        window.location.reload();
      },
      getQueryString: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
          return unescape(r[2]);
        }
        return null;
      },
      getUrl: function (str) {
        if (!str) return '';
        return ResourceUrl + str;
      },
      getAd: function () {
        let self=this;
        this.$axios.get('/Service/h5/h5AD.ashx', {params:{csid:this.getQueryString("csid"),pwd:this.getQueryString("pwd")}}).then((response) => {
        //this.$axios.get('/Service/h5/h5AD.ashx', {params: {csid: csid, pwd: pwd}}).then((response) => {
          if (response.status == 200) {
            var data = response.data;
            data.forEach((item)=> {
              console.log(item.FileName);
              this.videolist.push({src:this.getUrl(item.FileName),poster:this.getUrl(item.Icon)});
            });

            if(data.length>0){
              this.homeplayerOptions.sources=[this.videolist[this.currentVideoIndex]];
              console.log(this.player)
              //this.player.play();
            }



          } else {

          }
        });
      },
      getNewsPaper: function () {
        //console.log(this.getQueryString("csid")+'   '+this.getQueryString("pwd"));
        //this.$axios.get('/Service/h5/NewsPaperList.ashx', {params: {csid: csid, pwd: pwd}}).then((response) => {
          this.$axios.get('/Service/h5/NewsPaperList.ashx',{params:{csid:this.getQueryString("csid"),pwd:this.getQueryString("pwd")}}).then((response)=>{

          if (response.status == 200) {

            var data = response.data;
            //日报
            var dayNews = data.filter(function (x) {
              return x.PublishType == 1 && x.LayoutType == 1;
            });
            //晚报
            var nightNews = data.filter(function (x) {
              return x.PublishType == 0 && x.LayoutType == 1;
            });
            if (dayNews.length > 0) {
              this.RBpdflist = dayNews.sort(function (a, b) {
                return b.NPDate - a.NPDate;
              })[0].PageFile.split('|').sort(function (x, y) {
                return x - y;
              });
            }
            if (nightNews.length > 0) {
              this.WBpdflist = nightNews.sort(function (a, b) {
                return b.NPDate - a.NPDate;
              })[0].PageFile.split('|').sort(function (x, y) {
                return x - y;
              });
            }


          } else {

          }
        }).catch((err) => {
          console.error(err)
        })
      },
      getLanmuData: function () {
         this.$axios.get('/Service/h5/LanmuData.ashx',{params:{csid:this.getQueryString("csid"),pwd:this.getQueryString("pwd")}}).then((response)=>{
        //this.$axios.get('/Service/h5/LanmuData.ashx', {params: {csid: csid, pwd: pwd}}).then((response) => {
          if (response.status == 200) {

            var data = eval('(' + response.data + ')');
            var lanmuList = new Array();
            //栏目
            data.lanmuList.sort(function (a, b) {
              return a.Orders - b.Orders;
            }).forEach((item, index) => {
              let obj = item;
              let navArray = data.dataList1.filter(function (x) {
                return x.Lm_ID == item.LanmuID;
              });
              obj.isShowNav = true;
              obj.dataList1 = navArray;
              //二级
              obj.dataList1.forEach((o, i) => {
                let d2 = o;
                let secondNavArray = data.dataList2.filter((z) => {
                  return z.PID == o.ID;
                });
                d2.dataList2 = secondNavArray;
                d2.dataList2.forEach((itm, idx) => {
                  let d3 = itm;
                  let thirdNavArray = data.dataList3.filter((y) => {
                    return y.PID == itm.ID;
                  });
                  d3.dataList3 = thirdNavArray;

                });
              });
              lanmuList.push(obj);
            });
            //console.log(lanmuList);
            console.log(lanmuList)
            this.lanmuData = lanmuList;
            this.currentNav = lanmuList[0].LanmuID;
          } else {

          }
        }).catch((err) => {
          console.log(err)
          this.$q.notify({

            message: `获取栏目数据时错误！`,
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
      ScreenSaver:function () {
        //屏保为180S
        setInterval(()=>{
          this.saverStart++;
          if(this.saverStart>60){
            this.isSaver=true;
          }
        },3000);
      },
      navBtnClick: function (index, item) {

        this.currentNav = item.LanmuID;
        this.lanmu = this.lanmuData.filter((x) => {
          return x.LanmuID == item.LanmuID;
        })[0];
        console.log(this.lanmu);


      },
      onPlayerPause(e){
        this.player.play()
      },
      nextVideo: function () {

        let count = this.videolist.length;
        if (this.currentVideoIndex < count - 1) {
          this.currentVideoIndex++;
        } else {
          this.currentVideoIndex = 0;
        }
        this.homeplayerOptions.sources=[this.videolist[this.currentVideoIndex]];
        this.player.play()
      }
    },
    mounted: function () {
      this.ScreenSaver();
      this.getLanmuData();
      this.getNewsPaper();
      this.getAd();
      this.ShowClock();
    },
    data() {
      return {
        time_date:'',
        time_week:'',
        time_time:'',
        saverStart:0,
        isSaver:false,
        currentNav: "",
        lanmu: [],
        lanmuData: [],
        lanmuList: [],//栏目列表
        LanumID: 0,//当前栏目
        currentVideoIndex: 0,
        videolist:[],
        homeplayerOptions: {
          playToggle:false,
          autoplay: true,
          bigPlayButton:false,
          controlBar:false,
          sources: [],
          language: 'zh-CN',
          techOrder: ['html5','flash'],
          //poster: this.getUrl(this.lanmudata.dataList1[0].Icon)
        },
        swiperOption: {
          slidesPerView: "7",
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }

        },
        RBpdflist: [],
        WBpdflist: []
      }

    }
  }
</script>
<style>
  .pageLayout {
    /*width: 640px;*/
    width: 1080px;
    height: 1920px;
    /*width: 1280px;*/
    /*height: 1920px;*/
    /*min-width: 640px;*/
    /*min-height: 960px;*/
    margin: 0 auto;
    box-sizing: border-box;
    overflow: hidden;

    /*width: 100%;*/
    /*height:100%;*/
  }

  .pageHeader {
    background: rgb(34, 53, 74);
    width: 100%;
    padding: 1rem 3rem;
    height: 120px;
    position:relative;
    overflow: hidden;
  }

  .logo {
    background: url("../statics/icons/logo.png") no-repeat 0 0/100% 100%;
    width: 25%;
    height: 75%;
    float: left;
    margin: 1rem 0;


  }

  .pageBody {
    background: rgb(210, 210, 211);
    height: 990px;
  }

  .pageFoot {
    height: 810px;
    width:100%;
  }

  .bodyContent {
    width: 100%;
    height: 840px;

  }

  .navMenu {
    background: url("../statics/icons/menuBg.png") repeat;
    padding: 1rem 3rem;
    height: 150px;

  }

  .content-container {
    border-radius: .3rem;
    background: rgb(211,211,210);
    padding: 1.5rem;

  }

  .navMenu::-webkit-scrollbar {
    display: none;
  }

  .navbtn {
    padding: 1.3rem .2rem;
    margin-top: .3rem;
  }

  .navbtn img {
    width: 5.5rem;
    height: 5.5rem;
  }

  .noIcon {
    width: 2rem;
    height: 2.3rem;
  }

  .navbtns {
    background: url("../statics/icons/btnBg0001.png") no-repeat 0 0/100% 100%;
    border-radius: 10px;
    color: white;
    font-size: 2.3rem;
  }

  .navbtn-focus {
    background: url("../statics/icons/btnBg0002.png") no-repeat 0 0/100% 100%;
  }

  .ss {
    width: 2rem;
    height: 2.36rem;
    background-size: 2rem 2.36rem;
    margin-top: -0.8rem;

  }

  #myVideo {
    width: 100%;
    height: 100%;
    background: black;
  }


</style>
