import { requiredIf } from 'vuelidate/lib/validators'
import { createCheckoutStep } from './createCheckoutStep'

export const usePayment = createCheckoutStep({
  stepNumber: 2,
  stepFields: {
    differentThanShipping: false,
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

export const usePaymentValidationRules = {
  firstName: {
    required: requiredIf(function (instance) {
      return instance.differentThanShipping
    }),
  },
  lastName: {
    required: requiredIf(function (instance) {
      return instance.differentThanShipping
    }),
  },
  streetName: {
    required: requiredIf(function (instance) {
      return instance.differentThanShipping
    }),
  },
  apartment: {
    required: requiredIf(function (instance) {
      return instance.differentThanShipping
    }),
  },
  city: {
    required: requiredIf(function (instance) {
      return instance.differentThanShipping
    }),
  },
  state: {
    required: requiredIf(function (instance) {
      return instance.differentThanShipping
    }),
  },
  zipCode: {
    required: requiredIf(function (instance) {
      return instance.differentThanShipping
    }),
  },
  country: {
    required: requiredIf(function (instance) {
      return instance.differentThanShipping
    }),
  },
  phoneNumber: {
    required: requiredIf(function (instance) {
      return instance.differentThanShipping
    }),
  },
}
