import { useBreadcrumbs, useCms } from "@shopware-pwa/composables"

/**
 * A place to plug in some actions during changing the pages/routes.
 * For instance: broadcast events for specific page
 */
export default async function ({ app, route }) {
  // reset breadcrumbs - useful during the swtich between static to non-static route
  const { clear } = useBreadcrumbs(app)
  clear()

  const { search, searchPathKey } = useCms(app)
  if (route.path !== searchPathKey.value) {
    await search(route.path, route.query)
  }
}
