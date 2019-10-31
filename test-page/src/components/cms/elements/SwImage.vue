<template>
  <div class="sw-image">
    <!-- <SfImage :content="getCmsSlot" /> -->
    <h2>image but no content</h2>
  </div>
</template>

<script>
// import {
//   SfImage
// } from "@storefront-ui/vue";

export default {
  components: {
    // SfImage
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped></style>
