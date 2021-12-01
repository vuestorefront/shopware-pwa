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
        :additionalItemsData="additionalItemsData"
      />
    </div>
    <TotalsSummary />
    <SwPromoCode class="promo-code" />
    <SwTermsAgreementCheckbox />
    <div class="actions">
      <SwPluginSlot name="order-summary-actions">
        <SwButton
          class="actions__button color-secondary sw-form__button"
          data-cy="go-back-to-payment"
          @click="goToShop"
        >
          {{ $t("Go Back to shop") }}
        </SwButton>
        <SwButton
          :disabled="loadings.createOrder"
          class="actions__button sw-form__button"
          data-cy="place-my-order"
          @click="$emit('create-order')"
        >
          {{ $t("Place my order") }}
        </SwButton>
      </SwPluginSlot>
    </div>
  </div>
</template>
<script>
import { SfHeading, SfCircleIcon, SfProperty } from "@storefront-ui/vue"
import { computed, onMounted, ref } from "@vue/composition-api"
import { useCart, useCheckout } from "@shopware-pwa/composables"
import SwInput from "@/components/atoms/SwInput.vue"
import SwButton from "@/components/atoms/SwButton.vue"
import TotalsSummary from "@/components/checkout/summary/TotalsSummary.vue"
import SwCartProduct from "@/components/SwCartProduct.vue"
import SwPromoCode from "@/components/SwPromoCode.vue"
import SwTermsAgreementCheckbox from "@/components/checkout/summary/SwTermsAgreementCheckbox.vue"
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"

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
    SwTermsAgreementCheckbox,
    SwPluginSlot,
  },
  data() {
    return {
      promoCode: "",
    }
  },
  setup(props, { root }) {
    const { createOrder, loadings } = useCheckout()
    const {
      count,
      cartItems,
      getProductItemsSeoUrlsData,
      appliedPromotionCodes,
      addPromotionCode,
      removeItem,
    } = useCart()
    const additionalItemsData = ref([])
    const showPromotionCodes = computed(
      () => appliedPromotionCodes.value?.length > 0
    )
    function goToShop() {
      root.$router.push(root.$routing.getUrl("/"))
    }

    const loadAdditionalData = async () => {
      if (!count.value) {
        return
      }

      additionalItemsData.value = await getProductItemsSeoUrlsData()
    }

    onMounted(async () => {
      await loadAdditionalData()
    })

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
      additionalItemsData,
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
  padding: var(--spacer-base);
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
