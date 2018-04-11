<template>
  <q-page>

    <div class="pageLayout">
    <div class="pageHeader">
      <div class="logo">

      </div>
      <!--<img src="../statics/icons/logo.png"/>-->
    </div>
    <div class="pageBody relative-position">
      <div class="bodyContent">
        <div class="content-container fit relative-position">
          <!--<transition-->

            <!--enter-active-class="animated fadeIn"-->
            <!--leave-active-class="animated fadeOut"-->
          <!--&gt;-->

          <!--<pdfplayer v-show="currentNav==0" :pdflist="RBpdflist"></pdfplayer>-->
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
          <Zwgk v-if="currentNav==20" :key="20" :lanmudata="lanmu" ></Zwgk>
          <!--地图指引 LanmuID：24-->
          <mymap v-if="currentNav==24" :key="24" :lanmudata="lanmu"></mymap>
          <!--银川日报 LanmuID：35-->
          <pdfplayer v-show="currentNav==35" :key="35" :pdflist="RBpdflist"></pdfplayer>
          <!--银川晚报 LanmuID：31-->
          <pdfplayer v-show="currentNav==31" :key="31" :pdflist="RBpdflist"></pdfplayer>
        <!--<contentplayer></contentplayer>-->

          <!--</transition>-->
        </div>

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
        <div class="swiper-button-prev ss" style="left: 0" slot="button-prev"></div>
        <div class="swiper-button-next ss" style="right: 0" slot="button-next"></div>
      </div>
    <div class="pageFoot">
      <video  :src="videolist[currentVideoIndex]" muted id="myVideo" ref="myVideo" autoplay preload="auto"
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
  import Yzyc from "../components/yzyc.vue"
  import Fcxx from "../components/fcxx.vue"
  import Zwgk from '../components/zwgk.vue'



  export default {
    name: 'PageIndex',
    components: {
      Yzyc,
      pdfplayer,
      swiper,
      swiperSlide,
      contentplayer,
      mymap,
      Yzyc,
      Fcxx,
      Zwgk

    },
    filters:{

    },
    methods: {


      getQueryString:function(name) {
          var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
          var r = window.location.search.substr(1).match(reg);
          if (r != null) {
            return unescape(r[2]);
          }
          return null;
        },

      getUrl: function(str){
        if(!str) return '';
        return ResourceUrl+str;
      },
      getNewsPaper:function () {
        //console.log(this.getQueryString("csid")+'   '+this.getQueryString("pwd"));
        this.$axios.get('/Service/h5/NewsPaperList.ashx',{params:{csid:csid,pwd:pwd}}).then((response)=>{
        //this.$axios.get('/Service/h5/NewsPaperList.ashx',{params:{csid:this.getQueryString("csid"),pwd:this.getQueryString("pwd")}}).then((response)=>{

            if (response.status == 200) {

              var data=response.data ;
              //日报
               var dayNews=data.filter(function (x) {
                 return x.PublishType==1&&x.LayoutType==1;
               });
               //晚报
               var nightNews=data.filter(function (x) {
                 return x.PublishType==0&&x.LayoutType==1;
               });
               if (dayNews.length>0){
                this.RBpdflist= dayNews.sort(function (a,b) {
                  return  b.NPDate-a.NPDate;
                })[0].PageFile.split('|').sort(function (x,y) {
                  return x-y;
                });
               }
               if(nightNews.length>0){
                 this.WBpdflist=nightNews.sort(function (a,b) {
                   return b.NPDate-a.NPDate;
                 })[0].PageFile.split('|').sort(function (x,y) {
                   return x-y;
                 });
               }

               console.log(this.WBpdflist);
               console.log(this.RBpdflist);



            }else{

            }
        }).catch((err)=>{
            console.error(err)
        })
      },
      getLanmuData: function () {
       // this.$axios.get('/Service/h5/LanmuData.ashx',{params:{csid:this.getQueryString("csid"),pwd:this.getQueryString("pwd")}}).then((response)=>{
          this.$axios.get('/Service/h5/LanmuData.ashx',{params:{csid:csid,pwd:pwd}}).then((response)=>{
          if (response.status == 200) {

            var data=eval('(' + response.data + ')');
               var lanmuList=new Array();
               //栏目
               data.lanmuList.sort(function (a,b) {
                 return a.Orders-b.Orders;
               }).forEach((item,index)=> {
                 let obj=item;
                 let navArray= data.dataList1.filter(function (x) {
                    return x.Lm_ID==item.LanmuID;
                  });
                 obj.isShowNav=true;
                 obj.dataList1=navArray;
                 //二级
                 obj.dataList1.forEach((o,i)=>{
                   let d2=o;
                   let secondNavArray=data.dataList2.filter((z)=>{
                     return z.PID==o.ID;
                   });
                   d2.dataList2=secondNavArray;
                   d2.dataList2.forEach((itm,idx)=>{
                     let d3=itm;
                     let thirdNavArray=data.dataList3.filter((y)=>{
                       return y.PID==itm.ID;
                     });
                     d3.dataList3=thirdNavArray;

                   });
                    });
                 lanmuList.push(obj);
                 });
               //console.log(lanmuList);
               console.log(lanmuList)
               this.lanmuData=lanmuList;
               this.currentNav=lanmuList[0].LanmuID;
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

      navBtnClick: function (index,item) {

        this.currentNav=item.LanmuID;
         this.lanmu= this.lanmuData.filter((x)=>{
          return x.LanmuID==item.LanmuID;
        })[0];
         console.log(this.lanmu);
        //this.lanmuData={ lanmuId:item.LanmuID,dataList1:this.dataList1,dataList2:this.dataList2,dataList3:this.dataList3};

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
      this.getNewsPaper();
    },
    data() {
      return {
        currentNav:"",
        lanmu:[],
        lanmuData:[],
        lanmuList:[],//栏目列表
        LanumID: 0,//当前栏目
        currentVideoIndex: 0,
        videolist: ['http://occcudapv.bkt.clouddn.com/guchenghu/bb7c6e4c-e62e-4ea7-bdc9-f9ce3a678274.mp4'
//          ,
//                 'http://vjs.zencdn.net/v/oceans.mp4'
        ],
        swiperOption: {
          slidesPerView: "auto",
          spaceBetween: 3,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }

        },
        RBpdflist:[] ,
        WBpdflist: []
      }

    }
  }
</script>
<style>
  .pageLayout {
    width: 640px;
    /*width: 100%;*/
    height: 100%;
    /*width: 1280px;*/
    /*height: 1920px;*/
    /*min-width: 640px;*/
    /*min-height: 960px;*/
    margin: 0 auto;


    /*width: 100%;*/
    /*height:100%;*/
  }


  .pageHeader {
    background: rgb(34, 53, 74);
    width: 100%;
    padding: 1rem;
    height: 7%;
  }

  .logo {
    background: url("../statics/icons/logo.png") no-repeat 0 0/100% 100%;
    width: 30%;
    height: 100%;
  }

  .pageBody {
    background: rgb(210, 210, 211);
    height: 48%;
  }
  .pageFoot{
    height: 34%;
  }

  .bodyContent{
    width: 100%;
    height: 100%;
    padding: 1rem;

  }

  .navMenu {
    background: url("../statics/icons/menuBg.png") repeat;
    padding: 1rem;
    height: 10%;

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
    width: 2.6rem;
    height: 2.6rem;
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
    height: 100%;
    background: black;
  }


</style>
