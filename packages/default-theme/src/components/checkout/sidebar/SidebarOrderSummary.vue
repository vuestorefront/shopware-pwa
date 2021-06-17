<template>
  <div class="order-summary">
    <SfHeading
      :title="$t('Order summary')"
      :level="3"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfProperty
      :name="$t('Products')"
      :value="count"
      class="sf-property--full-width property"
    />
    <div class="collected-product-list">
      <SwCartProduct
        v-for="(product, index) in cartItems"
        :key="index"
        class="sw-collected-product--small"
        hidden-remove-button
        :product="product"
        v-model="product.qty"
      />
    </div>
    <TotalsSummary />
    <SwPromoCode class="promo-code" />
    <SwButton
      class="sw-form__button sf-button--full-width"
      @click="$emit('create-account')"
      data-cy="register-button"
    >
      {{ $t("Continue") }}
    </SwButton>
  </div>
</template>
<script>
import { SfHeading, SfProperty, SfDivider } from "@storefront-ui/vue"
import { useCart } from "@shopware-pwa/composables"
import SwPromoCode from "@/components/SwPromoCode.vue"
import SwButton from "@/components/atoms/SwButton.vue"
import SwCartProduct from "@/components/SwCartProduct.vue"
import TotalsSummary from "@/components/checkout/summary/TotalsSummary.vue"

export default {
  name: "SidebarOrderSummary",
  components: {
    SfHeading,
    SfProperty,
    SfDivider,
    SwPromoCode,
    SwButton,
    SwCartProduct,
    TotalsSummary,
  },
  setup(props, { root }) {
    const { cartItems, count, subtotal, shippingTotal, totalPrice } =
      useCart(root)

    return {
      count,
      subtotal,
      shippingTotal,
      totalPrice,
      cartItems,
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
  padding-bottom: 100px;
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
</style>
