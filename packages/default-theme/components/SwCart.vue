<template>
  <div class="sw-side-cart">
    <SfSidebar
      :title="$t('My cart')"
      :visible="isSidebarOpen"
      :heading-title="$t('My cart')"
      class="sf-sidebar--right"
      @close="toggleSidebar"
    >
      <template v-if="count" #content-top>
        <SfProperty
          class="my-cart__total-items sf-property--large"
          :name="$t('Total items')"
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
              :alt="$t('Empty bag')"
              class="empty-cart__image"
              :src="require('@storefront-ui/shared/icons/empty_cart.svg')"
            />
            <SfHeading
              :title="$t('Your cart is empty')"
              :level="2"
              class="empty-cart__heading"
              :subtitle="$t('No items in cart')"
            />
          </div>
        </div>
      </transition>
      <template #content-bottom>
        <transition name="fade">
          <div v-if="count">
            <SfProperty
              :name="$t('Total price')"
              class="sf-property--full-width sf-property--large my-cart__total-price"
            >
              <template #value>
                <SfPrice :regular="totalPrice | price" class="sf-price--big" />
              </template>
            </SfProperty>
            <SwButton
              class="sf-button--full-width color-secondary"
              @click="goToCheckout()"
              >{{ $t('Go to checkout') }}</SwButton
            >
            <SwPluginSlot name="sidecart-checkout-button-after" />
          </div>
          <div v-else>
            <SwButton
              class="sf-button--full-width color-primary"
              @click="toggleSidebar"
            >
              {{ $t('Start shopping') }}
            </SwButton>
          </div>
        </transition>
      </template>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfProperty,
  SfPrice,
  SfHeading,
  SfImage,
} from '@storefront-ui/vue'
import { useCart, useCartSidebar } from '@shopware-pwa/composables'
import SwCartProduct from '@shopware-pwa/default-theme/components/SwCartProduct'
import SwButton from '@shopware-pwa/default-theme/components/atoms/SwButton'
import { PAGE_CHECKOUT } from '@shopware-pwa/default-theme/helpers/pages'
import SwPluginSlot from 'sw-plugins/SwPluginSlot'
import { computed, onMounted, ref } from '@vue/composition-api'

export default {
  name: 'SwCart',
  components: {
    SfSidebar,
    SfHeading,
    SfImage,
    SfProperty,
    SfPrice,
    SwCartProduct,
    SwPluginSlot,
    SwButton,
  },
  setup() {
    const { cartItems, count, totalPrice, removeProduct } = useCart()
    const { isSidebarOpen, toggleSidebar } = useCartSidebar()

    // Component is lazy loaded so to allow animation on first load it needs to be done after it is mounted
    const isComponentMounted = ref(false)
    onMounted(() => {
      isComponentMounted.value = true
    })
    const sidebarState = computed(
      () => isSidebarOpen.value && isComponentMounted.value
    )

    return {
      isSidebarOpen: sidebarState,
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
      return this.$router.push(this.$i18n.path(PAGE_CHECKOUT))
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables';

.sw-side-cart {
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
