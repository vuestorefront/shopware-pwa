<template>
  <div>
    <component :is="getComponent" :cms-page="cmsPage" :page="page"/>
  </div>
</template>
<script>
import { useCms, useCart, useUser } from "@shopware-pwa/composables";

const pagesMap = {
  "frontend.navigation.page": "CategoryView",
  "frontend.detail.page": "ProductView"
};

export function getComponentBy(resourceType) {
  if (!resourceType || !pagesMap[resourceType]) return;
  let componentName = pagesMap[resourceType];
  if (!componentName) componentName = "SwNoComponent";
  return () => import(`@/components/views/${componentName}`);
}

export default {
  name: 'DynamicRoute',
  components: {
  },
  asyncData: async ({ req, params, query, error: errorView }) => {
    const {search, page, category, error} = useCms()
    const {refreshCart} = useCart()
    const {refreshUser} = useUser()
    const searchResult = await search(params.pathMatch, query);
    
    // direct user to the error page (keep http status code - so do not redirect)
    if (error.value) {
      errorView(error.value)
    }
    
    await refreshCart();
    await refreshUser();

    const unwrappedPage = page && page.value ? page.value : searchResult


    const name = unwrappedPage && unwrappedPage.cmsPage && unwrappedPage.cmsPage.name
    const breadcrumbs = unwrappedPage && unwrappedPage.breadcrumb
    const cmsPage = unwrappedPage && unwrappedPage.cmsPage
    
    return {
      cmsPageName: name,
      page: unwrappedPage,
      breadcrumbs,
      cmsPage,
      category
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
