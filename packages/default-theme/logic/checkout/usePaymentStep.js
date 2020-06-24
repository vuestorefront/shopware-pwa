import { requiredIf } from "vuelidate/lib/validators"
import { createCheckoutStep } from "@shopware-pwa/composables"
import { CHECKOUT_STEPS } from "@shopware-pwa/default-theme/logic/checkout"

export const usePaymentStep = createCheckoutStep({
  stepNumber: CHECKOUT_STEPS.PAYMENT,
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
  stepDataUpdated: (updatedData, guestOrderParams) => {
    const billingAddress = updatedData.differentThanShipping
      ? updatedData
      : guestOrderParams.value.shippingAddress
    billingAddress.salutationId = guestOrderParams.value.salutationId
    return { billingAddress }
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
