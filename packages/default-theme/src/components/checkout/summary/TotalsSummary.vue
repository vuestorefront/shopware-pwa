<template>
  <div class="summary">
    <SwTotals :total="total" :subtotal="subtotal" :shipping="shippingTotal" />
    <div class="notification" v-if="!cartItems.length">
      <SfNotification
        :visible="true"
        type="info"
        :title="$t('You can not place the order')"
        :message="$t('Your cart is empty')"
      />
    </div>
    <div class="summary__action">
      <SwButton
        class="sf-button--full-width summary__action-button summary__action-button--secondary color-secondary sw-form__button"
        data-cy="go-back-to-payment"
        @click="$emit('click:back')"
      >
        {{ $t("Go back to Payment") }}
      </SwButton>
      <SwButton
        :disabled="!cartItems.length"
        class="sf-button--full-width summary__action-button sw-form__button"
        data-cy="place-my-order"
        @click="$emit('proceed')"
      >
        {{ $t("Place my order") }}
      </SwButton>
    </div>
  </div>
</template>
<script>
import { useCart } from "@shopware-pwa/composables"
import SwTotals from "@/components/SwTotals"
import helpers from "@/helpers"

import {
  SfProperty,
  SfCheckbox,
  SfHeading,
  SfNotification,
} from "@storefront-ui/vue"
import SwButton from "@/components/atoms/SwButton"

export default {
  name: "TotalsSummary",
  components: {
    SfProperty,
    SfHeading,
    SfCheckbox,
    SwButton,
    SfNotification,
    SwTotals,
  },
  data() {
    return {
      terms: false,
    }
  },
  setup(props, { root }) {
    const {
      cartItems,
      subtotal,
      totalPrice,
      removeProduct,
      shippingTotal,
      refreshCart,
    } = useCart(root)
    return {
      cartItems,
      refreshCart,
      subtotal,
      total: totalPrice,
      shippingTotal,
      removeProduct,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

.summary {
  margin: 0 calc(var(--spacer-base) * -1);
  &__group {
    padding: var(--spacer-base) var(--spacer-xl);
    background-color: var(--c-light);
    @include for-desktop {
      background-color: transparent;
      display: flex;
      flex-direction: column;
    }
    .notification {
      margin: auto;
    }
  }
  &__terms {
    flex: 1;
    margin: 0 0 0 var(--spacer-xs);
  }
  &__total {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      padding: 0;
      flex: 0 0 100%;
    }
  }
  &__action {
    padding: var(--spacer-base);
    width: 90%;
    margin: var(--spacer-base) 0 0 0;
    display: table;

    button {
      display: table-cell;
      width: 100%;
      @include for-desktop {
        width: 50%;
      }

      &:last-child {
        margin-top: var(--spacer-base);
      }
    }
  }

  &__property {
    margin: 0 0 var(--spacer-sm) 0;
    --property-value-font-weight: var(--font-semibold);
    --property-value-font-size: var(--font-base);
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
