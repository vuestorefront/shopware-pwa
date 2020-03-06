<template>
  <div class="summary">
    <div class="summary__group">
      <div class="summary__total">
        <SfProperty
          name="Subtotal"
          :value="formatFrontPrice(subtotal)"
          class="sf-property--full-width property"
        >
          <template #name
            ><span class="property__name">Subtotals</span></template>
        </SfProperty>
        <SfProperty
          name="Shipping"
          :value="0"
          class="sf-property--full-width property"
        >
          <template #name
            ><span class="property__name">Shipping</span></template>
        </SfProperty>
        <SfProperty
          name="Total"
          :value="formatFrontPrice(total)"
          class="sf-property--full-width property--huge summary__property-total">
          <template #name>TOTAL</template>
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
    <div class="notification" v-if="!isUserLoggedIn">
      <SfNotification
        :visible="true"
        type="info"
        title="You can't place the order"
        message="Dummy checkout is enabled only for logged in users"
      />
    </div>
    <div class="notification" v-if="!cartItems.length">
      <SfNotification
        :visible="true"
        type="info"
        title="You can't place the order"
        message="Your cart is empty."
      />
    </div>
    <div class="summary__group">
      <SfButton
        :disabled="!isUserLoggedIn || !cartItems.length"
        class="sf-button--full-width summary__action-button"
        @click="placeOrder()">Place my order</SfButton
      >
      <SfButton
        class="sf-button--full-width sf-button--text summary__action-button summary__action-button--secondary"
        @click="$emit('click:back')">
        Go back to Payment
      </SfButton>
    </div>
  </div>
</template>
<script>
import { useCart, useUser } from '@shopware-pwa/composables'
import helpers from '@shopware-pwa/default-theme/helpers'
import { PAGE_SUCCESS_PAGE } from '@shopware-pwa/default-theme/helpers/pages'

import {
  SfProperty,
  SfCheckbox,
  SfButton,
  SfNotification
} from '@storefront-ui/vue'
export default {
  name: 'BillingAddress',
  components: {
    SfProperty,
    SfCheckbox,
    SfButton,
    SfNotification
  },
  data() {
    return {
      terms: false
    }
  },
  setup() {
    const {
      cartItems,
      subtotal,
      totalPrice,
      placeOrder: placeApiOrder,
      removeProduct,
      refreshCart
    } = useCart()
    const { isLoggedIn } = useUser()
    return {
      cartItems,
      refreshCart,
      subtotal,
      total: totalPrice,
      placeApiOrder,
      isUserLoggedIn: isLoggedIn,
      removeProduct
    }
  },
  methods: {
    formatFrontPrice(price) {
      return helpers.formatPrice(price)
    },
    async placeOrder() {
      try {
        const order = await this.placeApiOrder()
        this.refreshCart()
        this.$router.push(PAGE_SUCCESS_PAGE)
      } catch (e) {
        console.warn(e)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

.summary {
  background-color: var(--c-light);
  margin: 0 calc(var(--spacer-big) * -1);
  padding: var(--spacer-big);
  @include for-desktop {
    background-color: transparent;
  }
  &__group {
    @include for-desktop {
      display: flex;
      margin: 20px 0 var(--spacer-extra-big) 0;
    }
    .notification {
      margin: auto;
    }
  }
  &__terms {
    flex: 1;
    order: -1;
    margin-bottom: var(--spacer-big);
  }
  &__total {
    margin: 0 0 var(--spacer-extra-big) 0;
    padding: 0 var(--spacer-big);
    flex: 0 0 16.875rem;
    @include for-desktop {
      padding: 0;
    }
  }
  &__action-button {
    flex: 1;
    &--secondary {
      margin: var(--spacer-big) 0;
      @include for-desktop {
        order: -1;
        margin: 0;
        text-align: left;
      }
    }
  }
  &__property-total {
    margin: var(--spacer-big) 0 0 0;
    text-transform: uppercase;
    font-size: var(--font-size-regular-desktop);
    line-height: 1.6;
    font-weight: 500;
  }
}
</style>
