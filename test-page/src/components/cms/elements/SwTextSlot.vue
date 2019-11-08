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
        this.content.config &&
        this.content.config.content &&
        this.content.config.content.value
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

<style lang="scss" scoped></style>
