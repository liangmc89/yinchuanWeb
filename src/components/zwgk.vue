<template>
  <div class="content-layout">
    <!--<q-window-resize-observable @resize="onResize" />-->
    <!--<transition-group-->
      <!--appear-->
      <!--enter-active-class="animated zoomIn"-->
      <!--leave-active-class="animated zoomOut"-->
    <!--&gt;-->
    <swiper key="swiper-nav" :options="zwgkwiperOption" ref="content-navs-swiper" class="fit" style="padding: 2rem" v-show="isShow">
      <swiper-slide :key="index" v-for="(item,index) in lanmudata.dataList1" style="width: auto">
        <div @click="zwgkNavBtnClick(index,item)" class="fit">
          <div class="zwgk-navbtn relative-position" v-ripple :style="{backgroundImage:'url('+getUrl(item.Icon)+')'}">
            <div class="zwgk-nav-text text-no-wrap text-center text-white vertical-middle">{{item.Title}}</div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <div key="swiper-contnet" class="zwgk-content" v-show="!isShow">
      <div class="zwgk-top-nav relative-position">
        <swiper :options="topswiperOption">
          <swiper-slide :key="index" style="width: auto" v-for="(item,index) in lanmudata.dataList1">
            <button @click="TopNavBtnClick(item,index)" v-bind:class="[index==id1?'zwgk-navbtn-focus':'']"
                    class="zwgk-top-navbtns  q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-push q-focusable q-hoverable text-white"
            >

              <div class="content-navbtn">
                <div class="text-no-wrap">{{item.Title}}</div>
              </div>
            </button>
          </swiper-slide>
        </swiper>
        <div class="swiper-button-prev ss" style="left:0" slot="button-prev"></div>
        <div class="swiper-button-next ss" style="right:0" slot="button-next"></div>

      </div>
      <div class="zwgk-content-body row" >
        <div class="zwgk-left-nav col-3">
          <swiper :options="leftswiperOption" style="height: 748px" :key="id1">
            <swiper-slide style="height: auto" :key="index" :class="[index==id2?'leftNav-focus':'']"
                          v-for="(item,index) in lanmudata.dataList1[id1].dataList2" >
                  <div class="leftNavOut"  @click="leftNavClick(item,index)">
                    <div class="leftNav">{{item.Title}}</div>
                  </div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="zwgk-detail col-9">
          <swiper  :options="contentswiperOption" ref="contentSwiper" @slideChange="slideChange" style="height: 680px">
            <swiper-slide :key="index" v-for="(item,index) in lanmudata.dataList1[id1].dataList2">
              <p class="detail-title">{{item.Title}}</p>
              <swiper :options="contentScrollOptions" style="height: 600px" >
                <swiper-slide style="height: auto">
                  <div style="padding: 1rem 2rem"  v-if="lanmudata.dataList1[id1].dataList2[id2]!=undefined&&lanmudata.dataList1[id1].dataList2[id2].dataList3">
                    <img :key="idx" style="width: 100%;height: auto" :src="getUrl(img.Path)" v-for="(img,idx) in lanmudata.dataList1[id1].dataList2[id2].dataList3"/>
                  </div>
                  <pre style="padding: 2rem" class="c-text">{{item.content}}</pre>
                </swiper-slide>
              </swiper>
            </swiper-slide>
          </swiper>
          <div class="text-right zwgk-detail-back">
            <q-btn icon="keyboard arrow left" flat label="返回" size="lg" @click="isShow=true"/>
          </div>
        </div>
      </div>
    </div>
    <!--</transition-group>-->
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {ResourceUrl} from '../config/config'

  export default {
    props: ["lanmudata"],
    computed: {
      contentSwiper() {
        return this.$refs.contentSwiper.swiper
      },
      ShowNav(){
        return this.lanmudata.dataList1[this.id1].isShowNav;
      }


    },
    methods: {
      getUrl: function (str) {
        if (!str) return '';
        return ResourceUrl + str;
      },
      zwgkNavBtnClick: function (index, item) {
        this.id1 = index;
        this.isShow = false;
      },
      leftNavClick: function (item, index) {
        this.id2 = index;
        this.contentSwiper.slideTo(index);
      },
      TopNavBtnClick: function (item, index) {
        this.id1 = index;
      },
      slideChange: function () {
        this.id2 = this.contentSwiper.activeIndex;
      },
      onResize(size) {

      }
    },
    components: {
      swiper,
      swiperSlide
    },
    mounted: function () {

      this.isShow = true;


    },
    filters:{
      cc:function (str) {
        return str;
      }
    },

    data() {
      return {
        id1: 0,
        id2: 0,
        isShow:true,
        zwgkwiperOption: {
          slidesPerView: 3,
          slidesPerColumn: 4,
          spaceBetween: 15,
          direction: 'vertical'
        },
        contentScrollOptions: {
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true,
          mousewheel: true,
          observer:true,
          observeParents:true
        },
        photoswiperOption: {
          effect: 'flip',
          loop: true,
          autoplay: true,
          pagination: {
            el: '.swiper-pagination'
          },
          observer:true,
          observeParents:true

        },
        topswiperOption: {
          slidesPerView: 'auto',
          freeMode: true,
          mousewheel: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        leftswiperOption: {
          direction: 'vertical',
          slidesPerView: 'auto',
          observer:true,
          observeParents:true
        },
        contentswiperOption: {
          observer:true,
          observeParents:true
        }

      }
    }
  }
</script>

<style>


</style>
