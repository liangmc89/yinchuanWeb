<template>
  <div class="viewer-wrapper">
    <!--<div v-show="isShowView">-->
    <!--<viewer :options="options" :images="pdflist"-->
            <!--@inited="inited"-->
            <!--class="viewer" ref="viewer"-->
    <!--&gt;-->
      <!--<template slot-scope="scope">-->
        <!--<div class="images">-->
          <!--<div style="display: none" class="image-wrapper" v-for="(source, index) in pdflist" :key="index">-->
            <!--<img class="image" :src="source" :data-source="source" >-->
          <!--</div>-->
        <!--</div>-->
      <!--</template>-->
    <!--</viewer>-->
    <!--</div>-->
    <q-carousel
      color="white"
      quick-nav
      arrows class="fit"
    >

      <q-carousel-slide v-viewer="options"  :key="i" v-for="i in Math.ceil(this.pdflist.length/2)" >
        <div class="row no-wrap fit">
          <div  style="width:50%;float:left;height: 100%">
            <!--<pdf  :src="getSrc(i,2)"></pdf>-->
            <img @click="show" :src="getSrc(i,2)" style="width: 100%;height: 100%">
          </div>
          <div style="width:50%;float:left;height: 100%">
            <!--<pdf  v-if="getSrc(i,1)!=''" :src="getSrc(i,1)"></pdf>-->
            <!--<img @click="show" src="http://mirari.cc/v-viewer/assets/img/losglaciares_1920_1200_ss_02.4ad7195.jpg">-->
            <img @click="show" :src="getSrc(i,1)" v-if="getSrc(i,1)!=''" style="width: 100%;height: 100%">
          </div>
        </div>
      </q-carousel-slide>

      <q-btn
        slot="quick-nav"
        slot-scope="props"
        color="white"
        flat
        dense
        :label="`${props.slide + 1}`"
        @click="props.goToSlide()"
        :class="{inactive: !props.current}"
      />
    </q-carousel>
  </div>
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
    computed:{

    },
    data() {
      return {
        isShowView:false,
        totalPage:0,
        currentPage:1,

        swiperOption: {
          slidesPerView: 2,
          spaceBetween: 2,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        options: {
          inline: true,
          button: true,
          navbar: true,
          title: true,
          toolbar: true,
          tooltip: true,
          movable: true,
          zoomable: true,
          rotatable: true,
          scalable: true,
          transition: true,
          fullscreen: true,
          keyboard: true,
          url: 'data-source'
        },
      }
    },
    methods:{
      getSrc:function (pageIndex,pdfIndex) {
        return  this.pdflist[2*pageIndex-pdfIndex]||"";
      },
      inited (viewer) {
        this.$viewer = viewer
      },
      show () {
        this.isShowView=true;
        this.$viewer.show()
      }


    }

  }
</script>

<style>
  .viewer-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    background: url("../statics/icons/NewspaperBg.jpg")no-repeat 0 0/100% 100%;
  }
</style>


