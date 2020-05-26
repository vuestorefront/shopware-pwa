<template>
  <div class="summary">
    <div class="summary__group">
      <SfHeading
        title="Totals"
        :level="2"
        class="sf-heading--left sf-heading--no-underline summary__title mobile-only"
      />
      <div class="summary__total">
        <SfProperty
          name="Subtotal"
          :value="subtotal | price"
          class="sf-property--full-width summary__property"
        >
        </SfProperty>
        <SfProperty
          name="Shipping"
          :value="0"
          class="sf-property--full-width summary__property"
        >
        </SfProperty>
        <SfProperty
          name="Total price"
          :value="total | price"
          class="sf-property--full-width summary__property summary__property-total"
        >
        </SfProperty>
      </div>
      <SfCheckbox v-model="terms" name="terms" class="summary__terms">
        <template #label>
          <div class="sf-checkbox__label">
            I agree to <a href="#">Terms and conditions</a>
          </div>
        </template>
      </SfCheckbox>
    </div>
    <div class="notification" v-if="!cartItems.length">
      <SfNotification
        :visible="true"
        type="info"
        title="You can't place the order"
        message="Your cart is empty."
      />
    </div>
    <div class="summary__action">
      <SfButton
        class="sf-button--full-width summary__action-button summary__action-button--secondary color-secondary desktop-only"
        @click="$emit('click:back')"
      >
        Go back to Payment
      </SfButton>
      <SfButton
        :disabled="!cartItems.length"
        class="sf-button--full-width summary__action-button"
        @click="$emit('proceed')"
        >Place my order</SfButton
      >
      <SfButton
        class="sf-button--full-width sf-button--text summary__action-button summary__action-button--secondary mobile-only"
        @click="$emit('click:back')"
      >
        Go back to Payment
      </SfButton>
    </div>
  </div>
</template>
<script>
import { useCart } from '@shopware-pwa/composables'
import helpers from '@shopware-pwa/default-theme/helpers'

import {
  SfProperty,
  SfCheckbox,
  SfHeading,
  SfButton,
  SfNotification,
} from '@storefront-ui/vue'
export default {
  name: 'TotalsSummary',
  components: {
    SfProperty,
    SfHeading,
    SfCheckbox,
    SfButton,
    SfNotification,
  },
  data() {
    return {
      terms: false,
    }
  },
  setup() {
    const {
      cartItems,
      subtotal,
      totalPrice,
      removeProduct,
      refreshCart,
    } = useCart()
    return {
      cartItems,
      refreshCart,
      subtotal,
      total: totalPrice,
      removeProduct,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables';

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
    flex: 0 0 100%;
    margin: var(--spacer-base) 0 0 0;
    @include for-desktop {
      display: flex;
    }
  }
  &__action-button {
    --button-height: 3.25rem;
    @include for-desktop {
      --button-font-weight: var(--font-normal);
      &:first-child {
        margin: 0 var(--spacer-lg) 0 0;
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
