<template>
  <div id="checkout" :key="$route.fullPath">
    <div class="checkout">
      <div class="checkout__main">
        <SfSteps :active="currentStep" @change="nextStep($event)">
          <SfStep name="Personal Details">
            <PersonalDetailsStep @proceed="nextStep()" />
          </SfStep>
          <SfStep name="Shipping">
            <ShippingStep
              @retreat="nextStep(currentStep - 1)"
              @proceed="nextStep()"
            />
          </SfStep>
          <SfStep name="Payment">
            <PaymentStep
              @click:back="nextStep(currentStep - 1)"
              @proceed="nextStep()"
            />
          </SfStep>
          <SfStep name="Review">
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
          />
          <SidebarOrderReview
            v-else
            key="order-review"
            @click:edit="nextStep($event)"
          />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { SfSteps } from '@storefront-ui/vue'
import SidebarOrderReview from '@shopware-pwa/default-theme/components/checkout/sidebar/SidebarOrderReview'
import SidebarOrderSummary from '@shopware-pwa/default-theme/components/checkout/sidebar/SidebarOrderSummary'
import PaymentStep from '@shopware-pwa/default-theme/components/checkout/steps/PaymentStep'
import PersonalDetailsStep from '@shopware-pwa/default-theme/components/checkout/steps/PersonalDetailsStep'
import ShippingStep from '@shopware-pwa/default-theme/components/checkout/steps/ShippingStep'
import OrderReviewStep from '@shopware-pwa/default-theme/components/checkout/steps/OrderReviewStep'
import { ref, computed, reactive } from '@vue/composition-api'
import { useUICheckoutPage } from '@shopware-pwa/default-theme/logic/checkout/useUICheckoutPage'
import {
  CHECKOUT_STEPS,
  getStepByNumber,
} from '@shopware-pwa/default-theme/logic/checkout'

export default {
  name: 'CheckoutPage',
  components: {
    SfSteps,
    PersonalDetailsStep,
    ShippingStep,
    PaymentStep,
    OrderReviewStep,
    SidebarOrderSummary,
    SidebarOrderReview,
  },
  setup() {
    const { currentStep, nextStep } = useUICheckoutPage()

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
    currentStep: {
      immediate: true,
      handler: function () {
        this.$router.push({
          query: { step: getStepByNumber(this.currentStep) },
        })
      },
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

#checkout {
  box-sizing: border-box;
  padding: 0 var(--spacer-base);
  @include for-desktop {
    max-width: 1240px;
    padding: var(--spacer-xl);
  }
}
.checkout {
  @include for-desktop {
    display: flex;
  }
  &__main {
    @include for-desktop {
      flex: 1;
    }
  }
  &__aside {
    @include for-desktop {
      flex: 0 0 25.5rem;
      margin-left: 4.25rem;
    }
  }
}
</style>
