import { useBreadcrumbs } from "@shopware-pwa/composables"

/**
 * A place to plug in some actions during changing the pages/routes.
 * For instance: broadcast events for specific page
 */
export default function ({ app }) {
  // reset breadcrumbs - useful during the swtich between static to non-static route
  const { clear } = useBreadcrumbs(app)
  clear()
}
