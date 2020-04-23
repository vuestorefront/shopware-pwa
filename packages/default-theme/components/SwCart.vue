<template>
  <div id="cart">
    <SfSidebar
      title="My cart"
      :visible="isSidebarOpen"
      heading-title="My Cart"
      class="sf-sidebar--right"
      @close="toggleSidebar"
    >
      <transition name="fade" mode="out-in">
        <div v-if="count" key="my-cart" class="my-cart">
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
          <SfButton
            class="sf-button--full-width"
            aria-label="go-to-checkout"
            @click="goToCheckout()"
            >Go to checkout</SfButton
          >
        </div>
        <div v-else key="empty-cart" class="empty-cart">
          <div class="empty-cart__banner">
            <!-- <img src="/icons/empty_cart.svg" alt="" class="empty-cart__icon" /> -->
            <h3 class="empty-cart__label">Your bag is empty</h3>
            <p class="empty-cart__description">
              Looks like you haven’t added any items to the bag yet. Start
              shopping to fill it in.
            </p>
          </div>
          <SfButton class="sf-button--full-width color-secondary">
            Start shopping
          </SfButton>
        </div>
      </transition>
    </SfSidebar>
  </div>
</template>
<script>
import { SfSidebar, SfButton, SfProperty, SfPrice } from '@storefront-ui/vue'
import { useCart, useCartSidebar } from '@shopware-pwa/composables'
import SwCartProduct from '@shopware-pwa/default-theme/components/SwCartProduct'
import { PAGE_CHECKOUT } from '@shopware-pwa/default-theme/helpers/pages'

export default {
  name: 'Cart',
  components: {
    SfSidebar,
    SfButton,
    SfProperty,
    SfPrice,
    SwCartProduct
  },
  setup() {
    const { cartItems, count, totalPrice, removeProduct } = useCart()
    const { isSidebarOpen, toggleSidebar } = useCartSidebar()
    return {
      isSidebarOpen,
      toggleSidebar,
      cartItems,
      count,
      totalPrice,
      removeProduct
    }
  },
  methods: {
    goToCheckout() {
      this.toggleSidebar()
      return this.$router.push(PAGE_CHECKOUT)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

#cart {
  --overlay-z-index: 4;
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
    font-family: var(--font-family-secondary);
    font-size: var(--font-base);
    font-weight: var(--font-normal);
    @include for-desktop {
      font-size: var(--font-lg);
    }
  }
  &__total-price {
    margin-bottom: var(--spacer-base);
  }
}
.collected-product-list {
  flex: 1;
  margin: var(--spacer-base) calc(var(--spacer-base) * -1);
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
    margin-top: var(--spacer-xl);
    font-size: var(--font-lg);
  }
  &__description {
    margin-top: var(--spacer-base);
  }
}

::v-deep .sf-sidebar__aside {
  z-index: 4;
}
</style>
