<template>
  <div class="cms-page">
    <SwSection
      :content="cmsSection"
      v-for="cmsSection in cmsSections"
      :key="cmsSection.id"
    />
  </div>
</template>

<script>
import SwSection from "./cms/elements/SwSection";

export default {
  components: {
    SwSection
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    cmsSections() {
      return this.content && this.content.sections ? this.content.sections : [];
    }
  }
};
</script>

<style lang="scss" scoped></style>
