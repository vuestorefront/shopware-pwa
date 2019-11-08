<template>
  <div class="sw-text">
    <div class="sw-text-content" :id="slotId" v-html="rawHtml"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    content: {
      type: Object,
      default: () => ({
        config: {
          content: {
            value: ""
          },
          verticalAlign: {
            value: null
          }
        },
        id: null
      })
    }
  },
  computed: {
    rawHtml() {
      return this.content.config.content.value;
    },
    slotId() {
      return this.content.id;
    },
    verticalAlign() {
      return this.content.config.verticalAlign.value;
    }
  }
};
</script>

<style lang="scss" scoped></style>
