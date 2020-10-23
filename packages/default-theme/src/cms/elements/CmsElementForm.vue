<template>
  <component :is="getComponent" />
</template>

<script>
export default {
  name: "CmsElementForm",

  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      map: {
        newsletter: () => import("@/cms/elements/CmsElementNesletterForm"),
        contact: () => import("@/cms/elements/CmsElementContactForm"),
      },
    }
  },

  computed: {
    getComponent() {
      return this.map[this.content.config.type.value]
    },
  },
}
</script>

<style lang="scss" scoped></style>
