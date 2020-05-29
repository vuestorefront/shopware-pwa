<template>
  <div :key="$route.fullPath">
    <component :is="getComponent" :cms-page="cmsPage" :page="page" />
  </div>
</template>
<script>
import { useCms } from "@shopware-pwa/composables"
import languagesMap from "sw-plugins/languages"

const pagesMap = {
  "frontend.navigation.page": "CategoryView",
  "frontend.detail.page": "ProductView",
}

export function getComponentBy(resourceType) {
  if (!resourceType || !pagesMap[resourceType]) return
  let componentName = pagesMap[resourceType]
  if (!componentName) componentName = "SwNoComponent"
  return () =>
    import(`@shopware-pwa/default-theme/components/views/${componentName}`)
}

export default {
  name: "DynamicRoute",
  components: {},
  watchQuery: true,
  asyncData: async ({ req, params, query, error: errorView, store }) => {
    const { search, page, error } = useCms()
    let path = params.pathMatch
    const lang = params.lang
    if (lang && !languagesMap[lang]) {
      path = `${lang}/${params.pathMatch}`
    }
    const searchResult = await search(path, query)

    // direct user to the error page (keep http status code - so do not redirect)
    if (error.value) {
      errorView(error.value)
    }

    const unwrappedPage = page && page.value ? page.value : searchResult

    const name =
      unwrappedPage && unwrappedPage.cmsPage && unwrappedPage.cmsPage.name
    const cmsPage = unwrappedPage && unwrappedPage.cmsPage

    return {
      cmsPageName: name,
      page: unwrappedPage,
      cmsPage,
    }
  },
  computed: {
    getComponent() {
      return this.page && getComponentBy(this.page.resourceType)
    },
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
</style>
