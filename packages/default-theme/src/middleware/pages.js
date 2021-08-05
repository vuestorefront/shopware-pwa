import { useBreadcrumbs, useCms } from "@shopware-pwa/composables"
import { isStaticPage } from "@/helpers/pages"
/**
 * A place to plug in some actions during changing the pages/routes.
 * For instance: broadcast events for specific page
 */
export default async function ({ app, route, redirect }) {
  // reset breadcrumbs - useful during the swtich between static to non-static route
  const { clear } = useBreadcrumbs(app)
  clear()

  const { search, currentSearchPathKey, page } = useCms(app)
  if (!isStaticPage(route) && route.path !== currentSearchPathKey.value) {
    await search(route.params.pathMatch, route.query)
    // redirect to the cannnical URL if current path does not match the canonical one
    // route path shouldn't have virtual domain's prefix
    if (page.value && route.params.pathMatch !== page.value.canonicalPathInfo) {
      return redirect(app.$routing.getUrl(page.value.canonicalPathInfo))
    }
  }
}
