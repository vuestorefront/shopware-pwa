<template>
  <SwAddress :address="shippingAddress" :address-title="$t('Shipping details')">
    <template #before-content v-if="shippingMethod">
      <span class="content__label">{{ shippingMethod.name }}</span>
      <span class="content__label">{{ shippingMethod.deliveryTime.name }}</span>
      <SwPluginSlot
        :name="`summary-shiping-method-${simplifyString(shippingMethod.name)}`"
        :slot-context="shippingMethod"
      />
    </template>
    <!-- <template #after-content>
      <SwButton
        class="sf-button--text review__edit"
        @click="$emit('click:edit', 1)"
      >
        {{ $t("Edit") }}
      </SwButton>
    </template> -->
  </SwAddress>
</template>
<script lang="ts">
// import SwButton from "@/components/atoms/SwButton.vue"
import { useSessionContext, useCheckout } from "@shopware-pwa/composables"
import SwAddress from "@/components/SwAddress.vue"
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"
import { simplifyString } from "@/helpers"

export default {
  name: "ShippingAddressSummary",
  components: {
    SwAddress,
    // SwButton,
    SwPluginSlot,
  },
  setup(props, { root }) {
    const { shippingMethod, sessionContext } = useSessionContext(root)
    const { shippingAddress } = useCheckout(root)
    return {
      shippingMethod,
      sessionContext,
      shippingAddress,
      simplifyString,
    }
  },
}
</script>
<style lang="scss" scoped></style>
