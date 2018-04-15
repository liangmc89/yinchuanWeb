<template>
  <div class="mymap">
    <div class="map-body relative-position">
      <div class="bus" v-if="id1==0">
             <swiper style="height: 100%" :options="busScrollOption">
               <swiper-slide style="height: auto">
                 <q-btn size="xl" class="bus-btn" :key="index" v-for="(item,index) in lanmudata.dataList1[id1].dataList2"  dense color="white" text-color="primary" @click="ShowBus(index)" :label="item.Title">
                   <q-popover :key="index"
                              anchor="bottom left"
                              self="top left">
                     <div class="bus-card">
                       <div class="bus-title row">
                         <div class="bus-line col-6">{{item.Title}}</div><div class="bus-time col-6"></div>
                       </div>
                       <div class="bus-info ">
                         <div class="row shadow-3" style="padding: 1rem 0;background: rgb(247,250,255)">
                         <div class="col-4" >
                           <img class="bus-icon " :src="getUrl(item.Icon)">
                         </div>
                         <div class="col-8 bus-detail">
                           运营时间：{{item.Ext1}}<br>
                           发车时间：{{item.Ext2}}<br>
                           起点站首末时间：{{item.Ext3}}<br>
                           终点站首末时间：{{item.Ext4}}<br>
                           票价信息：{{item.Ext5}}<br>
                           汽车公司：{{item.Ext6}}<br>
                         </div>
                         </div>
                       </div>
                       <div class="bus-stations" >
                         <swiper :options="busswiperOption" ref="bus-swiper" style="width: 100%;padding: .5rem;background: rgb(247,250,255)" class="shadow-3" >
                           <swiper-slide style="width:auto" class="no-wrap bus-stations-slide">
                             <div class="bus-stations-item"  :key="index" v-for="(item,index) in busStations">
                               <div>{{index+1}}</div><div class="bus-station-circle" ></div>  <div>{{item.Title}}</div></div>
                           </swiper-slide>
                         </swiper>
                       </div>
                     </div>
                   </q-popover>
                 </q-btn>
               </swiper-slide>
             </swiper>

      </div>
      <div class="mapCard fit" v-else>
        <!--https://dafrok.github.io/vue-baidu-map/#/zh/control/geolocation-->
        <baidu-map class="map" :enableMapClick="false" :center="center" :zoom="zoom" @ready="handler">
          <!--比例尺-->
          <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
          <!--缩放-->
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          <!--定位-->
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>

          <bm-marker @click="PointClick(item)" :key="index" v-for="(item,index) in points[id1-1]" :position=" {lng: item.lng, lat: item.lat}"  >

          </bm-marker>
          <bm-info-window :position="{lng: currentPoint.lng, lat: currentPoint.lat}" title="" :show="isShowInfo" @close="infoWindowClose" @open="infoWindowOpen">
            <p>{{currentPoint.title}}</p>
            <p>地址：{{currentPoint.address}}</p>
            <p>电话：{{currentPoint.tel}}</p>
          </bm-info-window>


        </baidu-map>
      </div>
    </div>
    <div class="map-nav row no-wrap text-center">
        <div class="col-3">
        <button  @click="NavBtnClick(0)"
                 glossy style="background: url('../statics/icons/bus.png') no-repeat 0 0/cover;"
                class="map-navbtns   q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-push q-focusable q-hoverable text-white"
                v-bind:class="[id1==0?'map-navbtn-focus':'']">

        </button>
        </div>
      <div class="col-3">
        <button  @click="NavBtnClick(1)"
                 glossy style="background: url('../statics/icons/hotel.png') no-repeat 0 0/cover;"
                 class="map-navbtns  q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-push q-focusable q-hoverable text-white"
                 v-bind:class="[id1==1?'map-navbtn-focus':'']">

        </button>
      </div>
        <div class="col-3">
        <button  @click="NavBtnClick(2)"
                 glossy style="background: url('../statics/icons/food.png') no-repeat 0 0/cover;"
                 class="map-navbtns  q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-push q-focusable q-hoverable text-white"
                 v-bind:class="[id1==2?'map-navbtn-focus':'']">

        </button>
        </div>
          <div class="col-3">
        <button  @click="NavBtnClick(3)"
                 glossy style="background: url('../statics/icons/bank.png') no-repeat 0 0/cover;"
                 class="map-navbtns  q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-push q-focusable q-hoverable text-white"
                 v-bind:class="[id1==3?'map-navbtn-focus':'']">

        </button>
          </div>


    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {ResourceUrl} from '../config/config'


  export default {
    props: ["lanmudata"],
    methods: {
      ShowBus: function (index) {
        this.id2 = index;
        this.busStations = this.lanmudata.dataList1[this.id1].dataList2[this.id2].dataList3.sort(function (a, b) {
          return a.Orders - b.Orders;
        });


      },
      NavBtnClick: function (index) {
        this.id1 = index;
        this.isShowInfo = false;
      },
      MapNavBtnClick: function (index) {
        this.id2 = index;
      },
      getUrl: function (str) {
        if (!str) return '';
        return ResourceUrl + str;
      },
      showBus: function (index) {
        this.id2 = index;
      },
      handler({BMap, map}) {
        console.log(BMap, map)
        this.center.lng = 106.252474
        this.center.lat = 38.477826
        this.zoom = 13
      },
      PointClick: function (item) {
        if (item != undefined) {
          this.currentPoint = item;
          this.isShowInfo = true;
        }

      },
      infoWindowClose(e) {
        this.isShowInfo = false
      },
      infoWindowOpen(e) {
        this.isShowInfo = true
      }

    },
    components: {
      swiper,
      swiperSlide,


    },

    data() {

      return {
        id1: 0,
        id2: 0,
        busStations: [],
        center: {lng: 0, lat: 0},
        zoom: 3,
        isShowInfo: false,
        currentPoint: {},
        points: [
          [{
            title: '昆仑假日酒店',
            lng: 106.252474,
            lat: 38.477826,
            address: '银川金凤区黄河东路848号(金凤区政府对面,近正源南街)',
            tel: '(0951)5019588'
          }, {
            title: '隆翔商务宾馆清和店',
            lng: 106.275637,
            lat: 38.448451,
            address: '银川市兴庆区清和北街227号（清和北街和兴业巷交汇处）',
            tel: ''
          }, {
            title: '7天连锁酒店（银川北京路店）',
            lng: 106.296574,
            lat: 38.477939,
            address: '银川市兴庆区北京东路484号（柏悦酒店对面或中山北街与北京路交口）',
            tel: '(0951)6095777,(0951)5134688'
          }, {
            title: '百吉大酒店',
            lng: 106.293309,
            lat: 38.466449,
            address: '新华东街219号(金泰大厦斜对面,新华街招商银行旁)',
            tel: '(0951)6019999'
          }, {
            title: '锦江之星酒店（银川南门店）',
            lng: 106.286934,
            lat: 38.460639,
            address: '兴庆区长城东路456号(南关清真寺附近)',
            tel: '(0951)2044888'
          }],
          [{
            title: '紅滿堂火鍋（福州南街店）',
            lng: 106.195986,
            lat: 38.490527,
            address: '金凤区福州南街1-4号营业房（近中岗楼）',
            tel: '(0951)3064488'
          }, {
            title: '尚一方',
            lng: 106.222137,
            lat: 38.487609,
            address: '亲水大街380号(世纪金花D座一楼)',
            tel: ''
          }, {
            title: '阿叶羊杂碎',
            lng: 106.272919,
            lat: 38.47159,
            address: '银川兴庆区前进街180号(双宝超市富宁街店东侧路南)',
            tel: '15008615563'
          }, {
            title: '迎宾楼（解放西街店）',
            lng: 106.28132,
            lat: 38.472817,
            address: '兴庆区解放西街11号',
            tel: '(0951)6022339'
          }, {
            title: '汉拿山（银川金凤万达店）',
            lng: 106.25432,
            lat: 38.492503,
            address: '银川市金凤区正源北街22号银川金凤万达广场F3',
            tel: '(0951)5108281'
          }],
          [{
            title: '中国邮政储蓄银行',
            lng: 106.285272,
            lat: 38.479748,
            address: '民族北街190号',
            tel: ''
          }, {
            title: '中国建设银行（天平街支行）',
            lng: 106.275915,
            lat: 38.487881,
            address: '天平街34号福川苑附近',
            tel: '(0951)5065076'
          }, {
            title: '交通银行',
            lng: 106.286259,
            lat: 38.482872,
            address: '民族北街292号附近',
            tel: ''
          }, {
            title: '中国工商银行（银川光华支行）',
            lng: 106.275758,
            lat: 38.451903,
            address: '宁夏回族自治区银川市兴庆区民族南街720号(光耀美具北侧)',
            tel: ''
          }, {
            title: '中国农业银行',
            lng: 106.275637,
            lat: 38.448451,
            address: '银川市光华家园7-8号营业房',
            tel: '(0951)4104683'
          }]
        ],
        busswiperOption: {
          slidesPerView: 'auto',
          spaceBetween: 10,
        },
        busScrollOption:{
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true,
          mousewheel: true
        }


      }


    }

  }
