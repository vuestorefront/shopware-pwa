import { required } from 'vuelidate/lib/validators'
import { useCheckout, createCheckoutStep } from '@shopware-pwa/composables'

const { guestOrderParams } = useCheckout()

export const usePersonalDetailsStep = createCheckoutStep({
  stepNumber: 0,
  stepDataUpdated: (updatedData) => {
    guestOrderParams.value = {
      ...guestOrderParams.value,
      ...updatedData,
    }
  },
  stepFields: {
    salutationId: null,
    firstName: null,
    lastName: null,
    email: null,
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
