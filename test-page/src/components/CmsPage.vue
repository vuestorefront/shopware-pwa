<template>
  <div class="cms-page">
    <SwSlots
      :content="cmsSection"
      v-for="cmsSection in cmsSections"
      :key="cmsSection.id"
    />
  </div>
</template>

<script>
import SwSlots from "./cms/elements/SwSlots";

export default {
  components: {
    SwSlots
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
