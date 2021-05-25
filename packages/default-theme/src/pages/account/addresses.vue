<template>
  <nuxt-child />
</template>

<script>
import { SfContentPages } from "@storefront-ui/vue"
import { useBreadcrumbs } from "@shopware-pwa/composables"
import { PAGE_ACCOUNT } from "@/helpers/pages"

export default {
  name: "UserAddresses",
  setup(props, { root }) {
    const { setBreadcrumbs } = useBreadcrumbs(root)
    setBreadcrumbs([
      {
        name: root.$t("My Account"),
        path: PAGE_ACCOUNT,
      },
      {
        name: root.$t("My addresses"),
        path: PAGE_ACCOUNT + "/addresses",
      },
    ])
  },
}
</script>
