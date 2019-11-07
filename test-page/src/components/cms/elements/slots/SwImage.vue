<template>
  <div class="sw-image">
    <!-- <SfImage :content="getCmsSlot" /> -->
    <h3>image but no content</h3>
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

<style lang="scss" scoped>
  .sw-image {
    border: 1px dashed #ff000a;
    h3 {
      padding: 10px;
      color: #ff000a;
    }
  }
</style>
