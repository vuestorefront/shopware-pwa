<template>
  <div class="sw-totals">
    <div class="sw-totals__total">
      <SfProperty
        :name="$t('Subtotal')"
        :value="subtotal | price"
        class="sf-property--full-width sw-totals__property"
      >
      </SfProperty>
      <SfProperty
        :name="$t('Shipping')"
        :value="shipping | price"
        class="sf-property--full-width sw-totals__property"
      >
      </SfProperty>
      <SfDivider class="divider" />
      <SfProperty
        :name="$t('Total price')"
        :value="total | price"
        class="
          sf-property--full-width
          sw-totals__property sw-totals__property-total
        "
      >
      </SfProperty>
    </div>
  </div>
</template>

<script>
import { SfProperty, SfDivider } from "@storefront-ui/vue"

import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"

export default {
  name: "SwTotals",
  components: {
    SwPluginSlot,
    SfProperty,
    SfDivider,
  },
  props: {
    subtotal: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    shipping: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sw-totals {
  &__title {
    --heading-title-font-size: 14px;
    --heading-title-font-weight: var(--font-weight--medium);
    margin-bottom: var(--spacer-xs);
  }
  &__property {
    margin: 0 0 var(--spacer-sm) 0;
    --property-value-font-weight: var(--font-weight--semibold);
    @include for-desktop {
      margin: 0 0 var(--spacer-sm) 0;
    }
  }

  &__property-total {
    --property-name-font-weight: var(--font-weight--bold);
    --property-name-font-size: var(--font-size--lg);
    --property-value-font-size: 1.125rem;
    margin: var(--spacer-base) 0 0 0;
  }
}
.divider {
  --divider-border-color: var(--c-white);
  --divider-margin: var(--spacer-base) 0 0 0;
}
</style>
