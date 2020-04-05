import { required } from 'vuelidate/lib/validators'
import { createCheckoutStep } from './createCheckoutStep'

export const useShipping = createCheckoutStep({
  stepNumber: 1,
  stepFields: {
    firstName: null,
    lastName: null,
    streetName: null,
    apartment: null,
    city: null,
    state: null,
    zipCode: null,
    country: null,
    phoneNumber: null,
  },
})

export const useShippingValidationRules = {
  firstName: {
    required,
  },
  lastName: {
    required,
  },
  streetName: {
    required,
  },
  apartment: {
    required,
  },
  city: {
    required,
  },
  state: {
    required,
  },
  zipCode: {
    required,
  },
  country: {
    required,
  },
  phoneNumber: {
    required,
  },
}
