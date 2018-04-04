<template>
  <div class="mymap">
    <div class="map-body relative-position">
      <div class="bus">
         <ul class="bus-ul">
           <li v-for="(item,index) in bus">
             <q-btn size="xs" dense color="white" text-color="primary" @click="showBus(item)" :label="item.line">
               <q-popover
                 anchor="bottom left"
                 self="top left"
               >
                <div class="bus-card">
                  <div class="bus-title">
                    <span class="bus-line">100路公交</span><span class="bus-time">2018-4-3 14:47:59</span>
                  </div>
                  <div class="bus-info row">
                    <div class="col-4">
                      <img src="../statics/icons/bus.png">
                    </div>
                    <div class="col-6">
                        sf
                    </div>
                  </div>
                  <div class="bus-stations">
                    <swiper :options="busswiperOption" ref="bus-swiper" >
                      <!-- slides -->
                      <swiper-slide :key="_index" v-for="(_item,_index) in item.stations" style="width: auto">
                          <q-btn>{{_item.name}}</q-btn>
                      </swiper-slide>

                    </swiper>

                  </div>
                </div>
               </q-popover>
             </q-btn>
           </li>

         </ul>

      </div>
      <div class="busCard">

      </div>
      <div class="map"></div>
    </div>
    <div class="map-nav no-wrap">
      <div class="nav-btn-wrap" v-for="(index,item) in mapNav">
        <button  @click="MapNavBtnClick(index,item)"
                :style="{backgroundImage:'url(../statics/icons/'+index.btn+'.png)'}" glossy
                class="map-navbtns  q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-push q-focusable q-hoverable text-white"
                v-bind:class="[index==currentNav?'map-navbtn-focus':'']">

        </button>
      </div>

    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  export default {

    methods: {
      MapNavBtnClick(index, item) {
         this.currentNav=index;
      },
      showBus(item){
        this.isShow=true;
        this.currentBus=item;
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    mounted:function () {
      this.currentNav=0;
    },
    data() {

      return {
        currentNav: 0,
        busswiperOption: {
          slidesPerView: 'auto'
        },
        mapNav: [
          {btn: 'bus'},
          {btn: 'food'},
          {btn: 'hotel'},
          {btn: 'bank'},
          {btn: 'Hydropower'}
        ],
        bus:[
          {line:"121路公交",stations:[{name:"起点站",index:0},{name:"第一站",index:1},{name:"第一站",index:2},{name:"第二站",index:3},{name:"第三站",index:4},{name:"第四站",index:5}]},
          {line:"121路公交",stations:[{name:"起点站",index:0},{name:"第一站",index:1},{name:"第一站",index:2},{name:"第二站",index:3},{name:"第三站",index:4},{name:"第四站",index:5}]},
        ]

      }
    }
  }
</script>

<style>
  .mymap{
    height:100%;
    padding: 1rem;
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
