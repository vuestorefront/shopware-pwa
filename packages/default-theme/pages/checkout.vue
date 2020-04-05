<template>
  <div id="checkout">
    <div class="checkout">
      <div class="checkout__main">
        <SfSteps :active="currentStep" @change="nextStep($event)">
          <SfStep name="Personal Details" v-if="isGuestOrder">
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
            />
          </SfStep>
          <SfStep name="Review">
            <ReviewOrder
              @click:back="nextStep(currentStep - 1)"
            />
          </SfStep>
        </SfSteps>
      </div>
      <div class="checkout__aside desktop-only">
        <button @click="nextStep()">next</button>
        <transition name="fade">
          <OrderSummary
            v-if="currentStep <= 2"
            key="order-summary"
          />
          <OrderReview
            v-else
            key="order-review"
            @click:edit="currentStep = $event"
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
// import checkoutMiddleware from "@shopware-pwa/default-theme/middleware/checkout"
import { useUser, useCheckout } from '@shopware-pwa/composables'
import { ref, computed, reactive } from '@vue/composition-api'
import { usePersonalDetails } from '@shopware-pwa/default-theme/components/checkout/usePersonalDetails'
import { useShipping } from '@shopware-pwa/default-theme/components/checkout/useShipping'
import { usePayment } from '@shopware-pwa/default-theme/components/checkout/usePayment'

const STEPS = {
  PERSONAL_DETAILS: 0,
  SHIPPING: 1,
  PAYMENT: 2,
  REVIEW: 3,
}

const getStepByNumber = (number) => {
  for (let [key, value] of Object.entries(STEPS)) {
    if (value === number) return key
  }
  return 'PERSONAL_DETAILS'
}

export default {
  name: 'Checkout',
  // middleware: checkoutMiddleware,
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
    } = usePersonalDetails()
    const {
      isValid: isShippingStepValid,
      validate: validateShippingStep,
    } = useShipping()
    const {
      isValid: isPaymentStepValid,
      validate: validatePaymentStep,
    } = usePayment()

    const currentStep = ref(
      isGuestOrder.value ? STEPS.PERSONAL_DETAILS : STEPS.REVIEW
    )

    // const customerData = ref(null) // this will be from useCheckout
    // const shippingAddress = ref(null) // this will be from useCheckout
    // const billingAddress = ref(null) // this will be from useCheckout

    console.error('-> PERsonal details valid', isPersonalDetailsStepValid.value)

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
      if (stepNumber === 0) nextStepNumber = 0

      if (
        currentStep.value === STEPS.PERSONAL_DETAILS &&
        currentStep.value !== nextStepNumber
      )
        validatePersonalDetailsStep()
      if (
        currentStep.value === STEPS.SHIPPING &&
        currentStep.value !== nextStepNumber
      )
        validateShippingStep()
      if (
        currentStep.value === STEPS.PAYMENT &&
        currentStep.value !== nextStepNumber
      )
        validatePaymentStep()

      if (currentStep.value === STEPS.REVIEW && nextStepNumber >= STEPS.REVIEW) {
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
        console.error('==== ROUTEEE CHANGED TO', stepName)
        if (stepName) this.nextStep(STEPS[stepName])
      },
    },
    currentStep: {
      immediate: true,
      handler: function () {
        console.error('-> CURRSTEPCHANGED', this.currentStep)
        this.$router.push({
          query: { step: getStepByNumber(this.currentStep) },
        })
      },
    },
  },
  data() {
    return {
      // shippingMethods: [
      //   {
      //     isOpen: false,
      //     price: 'Free',
      //     delivery: 'Delivery from 3 to 7 business days',
      //     label: 'Pickup in the store',
      //     value: 'store',
      //     description:
      //       'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.',
      //   },
      //   {
      //     isOpen: false,
      //     price: '$9.90',
      //     delivery: 'Delivery from 4 to 6 business days',
      //     label: 'Delivery to home',
      //     value: 'home',
      //     description:
      //       'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.',
      //   },
      //   {
      //     isOpen: false,
      //     price: '$9.90',
      //     delivery: 'Delivery from 4 to 6 business days',
      //     label: 'Paczkomaty InPost',
      //     value: 'inpost',
      //     description:
      //       'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.',
      //   },
      //   {
      //     isOpen: false,
      //     price: '$11.00',
      //     delivery: 'Delivery within 48 hours',
      //     label: '48 hours coffee',
      //     value: 'coffee',
      //     description:
      //       'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.',
      //   },
      //   {
      //     isOpen: false,
      //     price: '$14.00',
      //     delivery: 'Delivery within 24 hours',
      //     label: 'Urgent 24h',
      //     value: 'urgent',
      //     description:
      //       'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.',
      //   },
      // ],
    }
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
