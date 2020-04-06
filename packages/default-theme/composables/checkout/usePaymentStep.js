import { requiredIf } from 'vuelidate/lib/validators'
import { useCheckout, createCheckoutStep } from '@shopware-pwa/composables'

const { billingData } = useCheckout()

export const usePaymentStep = createCheckoutStep({
  stepNumber: 2,
  data: billingData,
  stepFields: {
    differentThanShipping: false,
    firstName: null,
    lastName: null,
    street: null,
    apartment: null,
    city: null,
    state: null,
    zipcode: null,
    countryId: null,
    phoneNumber: null,
  },
})

export const usePaymentStepValidationRules = {
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
  street: {
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
  zipcode: {
    required: requiredIf(function (instance) {
      return instance.differentThanShipping
    }),
  },
  countryId: {
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
