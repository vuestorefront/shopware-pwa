<template>
  <div :key="$route.path">
    <component :is="getComponent" :cms-page="cmsPage" :page="page" />
  </div>
</template>
<script>
import { useCms, useNotifications } from "@shopware-pwa/composables"
import languagesMap from "sw-plugins/languages"

const pagesMap = {
  "frontend.navigation.page": () =>
    import("@shopware-pwa/default-theme/components/views/CategoryView"),
  "frontend.detail.page": () =>
    import("@shopware-pwa/default-theme/components/views/ProductView"),
}

export function getComponentBy(resourceType) {
  if (!resourceType || !pagesMap[resourceType]) return
  return pagesMap[resourceType]
}

export default {
  name: "DynamicRoute",
  components: {},
  watchQuery(newQuery, oldQuery) {
    // Only execute component methods if currency changed
    return newQuery.currencyId !== oldQuery.currencyId
  },
  asyncData: async ({ params, app, error: errorView, query }) => {
    const { search, page, error } = useCms(app)
    const { pushError } = useNotifications(app)
    let path = params.pathMatch
    const lang = params.lang
    if (lang && !languagesMap[lang]) {
      path = `${lang}/${params.pathMatch}`
    }
    const searchResult = await search(path, query)

    // direct user to the error page (keep http status code - so do not redirect)
    if (error.value) {
      if (error.value.statusCode === 404) {
        errorView(error.value)
      } else {
        // show the error other than 404 in SwNotifications
        pushError(error.value.message)
      }
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
