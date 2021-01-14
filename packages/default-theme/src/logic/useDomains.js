import { computed } from "@vue/composition-api"
import { getApplicationContext } from "@shopware-pwa/composables"

export const useDomains = (rootContext) => {
  const { router, routing } = getApplicationContext(rootContext, "useDomains")

  const availableDomains = computed(() => routing.availableDomains || [])
  const currentDomainId = computed(() => routing.getCurrentDomain().domainId)

  const changeDomain = async (domainId) => {
    if (domainId === currentDomainId.value) return

    const domainForLocaleFound = routing.availableDomains.find(
      (domain) => domain.domainId == domainId
    )

    if (!domainForLocaleFound) {
      return
    }

    // remove domain
    const cleanPath = rootContext.$route.fullPath.replace(
      routing.getCurrentDomain().url,
      ""
    )
    // build the new url based on current domain
    const newUrl = `${
      domainForLocaleFound.url !== "/" ? `${domainForLocaleFound.url}` : ""
    }/${cleanPath}`

    domainForLocaleFound && router.push(newUrl.replace(/\/\/+/, "/"))
  }

  return {
    availableDomains,
    currentDomainId,
    changeDomain,
  }
}
