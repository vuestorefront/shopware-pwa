<template>
  <div class="sw-checkout-summary">
    <ShippingSection class="sw-checkout-summary__shipping" />
    <PaymentSection class="sw-checkout-summary__payment" />
    <SfHeading
      :title="$t('Order details')"
      :level="2"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfAccordion open="Personal Details" class="accordion smartphone-only">
      <SfAccordionItem header="Personal Details">
        <PersonalDetailsSummary @click:edit="$emit('click:edit', 0)" />
      </SfAccordionItem>
      <SfAccordionItem :header="$t('Shipping address')">
        <ShippingAddressSummary @click:edit="$emit('click:edit', 1)" />
      </SfAccordionItem>
      <SfAccordionItem :header="$t('Billing address')">
        <BillingAddressSummary @click:edit="$emit('click:edit', 2)" />
      </SfAccordionItem>
      <SfAccordionItem :header="$t('Payment method')">
        <PaymentMethodSummary @click:edit="$emit('click:edit', 2)" />
      </SfAccordionItem>
      <SfAccordionItem :header="$t('Order details')">
        <transition name="fade">
          <div class="collected-product-list">
            <SwCartProduct
              v-for="(product, index) in cartItems"
              :key="index"
              :product="product"
              v-model="product.qty"
            />
          </div>
        </transition>
      </SfAccordionItem>
    </SfAccordion>
    <OrderItemsTable class="desktop-only" />
    <TotalsSummary
      @click:back="$emit('click:back')"
      @proceed="$emit('proceed')"
    />
  </div>
</template>

<script>
import PersonalDetailsSummary from "@/components/checkout/summary/PersonalDetailsSummary.vue"
import ShippingAddressSummary from "@/components/checkout/summary/ShippingAddressSummary.vue"
import BillingAddressSummary from "@/components/checkout/summary/BillingAddressSummary.vue"
import PaymentMethodSummary from "@/components/checkout/summary/PaymentMethodSummary.vue"
import OrderItemsTable from "@/components/checkout/summary/OrderItemsTable.vue"
import TotalsSummary from "@/components/checkout/summary/TotalsSummary.vue"
import SwCartProduct from "@/components/SwCartProduct.vue"
import ShippingSection from "@/components/checkout/ShippingSection.vue"
import PaymentSection from "@/components/checkout/PaymentSection.vue"

import { SfHeading, SfAccordion } from "@storefront-ui/vue"
import { useCart } from "@shopware-pwa/composables"

export default {
  name: "CheckoutSummary",
  components: {
    SfHeading,
    SfAccordion,
    PersonalDetailsSummary,
    ShippingAddressSummary,
    BillingAddressSummary,
    PaymentMethodSummary,
    OrderItemsTable,
    TotalsSummary,
    SwCartProduct,
    ShippingSection,
    PaymentSection,
  },
  setup(props, { root }) {
    const { cartItems, removeProduct } = useCart(root)
    return { cartItems, removeProduct }
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
  --heading-padding: var(--spacer-base) 0;
  @include for-desktop {
    --heading-title-font-size: var(--h3-font-size);
    --heading-padding: var(--spacer-2xl) 0 var(--spacer-base) 0;
  }
}
.accordion {
  --accordion-item-content-padding: 0;
  --collected-product-padding: 0 0 var(--spacer-2xs) 0;
  --heading-padding: 0;
  position: relative;
  width: 90vw;
  &__item {
    position: relative;
  }
  &__content {
    flex: 1;
    padding: var(--spacer-sm);
  }
  &__edit {
    flex: unset;
    position: absolute;
    right: var(--spacer-base);
    top: var(--spacer-base);
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
