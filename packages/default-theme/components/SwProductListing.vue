<template>
  <CmsElementProductListing v-if="cmsProductListing" :content="cmsProductListing"/>
</template>

<script>
import CmsElementProductListing from '@shopware-pwa/default-theme/cms/elements/CmsElementProductListing';

export default {
  name: 'SwProductListing',
  components: { CmsElementProductListing },
  props: {
    productListing: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    cmsProductListing(){
      return ({data: { listing: this.productListing } })
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
