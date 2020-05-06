<template>
  <div v-show="rawHtml" class="cms-element-text">
    <div class="cms-element-text__content" v-html="rawHtml"></div>
  </div>
</template>

<script>
export default {
  components: {},
  name: 'CmsElementText',
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    rawHtml() {
      return this.content?.data?.content
    },
    verticalAlign() {
      return this.content?.config?.verticalAlign?.value
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../settings.scss';

.cms-element-text {
  @include sizing-mode-boxed;
  padding: var(--spacer-xl);
}
</style>
