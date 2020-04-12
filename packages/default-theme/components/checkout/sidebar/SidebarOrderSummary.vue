<template>
  <div>
    <div class="highlighted">
      <SfHeading
        title="Order summary"
        class="sf-heading--left sf-heading--no-underline title"
      />
      <div class="total-items">
        <h3>Total items: {{ count }}</h3>
        <SfButton class="sf-button--text" @click="listIsHidden = !listIsHidden"
          >{{ listIsHidden ? 'Show' : 'Hide' }} items list</SfButton
        >
      </div>
      <transition name="fade">
        <div v-if="!listIsHidden" class="collected-product-list">
          <SwCartProduct
            v-for="(product, index) in cartItems"
            :key="index"
            :product="product"
            v-model="product.qty"
          />
        </div>
      </transition>
    </div>
    <div class="highlighted highlighted--total">
      <SfProperty
        name="Products"
        :value="count"
        class="sf-property--full-width property"
      />
      <SfProperty
        name="Subtotal"
        :value="subtotal"
        class="sf-property--full-width property"
      />
      <SfProperty
        name="Shipping"
        :value="shippingMethod.price"
        class="sf-property--full-width property"
      />
      <SfProperty
        name="Total"
        :value="totalPrice"
        class="sf-property--full-width property-total"
      />
    </div>
    <div class="highlighted promo-code">
      <SfButton
        class="promo-code__button"
        @click="showPromoCode = !showPromoCode"
        >{{ showPromoCode ? '-' : '+' }} Promo Code</SfButton
      >
      <transition name="fade">
        <div v-if="showPromoCode">
          <SfInput
            v-model="promoCode"
            name="promoCode"
            label="Enter promo code"
            class="promo-code__input"
          />
          <SfButton class="sf-button--full-width">Apply code</SfButton>
        </div>
      </transition>
    </div>
    <div class="highlighted">
      <SfCharacteristic
        v-for="characteristic in characteristics"
        :key="characteristic.title"
        :title="characteristic.title"
        :description="characteristic.description"
        :icon="characteristic.icon"
        class="characteristic"
      />
    </div>
  </div>
</template>
<script>
import {
  SfHeading,
  SfButton,
  SfProperty,
  SfCharacteristic,
  SfInput,
} from '@storefront-ui/vue'
import { useCart, useCartSidebar } from '@shopware-pwa/composables'
import SwCartProduct from '@shopware-pwa/default-theme/components/SwCartProduct'
export default {
  name: 'SidebarOrderSummary',
  components: {
    SfHeading,
    SfButton,
    SwCartProduct,
    SfProperty,
    SfCharacteristic,
    SfInput,
  },
  setup() {
    const { cartItems, count, totalPrice, subtotal } = useCart()

    // TODO: use useSessionContext
    const shippingMethod = {
      price: 'TODO: add price',
    }
    return {
      cartItems,
      count,
      totalPrice,
      subtotal,
      shippingMethod,
    }
  },
  data() {
    return {
      promoCode: '',
      showPromoCode: false,
      listIsHidden: false,
      characteristics: [
        {
          title: 'Safety',
          description: 'It carefully packaged with a personal touch',
          icon: 'safety',
        },
        {
          title: 'Easy shipping',
          description:
            'You’ll receive dispatch confirmation and an arrival date',
          icon: 'shipping',
        },
        {
          title: 'Changed your mind?',
          description: 'Rest assured, we offer free returns within 30 days',
          icon: 'return',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: #f1f2f3;
  padding: var(--spacer-extra-big);
  margin-bottom: var(--spacer-big);
  &:last-child {
    margin-bottom: 0;
  }
  &--total {
    margin-bottom: 1px;
  }
}
.title {
  margin-bottom: var(--spacer-extra-big);
}
.total-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacer-big);
}
.property {
  margin-bottom: var(--spacer);
  ::v-deep .sf-property__name {
    text-transform: unset;
  }
}
.property-total {
  margin-top: var(--spacer-extra-big);
  font-size: var(--font-size-extra-big-desktop);
  font-weight: 500;
  ::v-deep .sf-property__name {
    color: var(--c-text);
  }
}
.collected-product-list {
  margin: 0 -20px;
}
.collected-product {
  &:not(:last-child) {
    margin-bottom: var(--spacer-big);
  }
}
.characteristic {
  &:not(:last-child) {
    margin-bottom: var(--spacer-big);
  }
}
.promo-code {
  &__button {
    padding: 0;
    background-color: transparent;
    color: var(--c-primary);
    font-size: var(--font-size-big-desktop);
  }
  &__input {
    margin: var(--spacer-big) 0;
    ::v-deep input {
      border-color: var(--c-gray-variant);
    }
  }
}
.product {
  &__properties {
    margin: var(--spacer-big) 0 0 0;
  }
  &__property,
  &__action {
    font-size: var(--font-size-extra-small-desktop);
  }
  &__action {
    color: var(--c-gray-variant);
    font-size: var(--font-size-extra-small-desktop);
    margin: 0 0 var(--spacer-small) 0;
    &:last-child {
      margin: 0;
    }
  }
  &__qty {
    color: var(--c-text);
  }
}
</style>
