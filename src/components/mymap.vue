<template>
  <div class="mymap">
    <div class="map-body relative-position">
      <div class="bus" v-if="id1==0">
         <ul class="bus-ul">
           <li v-for="(item,index) in lanmudata.dataList1[id1].dataList2">
             <q-btn size="xs" dense color="white" text-color="primary" @click="id2=index" :label="item.Title">
               <q-popover
                 anchor="bottom left"
                 self="top left"
               >
                <div class="bus-card">
                  <div class="bus-title">
                    <span class="bus-line">{{item.Title}}</span><span class="bus-time">2018-4-3 14:47:59</span>
                  </div>
                  <div class="bus-info row">
                    <div class="col-5">
                      <img style="width: 100%;height: auto" :src="getUrl(item.Icon)">
                    </div>
                    <div class="col-7">
                      运营时间：{{item.Ext1}}<br>
                      发车时间：{{item.Ext2}}<br>
                      起点站首末时间：{{item.Ext3}}<br>
                      终点站首末时间：{{item.Ext4}}<br>
                      票价信息：{{item.Ext5}}<br>
                      汽车公司：{{item.Ext6}}<br>
                    </div>
                  </div>
                  <div class="bus-stations">
                    <swiper :options="busswiperOption" ref="bus-swiper" >
                      <swiper-slide  style="width: auto">
                          <span :key="index" v-for="(item,index) in lanmudata.dataList1[id1].dataList2[id2].dataList3">{{item.Title}}</span>
                      </swiper-slide>

                    </swiper>

                  </div>
                </div>
               </q-popover>
             </q-btn>
           </li>

         </ul>

      </div>
      <div class="mapCard fit" v-else>
        <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler">
        </baidu-map>
      </div>
    </div>
    <div class="map-nav no-wrap">

        <button  @click="id1=0"
                 glossy style="background: url('../statics/icons/bus.png') no-repeat 0 0/cover;"
                class="map-navbtns  q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-push q-focusable q-hoverable text-white"
                v-bind:class="[id1==0?'map-navbtn-focus':'']">

        </button>
        <button  @click="id1=1"
                 glossy style="background: url('../statics/icons/hotel.png') no-repeat 0 0/cover;"
                 class="map-navbtns  q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-push q-focusable q-hoverable text-white"
                 v-bind:class="[id1==1?'map-navbtn-focus':'']">

        </button>
        <button  @click="id1=2"
                 glossy style="background: url('../statics/icons/food.png') no-repeat 0 0/cover;"
                 class="map-navbtns  q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-push q-focusable q-hoverable text-white"
                 v-bind:class="[id1==2?'map-navbtn-focus':'']">

        </button>
        <button  @click="id1=3"
                 glossy style="background: url('../statics/icons/bank.png') no-repeat 0 0/cover;"
                 class="map-navbtns  q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-push q-focusable q-hoverable text-white"
                 v-bind:class="[id1==3?'map-navbtn-focus':'']">

        </button>


    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {ResourceUrl} from '../config/config'


  export default {
    props:["lanmudata"],
    methods: {
      MapNavBtnClick:function (index) {
        this.id2=index;
      },
      getUrl: function(str){
        if(!str) return '';
        return ResourceUrl+str;
      },
      showBus:function (index) {
        this.id2=index;
      },
      handler ({BMap, map}) {
        console.log(BMap, map)
        this.center.lng = 116.404
        this.center.lat = 39.915
        this.zoom = 15
      }
    },
    components: {
      swiper,
      swiperSlide

    },

    data() {

      return {
        id1:0,
        id2:0,
        center: {lng: 0, lat: 0},
        zoom: 3,
        busswiperOption:{

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
    width:  6rem;
    height: 6rem;
    border-radius: 1.2rem;
    margin:0 .2rem;
    opacity: .5;

  }
  .map-body{
    height:77%;
  }

  .map-nav{

    margin-top: .5rem;
    background: rgb(210, 210, 211);
    padding: .5rem 0;
    overflow: hidden;

  }

  .nav-btn-wrap{
    width:20%;
    display: inline-block;
    height: 100%;
    float: left;
    text-align: center;

  }
  .bus{
    border-radius: .3rem;
    background-color: #b2ebf2;
    width: 100%;
    height: 100%;
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
    display: block;
    clear:both;

  }
  .bus-card{
    width: 30rem;
  }
  .bus-info img{

  }
</style>
