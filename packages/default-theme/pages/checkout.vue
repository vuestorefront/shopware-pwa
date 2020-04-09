<template>
  <div id="checkout">
    <div class="checkout">
      <div class="checkout__main">
        <SfSteps :active="currentStep" @change="nextStep($event)">
          <SfStep name="Personal Details">
            <PersonalDetails @proceed="nextStep()" />
          </SfStep>
          <SfStep name="Shipping">
            <Shipping
              @retreat="nextStep(currentStep - 1)"
              @proceed="nextStep()"
            />
          </SfStep>
          <SfStep name="Payment">
            <Payment
              @click:back="nextStep(currentStep - 1)"
              @proceed="nextStep()"
            />
          </SfStep>
          <SfStep name="Review">
            <ReviewOrder
              @click:back="nextStep(currentStep - 1)"
              @proceed="nextStep()"
            />
          </SfStep>
        </SfSteps>
      </div>
      <div class="checkout__aside desktop-only">
        <button @click="nextStep()">next</button>
        <transition name="fade">
          <OrderSummary v-if="currentStep <= 2" key="order-summary" />
          <OrderReview
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
import OrderReview from '@shopware-pwa/default-theme/components/checkout/OrderReview'
import OrderSummary from '@shopware-pwa/default-theme/components/checkout/OrderSummary'
import Payment from '@shopware-pwa/default-theme/components/checkout/Payment'
import PersonalDetails from '@shopware-pwa/default-theme/components/checkout/PersonalDetails'
import ReviewOrder from '@shopware-pwa/default-theme/components/checkout/ReviewOrder'
import Shipping from '@shopware-pwa/default-theme/components/checkout/Shipping'
import { useUser, useCheckout } from '@shopware-pwa/composables'
import { ref, computed, reactive } from '@vue/composition-api'
import { usePersonalDetailsStep } from '@shopware-pwa/default-theme/logic/checkout/usePersonalDetailsStep'
import { useShippingStep } from '@shopware-pwa/default-theme/logic/checkout/useShippingStep'
import { usePaymentStep } from '@shopware-pwa/default-theme/logic/checkout/usePaymentStep'
import {
  CHECKOUT_STEPS,
  getStepByNumber,
} from '@shopware-pwa/default-theme/logic/checkout'

export default {
  name: 'Checkout',
  components: {
    SfSteps,
    PersonalDetails,
    Shipping,
    Payment,
    ReviewOrder,
    OrderSummary,
    OrderReview,
  },
  setup() {
    const { isGuestOrder, createOrder } = useCheckout()
    const {
      isValid: isPersonalDetailsStepValid,
      validate: validatePersonalDetailsStep,
    } = usePersonalDetailsStep()
    const {
      isValid: isShippingStepValid,
      validate: validateShippingStep,
    } = useShippingStep()
    const {
      isValid: isPaymentStepValid,
      validate: validatePaymentStep,
    } = usePaymentStep()

    const currentStep = ref(
      isGuestOrder.value
        ? CHECKOUT_STEPS.PERSONAL_DETAILS
        : CHECKOUT_STEPS.REVIEW
    )

    const isPersonalDetailsStepCompleted = computed(() => {
      return !isGuestOrder.value || isPersonalDetailsStepValid.value
    })
    const isShippingStepCompleted = computed(() => {
      return !isGuestOrder.value || isShippingStepValid.value
    })
    const isPaymentStepCompleted = computed(() => {
      return !isGuestOrder.value || isPaymentStepValid.value
    })
    const isReviewStepAvailable = computed(() => {
      return !!isPaymentStepCompleted.value
    })

    const stepsStatus = computed(() => {
      return {
        PERSONAL_DETAILS: {
          available: true,
        },
        SHIPPING: {
          available: !!isPersonalDetailsStepCompleted.value,
        },
        PAYMENT: {
          available: !!isShippingStepCompleted.value,
        },
        REVIEW: {
          available: isReviewStepAvailable.value,
        },
      }
    })

    const nextStep = async (stepNumber) => {
      let nextStepNumber = stepNumber || currentStep.value + 1
      if (stepNumber === CHECKOUT_STEPS.PERSONAL_DETAILS)
        nextStepNumber = CHECKOUT_STEPS.PERSONAL_DETAILS

      if (
        currentStep.value === CHECKOUT_STEPS.PERSONAL_DETAILS &&
        currentStep.value !== nextStepNumber
      )
        validatePersonalDetailsStep()
      if (
        currentStep.value === CHECKOUT_STEPS.SHIPPING &&
        currentStep.value !== nextStepNumber
      )
        validateShippingStep()
      if (
        currentStep.value === CHECKOUT_STEPS.PAYMENT &&
        currentStep.value !== nextStepNumber
      )
        validatePaymentStep()

      if (
        currentStep.value === CHECKOUT_STEPS.REVIEW &&
        nextStepNumber > CHECKOUT_STEPS.REVIEW
      ) {
        await createOrder()
      } else {
        const nextStep = getStepByNumber(nextStepNumber)
        // console.error('STEP NO', nextStepNumber)
        console.error('STEP NEXT', nextStep)
        // console.error('NEXT STEP INVOKED', isPersonalDetailsStepValid.value)
        console.error(
          'Is NextStepAvailable',
          stepsStatus.value[nextStep].available
        )
        if (stepsStatus.value[nextStep].available) {
          currentStep.value = nextStepNumber
          // this.$router.push({query: {step: nextStepNumber}})
        }
      }
    }

    return {
      currentStep,
      isGuestOrder,
      isPersonalDetailsStepCompleted,
      nextStep,
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
  padding: 0 var(--spacer-big);
  @include for-desktop {
    max-width: 1240px;
    padding: var(--spacer-extra-big);
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
