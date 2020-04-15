<template>
  <div>
    <SfHeading
      title="4. Order review"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfAccordion first-open class="accordion mobile-only">
      <SfAccordionItem header="Personal Details">
        <PersonalDetailsSummary @click:edit="$emit('click:edit', 0)" />
      </SfAccordionItem>
      <SfAccordionItem header="Shipping address">
        <ShippingAddressSummary
          @click:edit="$emit('click:edit', 1)"
        />
      </SfAccordionItem>
      <SfAccordionItem header="Billing address">
        <BillingAddressSummary
          @click:edit="$emit('click:edit', 2)"
        />
      </SfAccordionItem>
      <SfAccordionItem header="Payment method">
        <PaymentMethodSummary
          @click:edit="$emit('click:edit', 2)"
        />
      </SfAccordionItem>
    </SfAccordion>
    <OrderItemsTable />
    <SfHeading
      title="Order details"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <TotalsSummary
      @click:back="$emit('click:back')"
      @proceed="$emit('proceed')"
    />
  </div>
</template>

<script>
import PersonalDetailsSummary from '@shopware-pwa/default-theme/components/checkout/summary/PersonalDetailsSummary'
import ShippingAddressSummary from '@shopware-pwa/default-theme/components/checkout/summary/ShippingAddressSummary'
import BillingAddressSummary from '@shopware-pwa/default-theme/components/checkout/summary/BillingAddressSummary'
import PaymentMethodSummary from '@shopware-pwa/default-theme/components/checkout/summary/PaymentMethodSummary'
import OrderItemsTable from '@shopware-pwa/default-theme/components/checkout/summary/OrderItemsTable'
import TotalsSummary from '@shopware-pwa/default-theme/components/checkout/summary/TotalsSummary'

import { SfHeading, SfAccordion } from '@storefront-ui/vue'

export default {
  name: 'OrderReviewStep',
  components: {
    SfHeading,
    SfAccordion,
    PersonalDetailsSummary,
    ShippingAddressSummary,
    BillingAddressSummary,
    PaymentMethodSummary,
    OrderItemsTable,
    TotalsSummary,
  },
  setup() {
    return {}
  },
  computed: {
    shipping() {
      return {} // this.order.shipping
    },
    shippingMethod() {
      return { label: '' }
    },
    payment() {
      return {} // this.order.payment
    },
    paymentMethod() {
      return { label: '' }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

.title {
  margin-bottom: var(--spacer-extra-big);
}

.accordion {
  margin: 0 0 var(--spacer-extra-big) 0;
  &__item {
    display: flex;
    align-items: flex-start;
  }
  &__content {
    flex: 1;
  }
  &__edit {
    flex: unset;
  }
}

.button {
  cursor: pointer;
}
.property {
  margin: 0 0 var(--spacer) 0;
  font-size: var(--font-size-small-desktop);
  line-height: 1.6;
  &__name {
    color: var(--c-text-muted);
  }
}
.content {
  margin: 0 0 var(--spacer-big) 0;
  color: var(--c-text);
  font-size: var(--font-size-extra-small-desktop);
  font-weight: 300;
  line-height: 1.6;
  &:last-child {
    margin: 0;
  }
  &__label {
    font-weight: 400;
  }
}
/* TABLE */
.product-title,
.product-sku {
  line-height: 1.6;
}

.product-sku {
  color: var(--c-text-muted);
  font-size: var(--font-size-extra-small-desktop);
}
.product-price {
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-small-desktop);
  ::v-deep .sf-price__special {
    order: 1;
    color: var(--c-text);
  }
}
</style>
