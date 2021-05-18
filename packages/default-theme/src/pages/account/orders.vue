<template>
  <nuxt-child />
</template>

<script>
import { useUser, useBreadcrumbs } from "@shopware-pwa/composables"
import { PAGE_ACCOUNT } from "@/helpers/pages"
export default {
  name: "OrderHistory",
  setup(props, { root }) {
    const { setBreadcrumbs } = useBreadcrumbs(root)

    setBreadcrumbs([
      {
        name: root.$t("My Account"),
        path: PAGE_ACCOUNT,
      },
      {
        name: root.$t("My orders"),
        path: PAGE_ACCOUNT + "/orders",
      },
    ])
  },
}
</script>
