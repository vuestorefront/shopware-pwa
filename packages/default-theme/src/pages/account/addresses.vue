<template>
  <nuxt-child />
</template>

<script>
import { SfContentPages } from "@storefront-ui/vue"
import { useBreadcrumbs } from "@shopware-pwa/composables"
import { PAGE_ACCOUNT } from "@/helpers/pages"

export default {
  name: "UserAddresses",
  setup({}, { root }) {
    const { setBreadcrumbs } = useBreadcrumbs(root)
    setBreadcrumbs([
      {
        text: root.$t("My Account"),
        link: root.$routing.getUrl(PAGE_ACCOUNT),
      },
      {
        text: root.$t("My addresses"),
        link: root.$routing.getUrl(PAGE_ACCOUNT) + "/addresses",
      },
    ])
  },
}
</script>
