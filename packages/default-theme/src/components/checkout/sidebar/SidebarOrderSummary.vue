<template>
  <div class="order-summary">
    <SfHeading
      :title="$t('Totals')"
      :level="3"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfProperty
      :name="$t('Products')"
      :value="count"
      class="sf-property--full-width property"
    />
    <SfProperty
      :name="$t('Subtotal')"
      :value="subtotal | price"
      class="sf-property--full-width property"
    />
    <SfProperty
      :name="$t('Shipping')"
      :value="shippingTotal | price"
      class="sf-property--full-width property"
    />
    <SfDivider class="divider" />
    <SfProperty
      :name="$t('Total')"
      :value="totalPrice | price"
      class="sf-property--full-width property"
    />
    <SwPromoCode class="promo-code" />
  </div>
</template>
<script>
import { SfHeading, SfProperty, SfDivider } from "@storefront-ui/vue"
import { useCart } from "@shopware-pwa/composables"
import SwPromoCode from "@/components/SwPromoCode.vue"

export default {
  name: "SidebarOrderSummary",
  components: {
    SfHeading,
    SfProperty,
    SfDivider,
    SwPromoCode,
  },
  setup(props, { root }) {
    const { count, subtotal, shippingTotal, totalPrice } = useCart(root)

    return {
      count,
      subtotal,
      shippingTotal,
      totalPrice,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
.order-summary {
  width: 100%;
  background: var(--c-light);
  padding: var(--spacer-sm);
  box-sizing: border-box;
  margin-bottom: var(--spacer-base);
  @include for-desktop {
    padding: var(--spacer-lg);
  }
}

.title {
  --heading-title-margin: 0 0 var(--spacer-sm) 0;
  --heading-title-font-weight: var(--font-weight--bold);
  @include for-desktop {
    --heading-title-font-weight: var(--font-weight--medium);
    --heading-title-margin: 0 0 var(--spacer-xl) 0;
  }
}
.total-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacer-base);
}
.property {
  margin: var(--spacer-sm) 0;
  --property-name-font-size: var(--font-size--lg);
  --property-value-font-size: var(--font-size--lg);
  --property-value-font-weight: var(--font-weight--semibold);
  @include for-desktop {
    margin: var(--spacer-base) 0;
    --property-name-font-size: var(--font-size--xl);
    --property-value-font-size: var(--font-size--xl);
  }
}
.divider {
  --divider-border-color: var(--c-white);
  --divider-margin: calc(var(--spacer-base) * 2) 0 0 0;
}
.characteristics {
  margin: 0 0 0 var(--spacer-xs);
  &__item {
    margin: var(--spacer-base) 0;
  }
}
</style>
