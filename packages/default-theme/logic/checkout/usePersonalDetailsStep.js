import { required } from 'vuelidate/lib/validators'
import { useCheckout, createCheckoutStep } from '@shopware-pwa/composables'
import { CHECKOUT_STEPS } from '@shopware-pwa/default-theme/logic/checkout'

const { guestOrderParams, setGuestOrderParams } = useCheckout()

export const usePersonalDetailsStep = createCheckoutStep({
  stepNumber: CHECKOUT_STEPS.PERSONAL_DETAILS,
  data: guestOrderParams,
  stepFields: {
    salutationId: null,
    firstName: null,
    lastName: null,
    email: null,
  },
  stepDataUpdated: (updatedData) => {
    setGuestOrderParams(updatedData)
  },
})

export const usePersonalDetailsStepValidationRules = {
  salutationId: {
    required,
  },
  firstName: {
    required,
  },
  lastName: {
    required,
  },
}
