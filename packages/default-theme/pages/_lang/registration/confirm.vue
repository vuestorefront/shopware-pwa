<template></template>

<script>
import { computed, onBeforeMount } from "@vue/composition-api"
import { SfContentPages } from "@storefront-ui/vue"
import { useUser, useNotifications } from "@shopware-pwa/composables"
import { PAGE_CHECKOUT } from "@/helpers/pages"

import authMiddleware from "@/middleware/auth"

export default {
  name: "AccountConfirmation",
  setup(
    props,
    {
      root,
      root: {
        $router,
        context: {
          query: { em, hash },
        },
      },
    }
  ) {
    const { pushError, pushSuccess } = useNotifications(root)
    const { confirmAccount } = useUser(root)

    onBeforeMount(async () => {
      try {
        await confirmAccount({ em, hash })
        pushSuccess(
          root.$t(
            "Thank you for confirming your email address! You can now complete your order."
          )
        )
        return $router.push(PAGE_CHECKOUT)
      } catch (error) {
        pushError(error.message)
        return $router.push("/")
      }
    })
  },
}
</script>

<style lang="scss"></style>
