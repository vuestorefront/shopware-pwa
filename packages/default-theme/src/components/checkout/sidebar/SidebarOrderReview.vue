<template>
  <div class="review">
    <SfHeading
      :title="$t('Order details')"
      :level="3"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="review__products">
      <SwCartProduct
        v-for="(product, index) in cartItems"
        :key="index"
        :product="product"
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
    <PaymentMethodSummary
      class="content"
      @click:edit="$emit('click:edit', 3)"
    />
    <TotalsSummary />
    <div class="promo-code">
      <SwInput
        v-model="promoCode"
        name="promoCode"
        :label="$t('Enter promo code')"
        class="sf-input--filled promo-code__input"
        @keyup.enter="addPromotionCode(promoCode)"
      />
      <SfCircleIcon
        class="promo-code__circle-icon"
        icon="check"
        @click="addPromotionCode(promoCode)"
      />
    </div>
    <div v-if="showPromotionCodes" class="applied-codes">
      <SfHeading
        :title="$t('Applied promo codes:')"
        :level="4"
        class="sf-heading--left sf-heading--no-underline title"
      />
      <ul class="applied-codes__list">
        <SwPromoCodeItem
          v-for="appliedPromotionCode in appliedPromotionCodes"
          :key="appliedPromotionCode.id"
          :code="appliedPromotionCode"
          @remove="removeItem(appliedPromotionCode)"
        />
      </ul>
    </div>
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
import { SfHeading, SfCircleIcon } from "@storefront-ui/vue"
import { computed } from "@vue/composition-api"
import { useCart, useUser, useCheckout } from "@shopware-pwa/composables"
import PersonalDetailsSummary from "@/components/checkout/summary/PersonalDetailsSummary.vue"
import ShippingAddressSummary from "@/components/checkout/summary/ShippingAddressSummary.vue"
import BillingAddressSummary from "@/components/checkout/summary/BillingAddressSummary.vue"
import PaymentMethodSummary from "@/components/checkout/summary/PaymentMethodSummary.vue"
import SwPromoCodeItem from "@/components/SwPromoCodeItem.vue"
import SwInput from "@/components/atoms/SwInput.vue"
import SwButton from "@/components/atoms/SwButton.vue"
import TotalsSummary from "@/components/checkout/summary/TotalsSummary.vue"
import SwCartProduct from "@/components/SwCartProduct.vue"

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
    SwPromoCodeItem,
    SwButton,
    TotalsSummary,
    SwCartProduct,
  },
  data() {
    return {
      promoCode: "",
    }
  },
  setup(props, { root }) {
    const { isLoggedIn } = useUser(root)
    const { createOrder, loadings } = useCheckout(root)
    const { cartItems, removeProduct } = useCart(root)

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
  @include for-desktop {
    padding: var(--spacer-lg);
  }
  &:last-child {
    margin-bottom: 0;
  }
  &__products {
    background: var(--c-white);
  }
}
.title {
  margin-bottom: var(--spacer-sm);
}
.content {
  margin: 0 0 var(--spacer-base) 0;
}
.promo-code {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--spacer-lg) 0 var(--spacer-base) 0;
  &__circle-icon {
    --button-size: 2rem;
    --icon-size: 0.6875rem;
  }
  &__input {
    --input-background: var(--c-white);
    flex: 1;
    margin: 0 var(--spacer-lg) 0 0;
  }
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
.applied-codes {
  margin-bottom: var(--spacer-xl);
  &__list {
    list-style: none;
    padding: 0;
  }

  .title {
    margin-bottom: var(--spacer-xs);
  }
}
</style>
