<template>
  <SwAddress :address="shippingAddress" address-title="Shipping details">
    <template #before-content>
      <span class="content__label">{{ shippingMethod.name }}</span>
      <span class="content__label">{{ shippingMethod.deliveryTime.name }}</span>
    </template>
    <template #after-content>
      <SwButton
        class="sf-button--text review__edit"
        @click="$emit('click:edit', 1)"
      >
        Edit
      </SwButton>
    </template>
  </SwAddress>
</template>
<script>
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"
import { useSessionContext, useCheckout } from "@shopware-pwa/composables"
import SwAddress from "@shopware-pwa/default-theme/components/SwAddress"

export default {
  name: "ShippingAddressSummary",
  components: {
    SwAddress,
    SwButton,
  },
  setup(props, { root }) {
    const { shippingMethod, sessionContext } = useSessionContext(root)
    const { shippingAddress } = useCheckout(root)
    return {
      shippingMethod,
      sessionContext,
      shippingAddress,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
.review {
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--spacer-base);
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__title {
    font-size: var(--font-sm);
    margin-bottom: var(--spacer-sm);
    color: var(--c-text);
  }
  &__content {
    font-size: var(--font-xs);
  }
}
.content {
  margin: 0;
  color: var(--c-text-muted);
}
</style>
