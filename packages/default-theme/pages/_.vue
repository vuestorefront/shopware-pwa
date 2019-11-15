<template>
  <div>
    <h2> Shopware dynamic page </h2>
    <pre> {{ cmsPageName }} </pre>
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
  asyncData: async ({ req, params }) => {
    let page = {}
    try {
      console.error('LOADED PAGE', params.pathMatch)
      // example -> Sports/Grocery-Garden
      page = await getPage(params.pathMatch);
    } catch (e) {
      console.error('Page not found', e)
    }

    const name = page && page.cmsPage && page.cmsPage.name
    
    return {
      cmsPageName: name,
      page,
      breadcrumbs: page.breadcrumb
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
