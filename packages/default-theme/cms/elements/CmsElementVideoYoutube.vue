<template>
  <div class="cms-element-video-youtube">
    <!-- <youtube
      :id="slotId"
      :video-id="videoId"
      :player-vars="{
        start: startAt,
        end: endAt,
        autoPlay: autoPlay,
        loop: playInLoop
      }"
    /> -->
  </div>
</template>

<script>
import Vue from "vue"
// import VueYouTubeEmbed from "vue-youtube-embed";

// Vue.use(VueYouTubeEmbed);

export default {
  components: {},
  name: "CmsElementVideoYoutube",
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
          start: {
            value: 0,
          },
          end: {
            value: 0,
          },
          autoPlay: {
            value: false,
          },
          displayMode: {
            value: "standard",
          },
          showControls: {
            value: true,
          },
          advancedPrivacyMode: {
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
    startAt() {
      return Number(this.content.config.start.value)
    },
    endAt() {
      return Number(this.content.config.end.value)
    },
    autoPlay() {
      return !!this.content.config.autoPlay.value
    },
    displayMode() {
      return this.content.config.displayMode.value
    },
    showControls() {
      return !!this.content.config.showControls.value
    },
    advancedPrivacyMode() {
      return !!this.content.config.advancedPrivacyMode.value
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/cms/settings.scss";
</style>
