<template>
  <div id="cart">
    <SfSidebar
      :visible="isOpen"
      headingTitle="My Cart"
      @close="$emit('close')"
      class="sf-sidebar--right"
    >
      <transition name="fade" mode="out-in">
        <div v-if="count" class="my-cart" key="my-cart">
          <h3 class="my-cart__total-items">Total items: {{ count }}</h3>
          <div class="collected-product-list">
            <transition-group name="fade" tag="div">
              <SwCartProduct
                v-for="product in cartItems"
                :key="product.id"
                :product="product"
              />
            </transition-group>
          </div>
          <SfProperty class="sf-property--full-width my-cart__total-price">
            <template #name>
              <span class="sf-property__name">TOTAL</span>
            </template>
            <template #value>
              <SfPrice :regular="totalPrice | price" class="sf-price--big" />
            </template>
          </SfProperty>
          <SfButton class="sf-button--full-width">Go to checkout</SfButton>
        </div>
        <div v-else class="empty-cart" key="empty-cart">
          <div class="empty-cart__banner">
            <img
              src="/icons/empty_cart.svg"
              alt=""
              class="empty-cart__icon"
            />
            <h3 class="empty-cart__label">Your bag is empty</h3>
            <p class="empty-cart__description">
              Looks like you haven’t added any items to the bag yet. Start
              shopping to fill it in.
            </p>
          </div>
          <SfButton class="sf-button--full-width color-secondary"
            >Start shopping</SfButton
          >
        </div>
      </transition>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfButton,
  SfProperty,
  SfPrice,
} from "@storefront-ui/vue";
import { useCart } from "@shopware-pwa/composables";
import SwCartProduct from "./SwCartProduct"

export default {
  name: "Cart",
  components: {
    SfSidebar,
    SfButton,
    SfProperty,
    SfPrice,
    SwCartProduct
  },
  props: {
    isOpen: {
      type: Boolean,
      defult: false
    }
  },
  setup () {
    const { cartItems, count, totalPrice, removeProduct } = useCart()
    return {
      cartItems,
      count,
      totalPrice,
      removeProduct
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
#cart {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}
.my-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__total-items {
    font-family: $body-font-family-secondary;
    font-size: $font-size-big-mobile;
    font-weight: $body-font-weight-secondary;
    @include for-desktop {
      font-size: $font-size-big-desktop;
    }
  }
  &__total-price {
    margin-bottom: $spacer-big;
  }
}
.collected-product-list {
  flex: 1;
  margin: $spacer-big -#{$spacer-big};
}
.empty-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__banner {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__icon {
    width: 18.125rem;
    height: 12.3125rem;
    margin-left: 60%;
    @include for-desktop {
      margin-left: 50%;
    }
  }
  &__label,
  &__description {
    line-height: 1.6;
    text-align: center;
  }
  &__label {
    margin-top: $spacer-extra-big;
    font-size: $font-size-big-desktop;
  }
  &__description {
    margin-top: $spacer-big;
  }
}
</style>
