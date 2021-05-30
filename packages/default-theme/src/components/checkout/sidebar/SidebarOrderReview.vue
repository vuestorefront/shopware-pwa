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
    <!-- <PersonalDetailsSummary
      class="content"
      data-cy="name"
      @click:edit="$emit('click:edit', 0)"
    /> -->
    <!-- <ShippingAddressSummary
      class="content"
      data-cy="shipping"
      @click:edit="$emit('click:edit', 1)"
    /> -->
    <!-- <BillingAddressSummary
      class="content"
      data-cy="billing"
      @click:edit="$emit('click:edit', 2)"
    /> -->
    <!-- <PaymentMethodSummary
      class="content"
      @click:edit="$emit('click:edit', 3)"
    /> -->
    <TotalsSummary />
    <SwPromoCode class="promo-code" />
    <div v-if="isLoggedIn" class="actions">
      <SwButton
        class="actions__button color-secondary"
        data-cy="go-back-to-payment"
        @click="goToShop"
      >
        {{ $t("Go Back to shop") }}
      </SwButton>
      <SwButton
        :disabled="loadings.createOrder"
        class="actions__button"
        data-cy="place-my-order"
        @click="createOrder"
      >
        {{ $t("Place my order") }}
      </SwButton>
    </div>
  </div>
</template>
<script>
import { SfHeading, SfCircleIcon, SfProperty } from "@storefront-ui/vue"
import { computed } from "@vue/composition-api"
import { useCart, useUser, useCheckout } from "@shopware-pwa/composables"
import PersonalDetailsSummary from "@/components/checkout/summary/PersonalDetailsSummary.vue"
import ShippingAddressSummary from "@/components/checkout/summary/ShippingAddressSummary.vue"
import BillingAddressSummary from "@/components/checkout/summary/BillingAddressSummary.vue"
import PaymentMethodSummary from "@/components/checkout/summary/PaymentMethodSummary.vue"
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
    PersonalDetailsSummary,
    ShippingAddressSummary,
    BillingAddressSummary,
    PaymentMethodSummary,
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
    const { isLoggedIn } = useUser(root)
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
      isLoggedIn,
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
