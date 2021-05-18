<template></template>
<script>
import { useNotifications } from "@shopware-pwa/composables"
import { computed, watch } from "@vue/composition-api"
export default {
  name: "SwOfflineMode",
  setup(props, { root }) {
    const { pushError, pushInfo } = useNotifications(root)
    const isOffline = computed(() => root.isOffline)
    watch(
      () => isOffline.value,
      () => {
        if (!process.client) {
          return
        }
        if (isOffline.value) {
          pushError(root.$i18n.t("Offline mode"))
        } else {
          pushInfo(root.$i18n.t("Online mode"))
        }
      }
    )
    return {
      isOffline,
    }
  },
}
</script>
