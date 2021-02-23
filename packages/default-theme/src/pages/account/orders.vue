<template>
  <nuxt-child />
</template>

<script>
import { useUser, useBreadcrumbs } from "@shopware-pwa/composables"
import { PAGE_ACCOUNT } from "@/helpers/pages"
export default {
  name: "OrderHistory",
  setup({}, { root }) {
    const { setBreadcrumbs } = useBreadcrumbs(root)

    setBreadcrumbs([
      {
        text: root.$t("My Account"),
        link: root.$routing.getUrl(PAGE_ACCOUNT),
      },
      {
        text: root.$t("My orders"),
        link: root.$routing.getUrl(PAGE_ACCOUNT) + "/orders",
      },
    ])
  },
}
</script>
