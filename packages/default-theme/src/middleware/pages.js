import { useBreadcrumbs, useCms } from "@shopware-pwa/composables"

/**
 * A place to plug in some actions during changing the pages/routes.
 * For instance: broadcast events for specific page
 */
export default async function ({ app, route, redirect }) {
  // reset breadcrumbs - useful during the swtich between static to non-static route
  const { clear } = useBreadcrumbs(app)
  clear()

  const { search, currentSearchPathKey, page } = useCms(app)
  if (route.path !== currentSearchPathKey.value) {
    await search(route.path, route.query)
    // redirect to the cannnical URL if current path does not match the canonical one
    if (page.value && route.path !== page.value.canonicalPathInfo) {
      return redirect(app.$routing.getUrl(page.value.canonicalPathInfo))
    }
  }
}
