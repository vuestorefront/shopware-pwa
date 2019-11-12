<template>
  <component :is="getComponent" :content="content" :style="slotStyles"/>
</template>

<script>
import { getComponentBy } from "../cmsNameMapper";

export default {
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    getComponent() {
      return getComponentBy(this.content);
    },
    backgroundMediaMode() {
      return this.content.backgroundMediaMode;
    },
    slotStyles() {
      const {
       backgroundMedia
      } = this.content;
      return {
        backgroundImage: backgroundMedia ? `url(${backgroundMedia.url})` : null,
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
