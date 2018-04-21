<template>

    <viewer :options="options" :images="pdflist"
            @inited="inited"
            class="viewer" ref="viewer"
    >
      <template slot-scope="scope">
            <img class="image" style="display: none"  v-for="(src,index) in pdflist" :key="index"
                 :src="src">
      </template>
    </viewer>


    <!--<button type="button" @click="show">Show</button>-->

</template>
<script>
  import 'viewerjs/dist/viewer.css'
  import Viewer from "v-viewer/src/component.vue"

  export default {
    props: ["pdflist"],
    components: {
      Viewer
    },
    data() {
      return {
        options: {
          inline: true,
          button: true,
          navbar: false,
          title: false,
          toolbar: true,
          tooltip: true,
          movable: true,
          zoomable: true,
          rotatable: false,
          scalable: false,
          transition: true,
          fullscreen: false,
          keyboard: true,
          interval:30000,
          url: "data-source"
        }
      }
    },
    methods: {
      inited(viewer) {
        this.$viewer = viewer;


      },
      show() {

      }
    },
    mounted:function () {
      setTimeout(()=>{
        this.$viewer.play();
      },3000);
    }

  }
</script>
<style >
  .viewer{
    width: 100%;
    height: 100%;
    background: url("../statics/icons/NewspaperBg.jpg") no-repeat 0 0/100% 100%;
  }

  .viewer-player{
    background: url("../statics/icons/NewspaperBg.jpg") no-repeat 0 0/100% 100% !important;
  }






</style>
