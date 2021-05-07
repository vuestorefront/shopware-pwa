import { requiredIf } from "@vuelidate/validators"
import { createCheckoutStep } from "@shopware-pwa/composables"
import { CHECKOUT_STEPS } from "@/logic/checkout"

export const usePaymentStep = createCheckoutStep({
  stepNumber: CHECKOUT_STEPS.PAYMENT,
  stepFields: {
    differentThanShipping: false,
    firstName: null,
    lastName: null,
    street: null,
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
    required: requiredIf(function () {
      return this.differentThanShipping
    }),
  },
  lastName: {
    required: requiredIf(function () {
      return this.differentThanShipping
    }),
  },
  street: {
    required: requiredIf(function () {
      return this.differentThanShipping
    }),
  },
  city: {
    required: requiredIf(function () {
      return this.differentThanShipping
    }),
  },
  state: {
    required: requiredIf(function () {
      return this.differentThanShipping
    }),
  },
  zipcode: {
    required: requiredIf(function () {
      return this.differentThanShipping
    }),
  },
  countryId: {
    required: requiredIf(function () {
      return this.differentThanShipping
    }),
  },
  phoneNumber: {
    required: requiredIf(function () {
      return this.differentThanShipping
    }),
  },
}
