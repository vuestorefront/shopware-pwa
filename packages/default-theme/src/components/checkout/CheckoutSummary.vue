<template>
  <div class="sw-checkout-summary">
    <div class="sw-checkout-summary__addresses" v-if="!isGuestSession">
      <SwAddressManager
        :titleText="$t('Shipping address')"
        class="sw-checkout-summary__addresses-wrapper"
        :addresses="addresses"
        :active-address="activeShippingAddress"
        @change="changeActiveShippingAddress"
        @added="addedActiveShippingAddress"
      />
      <SwAddressManager
        :titleText="$t('Billing address')"
        class="sw-checkout-summary__addresses-wrapper"
        :addresses="addresses"
        :active-address="activeBillingAddress"
        @change="changeActiveBillingAddress"
        @added="addedActiveBillingAddress"
      />
    </div>
    <PaymentSection class="sw-checkout-summary__payment" />
    <ShippingSection class="sw-checkout-summary__shipping" />
  </div>
</template>

<script>
import PaymentMethodSummary from "@/components/checkout/summary/PaymentMethodSummary.vue"
import ShippingSection from "@/components/checkout/ShippingSection.vue"
import PaymentSection from "@/components/checkout/PaymentSection.vue"
import SwAddressManager from "@/components/forms/SwAddressManager.vue"
import { useCart, useSessionContext, useUser } from "@shopware-pwa/composables"

export default {
  name: "CheckoutSummary",
  components: {
    PaymentMethodSummary,
    ShippingSection,
    PaymentSection,
    SwAddressManager,
  },
  setup(props, { root }) {
    const { isGuestSession, addresses, loadAddresses } = useUser(root)
    loadAddresses()

    const {
      activeShippingAddress,
      setActiveShippingAddress,
      activeBillingAddress,
      setActiveBillingAddress,
    } = useSessionContext(root)

    const changeActiveShippingAddress = async (addressId) => {
      await setActiveShippingAddress({ id: addressId })
    }
    const addedActiveShippingAddress = async (addressId) => {
      setActiveShippingAddress({ id: addressId })
      loadAddresses()
    }

    const changeActiveBillingAddress = async (addressId) => {
      await setActiveBillingAddress({ id: addressId })
    }
    const addedActiveBillingAddress = async (addressId) => {
      setActiveBillingAddress({ id: addressId })
      loadAddresses()
    }

    return {
      isGuestSession,
      addresses,
      activeShippingAddress,
      changeActiveShippingAddress,
      addedActiveShippingAddress,
      activeBillingAddress,
      changeActiveBillingAddress,
      addedActiveBillingAddress,
    }
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
