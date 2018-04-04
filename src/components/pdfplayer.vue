<template>
  <div style="width:100%;height: 100%">
    <q-carousel
      color="white"
      quick-nav
      arrows
    >
      <q-carousel-slide :key="i" v-for="i in totalPage" >
        <div class="row no-wrap">
        <div  style="width:50%;float:left"><pdf  :src="getSrc(i,2)"></pdf></div>
        <div style="width:50%;float:left"><pdf  v-if="getSrc(i,1)!=''" :src="getSrc(i,1)"></pdf></div>
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
  export default {
    name: 'pdfplayer',
    props:["pdflist"],
    components: {
      pdf
    },
    data() {
      return {
        currentPage:1,
        totalPage:1,
        hasSrc2:true
      }
    },
    methods:{
      getSrc:function (pageIndex,pdfIndex) {
        return  this.pdflist[2*pageIndex-pdfIndex]||"";
      },


    },
    mounted:function () {
       let _pageCount=this.pdflist.length;
       if(_pageCount>0){
         if(_pageCount%2==0){
           this.totalPage=_pageCount/2;
         }else{
           this.totalPage=Math.ceil(_pageCount/2);
         }
         this.currentPage=1;


       }
    }
  }
</script>

<style>
</style>


