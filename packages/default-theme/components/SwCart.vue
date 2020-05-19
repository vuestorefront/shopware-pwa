<template>
  <div id="cart">
    <SfSidebar
      title="My cart"
      :visible="isSidebarOpen"
      heading-title="My Cart"
      class="sf-sidebar--right"
      @close="toggleSidebar"
    >
      <template v-if="count" #content-top>
        <SfProperty
          class="my-cart__total-items sf-property--large"
          name="Total items"
          :value="count"
        />
      </template>
      <transition name="fade" mode="out-in">
        <div v-if="count" key="my-cart" class="my-cart">
          <div class="collected-product-list">
            <SwPluginSlot name="sidecart-products-before" />
            <transition-group name="fade" tag="div">
              <SwCartProduct
                v-for="product in cartItems"
                :key="product.id"
                :product="product"
              />
            </transition-group>
            <SwPluginSlot name="sidecart-products-after" />
          </div>
        </div>
        <div v-else key="empty-cart" class="empty-cart">
          <div class="empty-cart__banner">
            <SfImage
              alt="Empty bag"
              class="empty-cart__image"
              :src="require('@storefront-ui/shared/icons/empty_cart.svg')"
            />
            <SfHeading
              title="Your cart is empty"
              :level="2"
              class="empty-cart__heading"
              subtitle="Looks like you haven’t added any items to the bag yet. Start
              shopping to fill it in."
            />
          </div>
        </div>
      </transition>
      <template #content-bottom>
        <transition name="fade">
          <div v-if="count">
            <SfProperty
              name="Total price"
              class="sf-property--full-width sf-property--large my-cart__total-price"
            >
              <template #value>
                <SfPrice :regular="totalPrice | price" class="sf-price--big" />
              </template>
            </SfProperty>
            <SfButton class="sf-button--full-width color-secondary" @click="goToCheckout()"
              >Go to checkout</SfButton
            >
            <SwPluginSlot name="sidecart-checkout-button-after" />
          </div>
          <div v-else>
            <SfButton class="sf-button--full-width color-primary"
              >Start shopping</SfButton
            >
          </div>
        </transition>
      </template>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfButton,
  SfProperty,
  SfPrice,
  SfHeading,
  SfImage,
} from '@storefront-ui/vue'
import { useCart, useCartSidebar } from '@shopware-pwa/composables'
import SwCartProduct from '@shopware-pwa/default-theme/components/SwCartProduct'
import { PAGE_CHECKOUT } from '@shopware-pwa/default-theme/helpers/pages'
import SwPluginSlot from 'sw-plugins/SwPluginSlot'

export default {
  name: 'Cart',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfImage,
    SfProperty,
    SfPrice,
    SwCartProduct,
    SwPluginSlot,
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
      removeProduct,
    }
  },
  methods: {
    goToCheckout() {
      this.toggleSidebar()
      return this.$router.push(PAGE_CHECKOUT)
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
#cart {
  --sidebar-z-index: 4;
  & > * {
    --sidebar-content-padding: 0 var(--spacer-xs) var(--spacer-xs)
      var(--spacer-xs);
  }
  @include for-desktop {
    & > * {
      --sidebar-bottom-padding: var(--spacer-base);
      --sidebar-content-padding: 0 var(--spacer-base) var(--spacer-base)
        var(--spacer-base);
    }
  }
}
.my-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__total-items {
    margin: var(--spacer-xs) 0;
    @include for-desktop {
      margin: var(--spacer-xs) 0 0 0;
    }
  }
  &__total-price {
    --price-font-size: var(--font-xl);
    --price-font-weight: var(--font-semibold);
    margin: 0 0 var(--spacer-base) 0;
  }
}
.collected-product-list {
  flex: 1;
}
.empty-cart {
  --heading-subtitle-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-margin: 0 0 var(--spacer-base) 0;
  --heading-title-color: var(--c-primary);
  --heading-title-font-weight: var(--font-semibold);
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  &__banner {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }
}
</style>
