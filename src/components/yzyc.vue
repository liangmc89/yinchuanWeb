<template>
  <div class="content-layout">
    <q-window-resize-observable @resize="onResize" />
    <div class="content-nav">
      <swiper :options="subswiperOption" ref="content-navs-swiper" >
        <!-- slides -->
        <swiper-slide :key="index" v-for="(item,index) in lanmudata.dataList1"  style="width: auto">
          <button @click="contentNavBtnClick(index,item)" glossy
                  class="content-navbtns  q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-push q-focusable q-hoverable text-white"
                  v-bind:class="[index==id1?'contentnavbtn-focus':'']">
            <div class="content-navbtn">
              <img :src="item.icon" v-if="item.icon"/>
              <div class="text-no-wrap">{{item.Title}}</div>
            </div>
          </button>
        </swiper-slide>

      </swiper>
    </div>

    <div class="content-body" id="content-body">
      <hr class="content-hr">
      <div class="row">
      <div class="content-title col-6"  >
        <swiper :options="scrollswiperOption" :style="{height:swiperHeight}" v-if="isShow">
          <swiper-slide style="height: auto" >
            <div class="secondNav" v-if="isShow" >
              <ul>
                <li :key="index" :class="[index==id2?'secondNav-focus':'']"  v-for="(item,index) in lanmudata.dataList1[id1].dataList2" @click="secondNavClick(item,index)">
                  {{item.Title}}
                </li>

              </ul>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="content-container col-6 ">
        <swiper :options="scrollswiperOption" :style="{height:swiperHeight}"v-if="isShow&&lanmudata.dataList1[id1].dataList2[id2]!=undefined&&lanmudata.dataList1[id1].dataList2[id2].dataList3!=undefined" style="padding: .5rem;border-radius: .3rem" :key="id2" class="shadow-3">
          <swiper-slide    style="padding: .2rem;height: auto"  >
            <swiper :options="photoswiperOption" >
              <swiper-slide :key="index" v-for="(item,index) in lanmudata.dataList1[id1].dataList2[id2].dataList3">
                <q-card :key="item.ID"  style="margin-bottom: 1rem"   >
                  <q-card-media>
                    <img :src="getUrl(item.Path)">
                    <q-card-title slot="overlay">
                      <span class="c-title">{{item.Title}}</span>
                    </q-card-title>
                  </q-card-media>


                </q-card>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <p v-if="lanmudata.dataList1[id1].dataList2[id2]!=undefined">{{lanmudata.dataList1[id1].dataList2[id2].title}}</p>
            <p class="c-text text-faded" v-if="lanmudata.dataList1[id1].dataList2[id2]!=undefined">{{lanmudata.dataList1[id1].dataList2[id2].content}}</p>

          </swiper-slide>

        </swiper>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {ResourceUrl} from '../config/config'

  export default {
    props:["lanmudata"],
    methods:{
      getUrl: function(str){
        if(!str) return '';
        return ResourceUrl+str;
      },
      contentNavBtnClick:function (index,item) {
        this.id1=index;
      },
      secondNavClick:function (item,index) {
        this.id2=index;

      },
      onResize (size) {
//        this.swiperHeight=document.getElementById('content-body').clientHeight-24+'px';
//        this.isShow=true;
        //console.log(size)
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    mounted:function () {
       this.swiperHeight=document.getElementById('content-body').clientHeight-24+'px';
       this.isShow=true;

    },

    data() {
      return {
        id1:0,
        id2:0,
        isShow:false,
        swiperHeight:'',
        subswiperOption: {
          slidesPerView: 'auto'
        },
        photoswiperOption: {
          effect: 'flip',
          loop: true,
          autoplay:true,
          pagination: {
            el: '.swiper-pagination'
          }

        },
        scrollswiperOption: {
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true,
          mousewheel: true
        }

      }
    }
  }
</script>

<style >








</style>
