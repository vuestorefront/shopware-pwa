import { required } from "vuelidate/lib/validators"
import { createCheckoutStep } from "@shopware-pwa/composables"
import { CHECKOUT_STEPS } from "@/logic/checkout"

export const useShippingStep = createCheckoutStep({
  stepNumber: CHECKOUT_STEPS.SHIPPING,
  stepFields: {
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
    let result = {}
    result.shippingAddress = {
      ...updatedData,
      salutationId: guestOrderParams.value.salutationId,
    }
    // update billing address if is no different than shipping
    if (!guestOrderParams.value.billingAddress?.differentThanShipping) {
      result.billingAddress = result.shippingAddress
    }
    return result
  },
})

export const useShippingStepValidationRules = {
  firstName: {
    required,
  },
  lastName: {
    required,
  },
  street: {
    required,
  },
  city: {
    required,
  },
  state: {
    required,
  },
  zipcode: {
    required,
  },
  countryId: {
    required,
  },
  phoneNumber: {
    required,
  },
}
