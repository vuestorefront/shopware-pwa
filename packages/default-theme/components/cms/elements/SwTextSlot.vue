<template>
  <div v-show="rawHtml" class="sw-text">
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
        this.content?.data?.content
      );
    },
    verticalAlign() {
      return (
        this.content?.config?.verticalAlign?.value
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles.scss";
.sw-text {
  padding: var(--spacer-big) var(--spacer-extra-big) var(--spacer-extra-big);
}
</style>
