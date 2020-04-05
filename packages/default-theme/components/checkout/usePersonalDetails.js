import { required } from 'vuelidate/lib/validators'
import { createCheckoutStep } from './createCheckoutStep'

export const usePersonalDetails = createCheckoutStep({
  stepNumber: 0,
  stepFields: {
    salutationId: null,
    firstName: null,
    lastName: null,
    email: null,
  },
})

export const usePersonalDetailsValidationRules = {
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
