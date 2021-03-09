<template>
  <div id="checkout" :key="$route.fullPath">
    <div class="checkout">
      <div class="checkout__main">
        <SfSteps :active="currentStep" @change="nextStep($event)">
          <SfStep :name="$t('Personal Details')">
            <PersonalDetailsStep @proceed="nextStep()" />
          </SfStep>
          <SfStep :name="$t('Shipping')">
            <ShippingStep
              @retreat="nextStep(currentStep - 1)"
              @proceed="nextStep()"
            />
          </SfStep>
          <SfStep :name="$t('Payment')">
            <PaymentStep
              @click:back="nextStep(currentStep - 1)"
              @proceed="nextStep()"
            />
          </SfStep>
          <SfStep :name="$t('Review')">
            <OrderReviewStep
              @click:back="nextStep(currentStep - 1)"
              @proceed="nextStep()"
            />
          </SfStep>
        </SfSteps>
      </div>
      <div class="checkout__aside">
        <transition name="fade">
          <SidebarOrderSummary
            v-if="currentStep < CHECKOUT_STEPS.REVIEW"
            key="order-summary"
            class="checkout__aside-order"
          />
          <SidebarOrderReview
            v-else
            key="order-review"
            class="checkout__aside-order"
            @click:edit="nextStep($event)"
          />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { SfSteps } from "@storefront-ui/vue"
import SidebarOrderReview from "@/components/checkout/sidebar/SidebarOrderReview.vue"
import SidebarOrderSummary from "@/components/checkout/sidebar/SidebarOrderSummary.vue"
import PaymentStep from "@/components/checkout/steps/PaymentStep.vue"
import PersonalDetailsStep from "@/components/checkout/steps/PersonalDetailsStep.vue"
import ShippingStep from "@/components/checkout/steps/ShippingStep.vue"
import OrderReviewStep from "@/components/checkout/steps/OrderReviewStep.vue"
import { CHECKOUT_STEPS, useUICheckoutPage } from "@/logic/checkout"
import { PAGE_CHECKOUT } from "@/helpers/pages"
import { useBreadcrumbs } from "@shopware-pwa/composables"
import { onBeforeUnmount } from "@vue/composition-api"

export default {
  name: "CheckoutPage",
  components: {
    SfSteps,
    PersonalDetailsStep,
    ShippingStep,
    PaymentStep,
    OrderReviewStep,
    SidebarOrderSummary,
    SidebarOrderReview,
  },
  setup({}, { root }) {
    const { currentStep, nextStep } = useUICheckoutPage(root)
    const { setBreadcrumbs } = useBreadcrumbs(root)

    setBreadcrumbs([
      {
        name: root.$t("Checkout"),
        path: PAGE_CHECKOUT,
      },
    ])
    return {
      currentStep,
      nextStep,
      CHECKOUT_STEPS,
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        const stepName = this.$route.query.step
        if (stepName) this.nextStep(CHECKOUT_STEPS[stepName])
      },
    },
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

#checkout {
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
    padding: 0 var(--spacer-base);
  }
}
.checkout {
  --steps-content-padding: 0 var(--spacer-sm);
  @include for-desktop {
    --steps-content-padding: 0;
    display: flex;
  }
  &__main {
    @include for-desktop {
      flex: 1;
      padding: var(--spacer-lg) 0 0 0;
    }
  }
  &__aside {
    @include for-desktop {
      flex: 0 0 26.8125rem;
      margin: 0 0 0 var(--spacer-xl);
    }
    &-order {
      width: 100%;
      box-shadow: 0px 4px 11px rgba(var(--c-dark-base), 0.1);
      background: var(--c-light);
      padding: var(--spacer-sm);
      box-sizing: border-box;
      @include for-desktop {
        box-sizing: content-box;
        padding: var(--spacer-xl) calc(var(--spacer-lg) * 2);
      }
    }
  }
}
</style>
