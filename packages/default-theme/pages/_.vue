<template>
  <div>
    <h2> Shopware dynamic page </h2>
    <component :is="getComponent" :cms-page="cmsPage"/>
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
import { useCms } from "@shopware-pwa/composables";

const pagesMap = {
  "frontend.navigation.page": "CategoryView",
  "frontend.detail.page": "ProductView"
};

export function getComponentBy(resourceType) {
  if (!resourceType) return;
  let componentName = pagesMap[resourceType];
  if (!componentName) componentName = "SwNoComponent";
  return () => import(`@/components/views/${componentName}`);
}

export default {
  name: 'DynamicRoute',
  components: {
  },
  asyncData: async ({ req, params }) => {
    const {search, page} = useCms()
    const searchResult = await search(params.pathMatch);

    const unwrappedPage = page && page.value ? page.value : searchResult


    const name = unwrappedPage && unwrappedPage.cmsPage && unwrappedPage.cmsPage.name
    const breadcrumbs = unwrappedPage && unwrappedPage.breadcrumb
    const cmsPage = unwrappedPage && unwrappedPage.cmsPage
    
    return {
      cmsPageName: name,
      page: unwrappedPage,
      breadcrumbs,
      cmsPage
    }
  },
  data() {
    return {
    }
  },
  computed: {
    getComponent() {
      return this.page && getComponentBy(this.page.resourceType);
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
