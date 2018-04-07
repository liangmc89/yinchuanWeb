<template>
  <div class="content-layout">
    <div class="content-nav">
      <swiper :options="subswiperOption" ref="content-navs-swiper" >
        <!-- slides -->
        <swiper-slide :key="index" v-for="(item,index) in lanmudata.children"  style="width: auto">
          <button @click="contentNavBtnClick(index,item)" glossy
                  class="content-navbtns  q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-push q-focusable q-hoverable text-white"
                  v-bind:class="[index==currentNav?'contentnavbtn-focus':'']">
            <div class="content-navbtn">
              <img :src="item.icon" v-if="item.icon"/>
              <div class="text-no-wrap">{{item.Title}}</div>
            </div>
          </button>
        </swiper-slide>

      </swiper>
    </div>
    <div class="content-body row">
      <div class="content-title col-6">
        <swiper :options="scrollswiperOption" style="height: 31rem;">
          <swiper-slide class="text">
            <div class="">
              <ul>
                <li v-for="(item,index) in lanmudata.children" >
                  {{item.Title}}
                </li>
              </ul>
            </div>
          </swiper-slide>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
      </div>
      <div class="content-container col-6 ">
        <swiper :options="scrollswiperOption" style="height:31rem;">
          <swiper-slide class="text">
            <div class="">
              <ul>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>

              </ul>
            </div>
          </swiper-slide>
          <div class="swiper-scrollbar"  slot="scrollbar"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    props:["lanmudata"],
    methods:{
      contentNavBtnClick:function (index,item) {
        this.currentNav=index;



      }
    },
    components: {
      swiper,
      swiperSlide
    },

    data() {
      return {
       Lm_ID:0,
       pid:0,
        currentNav:0,
        subswiperOption: {
          slidesPerView: 'auto'
        },
        scrollswiperOption: {
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true,
          scrollbar: {
            el: '.swiper-scrollbar'
          },
          mousewheel: true
        }

      }
    }
  }
</script>

<style >








</style>
