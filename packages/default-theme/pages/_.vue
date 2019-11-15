<template>
  <div>
    <h2> Shopware dynamic page </h2>
  </div>
</template>
<script>
// import {
//   SfHero,
//   SfBanner,
//   SfCallToAction,
//   SfSection,
//   SfCarousel,
//   SfProductCard,
//   SfImage,
//   SfBannerGrid
// } from '@storefront-ui/vue'
import { getPage } from "@shopware-pwa/shopware-6-client";

export default {
  name: 'DynamicRoute',
  components: {
  },
  async mounted() {
    try {
      console.error('LOADED PAGE', this.$route.params.pathMatch)
      // example -> Sports/Grocery-Garden
      const page = await getPage(this.$route.params.pathMatch);
      console.error('Page content', page)
    } catch (e) {
      console.error('Page not found', e)
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';

</style>
