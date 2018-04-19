<template>
  <div style="width:100%;height: 100%" class="images" v-viewer="{movable: true,fullscreen: false}">
    <q-carousel
      color="white"
      quick-nav
      arrows class="fit"
    >
      <q-carousel-slide style="overflow: hidden" :key="i" v-for="i in Math.ceil(this.pdflist.length/2)" >
        <div class="row no-wrap fit">
        <div  style="width:50%;float:left;height: 100%">
          <!--<pdf  :src="getSrc(i,2)"></pdf>-->
          <img @click="show" src="http://mirari.cc/v-viewer/assets/img/losglaciares_1920_1200_ss_01.6e6dbb9.jpg">
        </div>
        <div style="width:50%;float:left;height: 100%">
          <!--<pdf  v-if="getSrc(i,1)!=''" :src="getSrc(i,1)"></pdf>-->
          <!--<img @click="show" src="http://mirari.cc/v-viewer/assets/img/losglaciares_1920_1200_ss_02.4ad7195.jpg">-->
          <img @click="show" src="../statics/icons/0001.jpg">
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
        totalPage:0,
        currentPage:1,

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
      show () {
        const viewer = this.$el.querySelector('.images').$viewer
        viewer.show()
      }


    }

  }
</script>

<style>

</style>


