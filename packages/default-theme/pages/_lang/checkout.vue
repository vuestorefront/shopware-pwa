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
      <div class="checkout__aside desktop-only">
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
import SidebarOrderReview from "@shopware-pwa/default-theme/components/checkout/sidebar/SidebarOrderReview"
import SidebarOrderSummary from "@shopware-pwa/default-theme/components/checkout/sidebar/SidebarOrderSummary"
import PaymentStep from "@shopware-pwa/default-theme/components/checkout/steps/PaymentStep"
import PersonalDetailsStep from "@shopware-pwa/default-theme/components/checkout/steps/PersonalDetailsStep"
import ShippingStep from "@shopware-pwa/default-theme/components/checkout/steps/ShippingStep"
import OrderReviewStep from "@shopware-pwa/default-theme/components/checkout/steps/OrderReviewStep"
import { ref, computed, reactive } from "@vue/composition-api"
import {
  CHECKOUT_STEPS,
  getStepByNumber,
  useUICheckoutPage,
} from "@shopware-pwa/default-theme/logic/checkout"

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
  setup(props, {root}) {
    const { currentStep, nextStep } = useUICheckoutPage(root)

    return {
      currentStep,
      nextStep,
      CHECKOUT_STEPS,
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function () {
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
      padding: var(--spacer-xl) calc(var(--spacer-lg) * 2);
    }
  }
}
</style>
