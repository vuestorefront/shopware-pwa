import { computed } from "@vue/composition-api"
import { getCurrentInstance } from "vue-demi"
import {
  getApplicationContext,
  useCms,
  useNotifications,
  useSharedState,
} from "@shopware-pwa/composables"
import { getSeoUrls } from "@shopware-pwa/shopware-6-client"
import { getCmsTechnicalPath } from "@shopware-pwa/helpers"

export function useDomains() {
  const COMPOSABLE_NAME = "useDomains"
  const contextName = COMPOSABLE_NAME

  const app = getCurrentInstance()
  // the "last-chance route always has a name starting with `all` - nuxt default"
  const PAGE_RESOLVER_ROUTE_PREFIX = "all"
  const { resourceIdentifier, page } = useCms()
  const { pushWarning } = useNotifications()
  const { sharedRef } = useSharedState()
  const currentDomainData = sharedRef("sw-current-domain")

  const { router, routing, apiInstance, i18n } = getApplicationContext({
    contextName,
  })

  const availableDomains = computed(() => routing.availableDomains || [])
  const currentDomainId = computed(
    () => currentDomainData?.value && currentDomainData?.value?.domainId
  )
  const route = computed(() => app?.proxy?.$route)

  const trimDomain = (url) =>
    url.replace(
      currentDomainData.value ? currentDomainData.value?.pathPrefix : "",
      ""
    )

  const getCurrentPathWithoutDomain = () => trimDomain(route.value?.fullPath)
  const isHomePage = () => {
    const currentPath = getCurrentPathWithoutDomain()
    return currentPath === "/" || currentPath === ""
  }

  const isRouteStatic = computed(() => {
    return !route.value?.name?.startsWith(PAGE_RESOLVER_ROUTE_PREFIX)
  })
  const getNewDomainUrl = async (domain) => {
    let url = `${domain.pathPrefix !== "/" ? `${domain.pathPrefix}` : ""}`
    let path = ""
    if (isRouteStatic.value) {
      path += getCurrentPathWithoutDomain()
    } else {
      try {
        // find the correspoding URL for current page if it comes from page resolver - dynamically generated
        const seoResponse = await getSeoUrls(
          resourceIdentifier.value,
          domain.languageId,
          apiInstance
        )
        if (seoResponse.total > 0 && seoResponse.elements?.[0]?.seoPathInfo) {
          path += seoResponse.elements?.[0]?.seoPathInfo
        } else {
          // prevent using the technical URL of a root category stick to homepage "/"
          path += !isHomePage() ? getCmsTechnicalPath(page.value) : ""
        }
      } catch (error) {
        pushWarning(
          i18n.t("An error occured during changing the current language.")
        )
        return
      }
    }

    return `${url}/${path}`.replace(/\/\/+/, "/")
  }

  const changeDomain = async (domainId) => {
    if (domainId === currentDomainId.value) return

    const domainFound = availableDomains.value?.find(
      (domain) => domain.domainId == domainId
    )

    if (!domainFound) {
      return
    }

    const newUrlPath = await getNewDomainUrl(domainFound)

    if (domainFound.origin === routing.getCurrentDomain?.value?.origin) {
      // Same Origin, use routing to push the new path
      router.push(newUrlPath)
    } else {
      // New origin, redirect to new url
      const newPath = ("/" + newUrlPath).replace(/\/\/+/, "/")
      window.location = domainFound.origin + newPath
    }
  }

  return {
    availableDomains,
    currentDomainId,
    changeDomain,
  }
}
