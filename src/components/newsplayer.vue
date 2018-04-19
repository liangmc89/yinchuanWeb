<template>
    <div style="height: 100%;width: 100%">
    <viewer :options="options" :images="pdflist"
            @inited="inited"
            class="viewer" ref="viewer"
    >
      <template slot-scope="scope">
            <img class="image" style="display: none" v-for="(src,index) in pdflist" :key="index"
                 :src="src">
      </template>
    </viewer>
    </div>
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
          url: "data-source"
        }
      }
    },
    methods: {
      inited(viewer) {
        this.$viewer = viewer
        this.$viewer.play();
      },
      show() {
        this.$viewer.show()
      }
    }
  }
</script>
<style >


</style>
