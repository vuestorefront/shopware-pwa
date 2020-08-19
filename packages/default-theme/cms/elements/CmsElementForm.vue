<template>
  <component :is="getComponent" />
</template>

<script>
import CmsElementContactForm from "@shopware-pwa/default-theme/cms/elements/CmsElementContactForm"
import CmsElementNewsletterForm from "@shopware-pwa/default-theme/cms/elements/CmsElementNesletterForm"

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
        // newsletter: CmsElementNewsletterForm,
        newsletter: () =>
          import(
            "@shopware-pwa/default-theme/cms/elements/CmsElementNesletterForm.vue"
          ),

        // contact: CmsElementContactForm,
        contact: () =>
          import(
            "@shopware-pwa/default-theme/cms/elements/CmsElementContactForm.vue"
          ),
      },
    }
  },

  computed: {
    getComponent() {
      //   return this.map[this.config.type.value]
      return this.map.newsletter
    },
  },
}
</script>

<style lang="scss" scoped></style>
