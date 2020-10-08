<template>
  <div id="order-summary">
    <SfHeading
      :title="$t('Totals')"
      :level="3"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfProperty
      :name="$t('Products')"
      :value="count"
      class="sf-property--full-width sf-property--large property"
    />
    <SfProperty
      :name="$t('Subtotal')"
      :value="subtotal | price"
      class="sf-property--full-width sf-property--large property"
    />
    <SfProperty
      :name="$t('Shipping')"
      :value="shippingMethod.price | price"
      class="sf-property--full-width sf-property--large property"
    />
    <SfDivider class="divider" />
    <SfProperty
      :name="$t('Total')"
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
          title: this.$t("Safety"),
          description: this.$t("It carefully packaged with a personal touch"),
          icon: "safety",
        },
        {
          title: this.$t("Easy shipping"),
          description: this.$t(
            "You'll receive dispatch confirmation and an arrival date"
          ),
          icon: "shipping",
        },
        {
          title: this.$t("Changed your mind?"),
          description: this.$t(
            "Rest assured, we offer free returns within 30 days"
          ),
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
