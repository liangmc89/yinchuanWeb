<template>
  <div class="content-layout">
    <div class="content-nav">
      <swiper :options="subswiperOption" ref="content-navs-swiper" >
        <!-- slides -->
        <swiper-slide :key="index" v-for="(item,index) in lanmu.dataList1" style="width: auto">
          <button @click="contentNavBtnClick(index,item)" glossy
                  class="content-navbtns  q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-push q-focusable q-hoverable text-white"
                  v-bind:class="[index==currentNav?'contentnavbtn-focus':'']">

            <div class="content-navbtn">
              <!--<img src="../statics/icons/bank.png">-->
              <div class="text-no-wrap">{{item.Title}}</div>
            </div>
          </button>
        </swiper-slide>

      </swiper>
    </div>
    <div class="content-body row">
      <div class="content-title col-6">
        <swiper :options="scrollswiperOption" style="height: 24rem;">
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
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
                <li>123123123</li>
              </ul>
            </div>
          </swiper-slide>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
      </div>
      <div class="content-container col-6 ">
        <swiper :options="scrollswiperOption" style="height: 24rem;">
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

              </ul>
            </div>
          </swiper-slide>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
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
//    activated:function () {
//      this.lanmu=this.lanmudata;
//    },
    data() {
      return {
        lanmu:this.lanmudata,
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
  .content-layout{
    padding:.5rem;
  }
  .content-nav{
    padding: .3rem;
    background: url("../statics/icons/navBG.png") no-repeat 0 0/100% 100%;
  }
  .content-navbtns{
    /*background: url("../statics/icons/navBG.png") no-repeat 0 0/100% 100%;*/
    border-radius: 0;




  }
  .content-navbtn{}
  .contentnavbtn-focus{
    background:url("../statics/icons/navCurrent.png") no-repeat 0 0/100% 100%;
  }

   .text {
    font-size: 18px !important;
    text-align: left !important;
    height: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 30px;

  }







</style>
