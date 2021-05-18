<template>
  <div class="sw-notifications">
    <SfNotification
      :key="notification.id"
      v-for="notification in notifications"
      :message="notification.message"
      :type="notification.type"
      :visible="true"
      @click:close="removeOne(notification.id)"
    />
  </div>
</template>
<script>
import { SfNotification } from "@storefront-ui/vue"
import { useNotifications } from "@shopware-pwa/composables"

export default {
  name: "SwNotifications",
  components: {
    SfNotification,
  },
  setup(props, { root }) {
    const { notifications, pushInfo, pushError, pushWarning, removeOne } =
      useNotifications(root)

    return {
      notifications,
      pushInfo,
      removeOne,
      pushWarning,
      pushError,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "../cms/settings.scss";
.sw-notifications {
  position: fixed;
  width: 100%;
  height: auto;
  z-index: 99999;
  left: 0;
  right: 0;
  top: 0;
  @include for-desktop {
    @include sizing-mode-boxed;
  }

  .sf-notification {
    max-width: 100%;
    --notification-font-size: 0.9em;
  }
}
</style>
