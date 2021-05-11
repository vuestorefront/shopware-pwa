<template>
  <div class="checkout" :key="$route.fullPath">
    <div v-if="!isLoggedIn" class="checkout__main">
      <SwRegistrationForm :allowGuestRegistration="true" />
    </div>
    <div v-else class="checkout__main">
      <CheckoutSummary />
      <div class="checkout__main__action">
        <SwButton
          class="summary__action-button summary__action-button--secondary color-secondary sw-form__button"
          data-cy="go-back-to-payment"
          @click="goToShop"
        >
          {{ $t("Go Back to shop") }}
        </SwButton>
        <SwButton
          :disabled="loadings.createOrder"
          class="summary__action-button sw-form__button"
          data-cy="place-my-order"
          @click="createOrder"
        >
          {{ $t("Place my order") }}
        </SwButton>
      </div>
    </div>
    <div class="checkout__aside">
      <transition name="fade">
        <SidebarOrderSummary
          v-if="!isLoggedIn"
          key="order-summary"
          class="checkout__aside-order"
        />
        <SidebarOrderReview
          v-else
          key="order-review"
          class="checkout__aside-order"
        />
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import SidebarOrderReview from "@/components/checkout/sidebar/SidebarOrderReview.vue"
import SidebarOrderSummary from "@/components/checkout/sidebar/SidebarOrderSummary.vue"
import CheckoutSummary from "@/components/checkout/CheckoutSummary.vue"
import { PAGE_CHECKOUT, PAGE_ORDER_SUCCESS } from "@/helpers/pages"
import { useBreadcrumbs, useCheckout, useUser } from "@shopware-pwa/composables"
import SwRegistrationForm from "@/components/forms/SwRegistrationForm.vue"
import SwButton from "@/components/atoms/SwButton.vue"
export default {
  name: "CheckoutPage",
  components: {
    SwButton,
    SwRegistrationForm,
    CheckoutSummary,
    SidebarOrderSummary,
    SidebarOrderReview,
  },
  setup({}, { root }) {
    const { setBreadcrumbs } = useBreadcrumbs(root)
    const { isLoggedIn } = useUser(root)
    const { createOrder: invokeCreateOrder, loadings } = useCheckout(root)

    async function createOrder() {
      const order = await invokeCreateOrder()
      root.$router.push(
        root.$routing.getUrl(`${PAGE_ORDER_SUCCESS}?orderId=${order.id}`)
      )
    }

    function goToShop() {
      root.$routing.getUrl("/")
    }

    setBreadcrumbs([
      {
        name: root.$t("Checkout"),
        path: PAGE_CHECKOUT,
      },
    ])

    return {
      isLoggedIn,
      createOrder,
      loadings,
      goToShop,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

.checkout {
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
    padding: 0 var(--spacer-base);
    display: flex;
  }
  &__main {
    @include for-desktop {
      flex: 1;
      padding: var(--spacer-lg) 0 0 0;
    }

    &__action {
      margin: var(--spacer-base) 0 0 0;
      display: flex;
      flex-wrap: wrap;

      button {
        width: 100%;
        @include for-desktop {
          width: 50%;
        }

        &:last-child {
          @include for-mobile {
            margin-top: var(--spacer-base);
          }
        }
      }
    }
  }
  &__aside {
    margin: var(--spacer-xl) 0 0 0;
    @include for-desktop {
      flex: 0 0 26.8125rem;
      margin: 0 0 0 var(--spacer-xl);
    }
    &-order {
      width: 100%;
      background: var(--c-light);
      padding: var(--spacer-sm);
      box-sizing: border-box;
      @include for-desktop {
        box-sizing: content-box;
        padding: var(--spacer-xl);
      }
    }
  }
}
</style>
