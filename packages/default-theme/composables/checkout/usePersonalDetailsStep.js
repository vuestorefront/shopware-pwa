import { required } from 'vuelidate/lib/validators'
import { useCheckout, createCheckoutStep } from '@shopware-pwa/composables'

const { customerData } = useCheckout()

export const usePersonalDetailsStep = createCheckoutStep({
  stepNumber: 0,
  data: customerData,
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
