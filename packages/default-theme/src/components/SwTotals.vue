<template>
  <div class="sw-totals">
    <SfHeading
      :title="$t('Totals')"
      :level="2"
      class="
        sf-heading--left sf-heading--no-underline
        sw-totals__title
        smartphone-only
      "
    />
    <div class="sw-totals__total">
      <SfProperty
        :name="$t('Subtotal')"
        :value="filterPrice(subtotal)"
        class="sf-property--full-width sw-totals__property"
      >
      </SfProperty>
      <SfProperty
        :name="$t('Shipping')"
        :value="filterPrice(shipping)"
        class="sf-property--full-width sw-totals__property"
      >
      </SfProperty>
      <SfProperty
        :name="$t('Total price')"
        :value="filterPrice(total)"
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
import { usePriceFilter } from "@/logic/usePriceFilter.js"

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
  setup() {
    return {
      filterPrice: usePriceFilter(),
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sw-totals {
  padding: var(--spacer-base) var(--spacer-xl);
  background-color: var(--c-light);
  @include for-desktop {
    background-color: transparent;
    display: flex;
    flex-direction: column;
  }

  &__total {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      padding: 0;
      flex: 0 0 100%;
    }
  }
  &__property {
    margin: 0 0 var(--spacer-sm) 0;
    --property-value-font-weight: var(--font-weight--semibold);
    --property-value-font-size: var(--font-size--lg);
    @include for-desktop {
      margin: 0 0 var(--spacer-sm) 0;
    }
  }

  &__property-total {
    border-top: 2px solid var(--c-white);
    padding-top: var(--spacer-base);
    margin: var(--spacer-base) 0 0 0;
    @include for-desktop {
      border-color: var(--c-light);
    }
  }
}
</style>
