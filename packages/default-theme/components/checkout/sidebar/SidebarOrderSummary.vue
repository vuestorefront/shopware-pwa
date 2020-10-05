<template>
  <div id="order-summary">
    <SfHeading
      title="Totals"
      :level="3"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfProperty
      name="Products"
      :value="count"
      class="sf-property--full-width sf-property--large property"
    />
    <SfProperty
      name="Subtotal"
      :value="subtotal | price"
      class="sf-property--full-width sf-property--large property"
    />
    <SfProperty
      name="Shipping"
      :value="shippingMethod.price | price"
      class="sf-property--full-width sf-property--large property"
    />
    <SfDivider class="divider" />
    <SfProperty
      name="Total"
      :value="totalPrice | price"
      class="sf-property--full-width sf-property--large property"
    />
    <SwPromoCode class="promo-code" />
    <div class="characteristics">
      <SfCharacteristic
        v-for="characteristic in characteristics"
        :key="characteristic.title"
        :title="characteristic.title"
        :description="characteristic.description"
        :icon="characteristic.icon"
        class="characteristics__item"
      />
    </div>
  </div>
</template>
<script>
import {
  SfHeading,
  SfProperty,
  SfDivider,
  SfCharacteristic,
} from "@storefront-ui/vue"
import { useCart } from "@shopware-pwa/composables"
import SwPromoCode from "@/components/SwPromoCode"

export default {
  name: "SidebarOrderSummary",
  components: {
    SfHeading,
    SfProperty,
    SfDivider,
    SfCharacteristic,
    SwPromoCode,
  },
  setup(props, { root }) {
    const { count, totalPrice, subtotal } = useCart(root)

    // TODO: use useSessionContext
    const shippingMethod = {
      price: "TODO: add price",
    }
    return {
      count,
      totalPrice,
      subtotal,
      shippingMethod,
    }
  },
  data() {
    return {
      characteristics: [
        {
          title: "Safety",
          description: "It carefully packaged with a personal touch",
          icon: "safety",
        },
        {
          title: "Easy shipping",
          description:
            "You’ll receive dispatch confirmation and an arrival date",
          icon: "shipping",
        },
        {
          title: "Changed your mind?",
          description: "Rest assured, we offer free returns within 30 days",
          icon: "return",
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
.title {
  --heading-title-margin: 0 0 var(--spacer-xl) 0;
}
.total-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacer-base);
}
.property {
  margin: var(--spacer-base) 0;
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
