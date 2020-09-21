<template>
  <div class="cms-element-video-vimeo">
    <!-- <vimeo-player
      ref="player"
      :video-id="videoId"
      :loop="playInLoop"
      :autoplay="autoPlay"
      :options="{
        color: color,
        controls: showControls,
        title: title,
        donottrack: doNotTrack,
        portrait: portrait,
        byline: byLine
      }"
    /> -->
  </div>
</template>

<script>
import Vue from "vue"
// import vueVimeoPlayer from "vue-vimeo-player";
// Vue.use(vueVimeoPlayer);

export default {
  components: {},
  name: "CmsElementVideoVimeo",
  props: {
    content: {
      type: Object,
      default: () => ({
        config: {
          videoID: {
            value: "",
          },
          loop: {
            value: false,
          },
          autoPlay: {
            value: false,
          },
          controls: {
            value: true,
          },
          portrait: {
            value: false,
          },
          doNotTrack: {
            value: false,
          },
          byLine: {
            value: false,
          },
          title: {
            value: false,
          },
          color: {
            value: false,
          },
        },
        id: null,
      }),
    },
  },
  computed: {
    videoId() {
      return this.content.config.videoID.value
    },
    slotId() {
      return this.content.id
    },
    playInLoop() {
      return !!this.content.config.loop.value
    },
    autoPlay() {
      return !!this.content.config.autoplay.value
    },
    showControls() {
      return !!this.content.config.controls.value
    },
    color() {
      return this.content.config.color.value
    },
    portrait() {
      return !!this.content.config.portrait.value
    },
    doNotTrack() {
      return !!this.content.config.doNotTrack.value
    },
    byLine() {
      return !!this.content.config.byLine.value
    },
    title() {
      return !!this.content.config.title.value
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/cms/settings.scss";
</style>
