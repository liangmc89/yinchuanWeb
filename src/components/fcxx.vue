<template>
  <div class="content-layout">

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
    <div class="content-body relative-position" id="content-body">
      <!--<transition-group-->
        <!--appear-->
        <!--enter-active-class="animated bounceInUp"-->
        <!--leave-active-class="animated bounceOutUp"-->
      <!--&gt;-->
      <swiper :options="scrollswiperOption" key="nav"  style="height: 720px;margin: 1rem 0" v-if="isShow">
            <swiper-slide v-ripple  :key="index" :class="[index==id2?'secondNav-focus':'']"  v-for="(item,index) in lanmudata.dataList1[id1].dataList2"  >
              <div class="fcxx-secondNav row "  @click="secondNavClick(item,index)" >
                  <div class="col-4 overflow-hidden shadow-7" >

                    <img :src="getUrl(item.Icon)" style="width: 100%;height: 100%">

                  </div>
                <div class="col-8 fcxx-item-wrapper "  >
                  <div class="fcxx-item-detail">
                  <span class="fcxx-item-title">{{item.Title}}</span><br/>
                  {{item.Ext1}}<br/>
                  {{item.Ext2}}<br/>
                  {{item.Ext3}}<br/>
                </div>
                </div>
              </div>
              <hr class="content-hr">
            </swiper-slide>
          </swiper>
        <div class="fcxx-detail relative-position" v-show="!isShow" key="detail">

          <swiper :options="detailswiperOption" style="height: 676px;padding: 1rem 0 ;" >
            <swiper-slide style="height: auto" class="fcxx-text">
              <p class="fcxx-detail-title">详情介绍</p>
              <p class="fcxx-house-name">{{fcxxDetail.Title}}</p>
              {{fcxxDetail.Ext1}}<br>
              {{fcxxDetail.Ext2}}<br>
              {{fcxxDetail.Ext3}}<br>
              {{fcxxDetail.Ext4}}<br>
              {{fcxxDetail.Ext5}}<br>
              {{fcxxDetail.Ext6}}<br>
              {{fcxxDetail.Ext7}}<br>
              {{fcxxDetail.Ext8}}<br>
              {{fcxxDetail.Ext9}}<br>
              <swiper :options="photoswiperOption" :key="fcxxDetail.title" style="height: 500px">
                <swiper-slide class="text-center vertical-middle" :key="index" v-for="(item,index) in fcxxDetail.dataList3">
                  <img :src="getUrl(item.Icon)"/>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </swiper>
            </swiper-slide>
          </swiper>
          <div class="fcxx-detail-back text-right">
            <q-btn icon="keyboard arrow left" flat label="返回" size="lg" @click="isShow=true"/>
          </div>
        </div>

      <!--</transition-group>-->
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
        this.isShow=true;
      },
      secondNavClick:function (item,index) {
        this.id2=index;
        this.fcxxDetail=this.lanmudata.dataList1[this.id1].dataList2[this.id2];
        this.isShow=false;
        console.log(this.lanmudata.dataList1[this.id1].dataList2[this.id2]);

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
        fcxxDetail:{},
        swiperHeight:'',
        subswiperOption: {
          slidesPerView: 'auto'
        },
        photoswiperOption: {
          lazy: true,
          loop: true,
          zoom: true,
          autoplay:true,
          pagination: {
            el: '.swiper-pagination'
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }


        },
        detailswiperOption: {
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true,
          mousewheel: true

        },
        scrollswiperOption: {
          direction: 'vertical',
          slidesPerView: 3,
          spaceBetween: 40,
          freeMode: true,
          preventLinksPropagation : false,
          // scrollbar: {
          //   el: '.swiper-scrollbar'
          // },
          mousewheel: true
        }

      }
    }
  }
</script>

<style >








</style>
