<template>
  <div class="sw-checkout-summary">
    <div class="sw-checkout-summary__addresses">
      <SwShippingAddressManager
        class="sw-checkout-summary__addresses-wrapper"
        v-if="!isGuestSession"
      />
      <SwBillingAddressManager
        class="sw-checkout-summary__addresses-wrapper"
        v-if="!isGuestSession"
      />
    </div>
    <!-- <PaymentMethodSummary @click:edit="$emit('click:edit', 2)" /> -->
    <PaymentSection class="sw-checkout-summary__payment" />
    <!-- <PaymentMethodSummary @click:edit="$emit('click:edit', 2)" /> -->
    <ShippingSection class="sw-checkout-summary__shipping" />
  </div>
</template>

<script>
import PaymentMethodSummary from "@/components/checkout/summary/PaymentMethodSummary.vue"
import ShippingSection from "@/components/checkout/ShippingSection.vue"
import PaymentSection from "@/components/checkout/PaymentSection.vue"
import SwBillingAddressManager from "@/components/forms/SwBillingAddressManager.vue"
import SwShippingAddressManager from "@/components/forms/SwShippingAddressManager.vue"
import { useCart, useUser } from "@shopware-pwa/composables"

export default {
  name: "CheckoutSummary",
  components: {
    PaymentMethodSummary,
    ShippingSection,
    PaymentSection,
    SwBillingAddressManager,
    SwShippingAddressManager,
  },
  setup(props, { root }) {
    const { cartItems, removeProduct } = useCart(root)
    const { isGuestSession } = useUser(root)
    return { cartItems, removeProduct, isGuestSession }
  },
  computed: {
    shipping() {
      return {} // this.order.shipping
    },
    shippingMethod() {
      return { label: "" }
    },
    payment() {
      return {} // this.order.payment
    },
    paymentMethod() {
      return { label: "" }
    },
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sw-checkout-summary {
  padding: 0 var(--spacer-base) 0 var(--spacer-base);
  @include for-desktop {
    padding: 0;
  }
  &__addresses {
    @include for-desktop {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-wrapper {
        width: 48%;
      }
    }
  }
}

.title {
  --heading-padding: var(--spacer-sm) 0;
  @include for-desktop {
    --heading-padding: 0 0 var(--spacer-sm) 0;
    --heading-title-font-size: var(--h3-font-size);
  }
}
.collected-product-list {
  padding: var(--spacer-sm);
}
.property {
  margin: 0 0 var(--spacer-xs) 0;
  font-size: var(--font-size--sm);
  line-height: 1.6;
  &__name {
    color: var(--c-text-muted);
  }
}
.content {
  margin: 0 0 var(--spacer-base) 0;
  color: var(--c-text);
  font-size: var(--font-size--xs);
  font-weight: 300;
  line-height: 1.6;
  &:last-child {
    margin: 0;
  }
  &__label {
    font-weight: 400;
  }
}
</style>
