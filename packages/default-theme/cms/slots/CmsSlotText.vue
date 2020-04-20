<template>
  <div v-show="rawHtml" class="cms-slot-text">
    <div class="cms-slot-text__content" v-html="rawHtml"></div>
  </div>
</template>

<script>
export default {
  components: {},
  name: 'CmsSlotText',
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

.cms-slot-text {
  padding: 0 var(--spacer-extra-big);
}
</style>
