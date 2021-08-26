import {
  useBreadcrumbs,
  useCms,
  extendScopeContext,
} from "@shopware-pwa/composables"
import { isStaticPage } from "@/helpers/pages"
import { effectScope } from "vue-demi"
/**
 * A place to plug in some actions during changing the pages/routes.
 * For instance: broadcast events for specific page
 */
export default async function ({ app, route, redirect, from }) {
  const scope = effectScope()
  extendScopeContext(scope, app)

  await scope.run(async () => {
    // reset breadcrumbs - useful during the swtich between static to non-static route
    const { clear } = useBreadcrumbs()
    clear()

    const { search, currentSearchPathKey, page } = useCms()
    if (
      !isStaticPage(route) &&
      (route.params?.pathMatch !== currentSearchPathKey.value ||
        from.meta?.[0]?.domainId !== route?.meta?.[0]?.domainId)
    ) {
      // route path shouldn't have virtual domain's prefix included in URL
      // because it's no a part of URL in seo_urls SW6 table
      const pathMatch = route?.params?.pathMatch
      await search(pathMatch, route.query)
      // redirect to the cannnical URL if current path does not match the canonical one
      if (
        pathMatch &&
        page.value &&
        page.value.canonicalPathInfo &&
        pathMatch !== page.value?.canonicalPathInfo
      ) {
        return redirect(app.$routing.getUrl(page.value.canonicalPathInfo))
      }
    }
  })

  scope.stop()
}