</script>

<style>
  .mymap{
    height:100%;
    padding: 1rem;

  }
  .map{
    width: 100%;
    height: 100%;
  }
  .map-navbtns {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 6rem;
    height: 6rem;
    border-radius: 1.2rem;
    opacity: .5;
    margin: .5rem 0;

  }
  .map-body{

    height: 80%;
    width: 100%;
  }

  .map-nav{
    border-radius: .3rem;
    margin:0.5% 0;
    background: rgb(210, 210, 211);
    height: auto;
    border:1px solid rgb(182,196,211);

  }

  .nav-btn-wrap{
    width:20%;
    displat: inline-block;
    height: 100%;
    float: left;
    text-align: center;

  }
  .bus{
    border-radius: .3rem;
    background:url("../statics/icons/busBg.png") no-repeat 0 0/100% 100%;
    width: 100%;
    height: 100%;
    border:1px solid rgb(182,196,211);
  }
  .bus li{
    list-style: none;
    float: left;
    margin: .5rem .2rem;
  }

  .map-navbtn-focus {
    opacity: 1;
  }
  .bus-ul{
    margin: 0;
  }
  .bus-ul:after{
    displat: block;
    clear:both;

  }
  .bus-card{
    /*width: 30rem;*/
    max-width: 50vw;
  }
  .bus-info img{

  }
</style>
