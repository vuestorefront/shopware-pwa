<template>
  <div class="sw-checkout-summary">
    <!-- <SfHeading
      :title="$t('Order details')"
      :level="2"
      class="sf-heading--left sf-heading--no-underline title"
    /> -->
    <!-- <OrderItemsTable class="desktop-only" /> -->
    <ShippingAddressUserForm v-if="!isGuestSession" />
    <BillingAddressUserForm v-if="!isGuestSession" />
    <!-- <PaymentMethodSummary @click:edit="$emit('click:edit', 2)" /> -->
    <PaymentSection class="sw-checkout-summary__payment" />
    <!-- <PaymentMethodSummary @click:edit="$emit('click:edit', 2)" /> -->
    <ShippingSection class="sw-checkout-summary__shipping" />
    <div class="collected-product-list smartphone-only">
      <SwCartProduct
        v-for="(product, index) in cartItems"
        :key="index"
        :product="product"
        v-model="product.qty"
      />
    </div>
  </div>
</template>

<script>
import PersonalDetailsSummary from "@/components/checkout/summary/PersonalDetailsSummary.vue"
import ShippingAddressSummary from "@/components/checkout/summary/ShippingAddressSummary.vue"
import BillingAddressSummary from "@/components/checkout/summary/BillingAddressSummary.vue"
import PaymentMethodSummary from "@/components/checkout/summary/PaymentMethodSummary.vue"
import OrderItemsTable from "@/components/checkout/summary/OrderItemsTable.vue"
import SwCartProduct from "@/components/SwCartProduct.vue"
import ShippingSection from "@/components/checkout/ShippingSection.vue"
import PaymentSection from "@/components/checkout/PaymentSection.vue"
import BillingAddressUserForm from "@/components/forms/BillingAddressUserForm.vue"
import ShippingAddressUserForm from "@/components/forms/ShippingAddressUserForm.vue"
import { SfHeading } from "@storefront-ui/vue"
import { useCart, useUser } from "@shopware-pwa/composables"

export default {
  name: "CheckoutSummary",
  components: {
    SfHeading,
    PersonalDetailsSummary,
    ShippingAddressSummary,
    BillingAddressSummary,
    PaymentMethodSummary,
    OrderItemsTable,
    SwCartProduct,
    ShippingSection,
    PaymentSection,
    BillingAddressUserForm,
    ShippingAddressUserForm,
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
