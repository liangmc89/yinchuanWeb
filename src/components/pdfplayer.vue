<template>
  <swiper :options="swiperOption" class="fit">
    <swiper-slide :key="index" v-for="(item,index) in pdflist">
     <pdf :key="index"  :src="item"  style="height: 100%;height: 100%"></pdf>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>





  <!--<div style="width:100%;height: 100%">-->
    <!--<q-carousel-->
      <!--color="white"-->
      <!--quick-nav-->
      <!--arrows-->
    <!--&gt;-->
      <!--<q-carousel-slide :key="i" v-for="i in totalPage" >-->
        <!--<div class="row no-wrap">-->
        <!--<div  style="width:50%;float:left"><pdf  :src="getSrc(i,2)"></pdf></div>-->
        <!--<div style="width:50%;float:left"><pdf  v-if="getSrc(i,1)!=''" :src="getSrc(i,1)"></pdf></div>-->
        <!--</div>-->
      <!--</q-carousel-slide>-->

      <!--<q-btn-->
        <!--slot="quick-nav"-->
        <!--slot-scope="props"-->
        <!--color="white"-->
        <!--flat-->
        <!--dense-->
        <!--:label="`${props.slide + 1}`"-->
        <!--@click="props.goToSlide()"-->
        <!--:class="{inactive: !props.current}"-->
      <!--/>-->
    <!--</q-carousel>-->

  <!--</div>-->
</template>

<script>
  import pdf from 'vue-pdf'
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  export default {
    name: 'pdfplayer',
    props:["pdflist"],
    components: {
      pdf,
      swiper,
      swiperSlide
    },
    data() {
      return {
        currentPage:1,
        totalPage:1,
        hasSrc2:true,
        swiperOption: {
          slidesPerView: 2,
          spaceBetween: 2,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    },
    methods:{
      getSrc:function (pageIndex,pdfIndex) {
        return  this.pdflist[2*pageIndex-pdfIndex]||"";
      },


    },
    mounted:function () {
//       let _pageCount=this.pdflist.length;
//       if(_pageCount>0){
//         if(_pageCount%2==0){
//           this.totalPage=_pageCount/2;
//         }else{
//           this.totalPage=Math.ceil(_pageCount/2);
//         }
//         this.currentPage=1;
//
//
//       }
    }
  }
</script>

<style>
</style>


