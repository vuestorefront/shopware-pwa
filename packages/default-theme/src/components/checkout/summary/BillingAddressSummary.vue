<template>
  <SwAddress :address="billingAddress" :address-title="$t('Billing address')">
    <!-- <template #after-content>
      <SwButton
        class="sf-button--text review__edit"
        @click="$emit('click:edit', 2)"
      >
        {{ $t("Edit") }}
      </SwButton>
    </template> -->
  </SwAddress>
</template>
<script lang="ts">
import { useCheckout } from "@shopware-pwa/composables"
import SwAddress from "@/components/SwAddress.vue"
// import SwButton from "@/components/atoms/SwButton.vue"

export default {
  name: "BillingAddressSummary",
  components: {
    SwAddress,
    // SwButton,
  },
  setup(props, { root }) {
    const { billingAddress } = useCheckout(root)
    return {
      billingAddress,
    }
  },
}
</script>
<style lang="scss" scoped></style>
