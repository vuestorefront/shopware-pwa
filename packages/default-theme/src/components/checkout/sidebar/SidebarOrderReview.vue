<template>
  <div class="review">
    <SfHeading
      :title="$t('Order review')"
      :level="3"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfProperty
      :name="$t('Products')"
      :value="count"
      class="sf-property--full-width property"
    />
    <div class="review__products">
      <SwCartProduct
        v-for="(product, index) in cartItems"
        class="sw-collected-product--small"
        :key="index"
        :product="product"
        hidden-remove-button
        v-model="product.qty"
      />
    </div>
    <TotalsSummary />
    <SwPromoCode class="promo-code" />
  </div>
</template>
<script>
import { SfHeading, SfCircleIcon, SfProperty } from "@storefront-ui/vue"
import { computed } from "@vue/composition-api"
import { useCart, useCheckout } from "@shopware-pwa/composables"
import SwInput from "@/components/atoms/SwInput.vue"
import SwButton from "@/components/atoms/SwButton.vue"
import TotalsSummary from "@/components/checkout/summary/TotalsSummary.vue"
import SwCartProduct from "@/components/SwCartProduct.vue"
import SwPromoCode from "@/components/SwPromoCode.vue"

export default {
  name: "SidebarOrderReview",
  components: {
    SfHeading,
    SwInput,
    SfCircleIcon,
    SwPromoCode,
    SwButton,
    TotalsSummary,
    SwCartProduct,
    SfProperty,
  },
  data() {
    return {
      promoCode: "",
    }
  },
  setup(props, { root }) {
    const { createOrder, loadings } = useCheckout(root)
    const { count, cartItems, removeProduct } = useCart(root)

    const { appliedPromotionCodes, addPromotionCode, removeItem } =
      useCart(root)

    const showPromotionCodes = computed(
      () => appliedPromotionCodes.value?.length > 0
    )
    function goToShop() {
      root.$router.push(root.$routing.getUrl("/"))
    }

    return {
      addPromotionCode,
      showPromotionCodes,
      appliedPromotionCodes,
      removeItem,
      loadings,
      createOrder,
      goToShop,
      cartItems,
      count,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

.review {
  box-sizing: border-box;
  width: 100%;
  background: var(--c-light);
  padding: var(--spacer-xl);
  margin-bottom: var(--spacer-base);
  &__products {
    margin: var(--spacer-base) 0;
  }
  @include for-desktop {
    padding: var(--spacer-lg);
  }
  &:last-child {
    margin-bottom: 0;
  }
}
.title {
  margin-bottom: var(--spacer-sm);
}
.content {
  margin: 0 0 var(--spacer-base) 0;
}
.actions {
  @include for-mobile {
    margin-bottom: var(--spacer-2xl);
  }
  button {
    width: 100%;
    &:last-child {
      margin-top: var(--spacer-base);
    }
  }
}
</style>
