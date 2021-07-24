import { useBreadcrumbs, useCms } from "@shopware-pwa/composables"

/**
 * A place to plug in some actions during changing the pages/routes.
 * For instance: broadcast events for specific page
 */
export default async function ({ app, route, redirect, from }) {
  // reset breadcrumbs - useful during the swtich between static to non-static route
  const { clear } = useBreadcrumbs(app)
  clear()

  const { search, currentSearchPathKey, page } = useCms(app)
  if (
    route.params.pathMatch !== currentSearchPathKey.value ||
    from.meta[0].domainId !== route.meta[0].domainId
  ) {
    await search(route.params.pathMatch, route.query)
    // redirect to the cannnical URL if current path does not match the canonical one

    const pathMatch =
      route.params.pathMatch !== "" ? route.params.pathMatch : "/"

    if (
      page.value &&
      page.value.canonicalPathInfo &&
      pathMatch !== page.value.canonicalPathInfo
    ) {
      return redirect(app.$routing.getUrl(page.value.canonicalPathInfo))
    }
  }
}
