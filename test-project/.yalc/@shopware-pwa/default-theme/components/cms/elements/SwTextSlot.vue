<template>
  <div class="sw-text">
    <div class="sw-text-content" v-html="rawHtml"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    rawHtml() {
      return (
        this.content &&
        this.content.data &&
        this.content.data.content
      );
    },
    verticalAlign() {
      return (
        this.content &&
        this.content.config &&
        this.content.config.verticalAlign &&
        this.content.config.verticalAlign.value
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles.scss";
.sw-text {
  padding: $spacer-big $spacer-extra-big $spacer-extra-big;
}
</style>
