<template>
  <div class="sw-totals">
    <SfHeading
      :title="$t('Totals')"
      :level="2"
      class="sf-heading--left sf-heading--no-underline sw-totals__title"
    />
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
import { SfProperty, SfHeading } from "@storefront-ui/vue"

import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"

export default {
  name: "SwTotals",
  components: {
    SwPluginSlot,
    SfProperty,
    SfHeading,
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
    border-top: 2px solid var(--c-white);
    --property-name-font-weight: var(--font-weight--bold);
    --property-name-font-size: var(--font-size--lg);
    --property-value-font-size: 1.125rem;
    margin: var(--spacer-base) 0 0 0;
    @include for-desktop {
      border-color: var(--c-light);
    }
  }
}
</style>
