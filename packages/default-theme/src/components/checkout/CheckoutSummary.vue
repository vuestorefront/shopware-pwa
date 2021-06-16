<template>
  <div class="sw-checkout-summary">
    <div class="sw-checkout-summary__addresses">
      <SwAddressManager
        :title-text="$t('Shipping address')"
        class="sw-checkout-summary__addresses-wrapper"
        :addresses="addresses"
        :active-address="activeShippingAddress"
        @change="changeActiveShippingAddress"
        @added="addedActiveShippingAddress"
      />
      <SwAddressManager
        :title-text="$t('Billing address')"
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
    const { addresses, loadAddresses } = useUser(root)
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
  &__addresses {
    @include for-mobile {
      &-wrapper {
        &:last-child {
          margin-top: var(--spacer-base);
        }
      }
    }
    @include for-desktop {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      &-wrapper {
        width: 48%;
      }
    }
  }
}
</style>
