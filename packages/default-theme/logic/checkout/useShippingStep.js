import { required } from "vuelidate/lib/validators"
import { useCheckout, createCheckoutStep } from "@shopware-pwa/composables"
import { CHECKOUT_STEPS } from "@shopware-pwa/default-theme/logic/checkout"

const { guestOrderParams, updateGuestOrderParams } = useCheckout()

export const useShippingStep = createCheckoutStep({
  stepNumber: CHECKOUT_STEPS.SHIPPING,
  data: guestOrderParams.shippingAddress,
  stepFields: {
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
  stepDataUpdated: (updatedData) => {
    const shippingAddress = {
      ...updatedData,
      salutationId: guestOrderParams.value.salutationId,
    }
    updateGuestOrderParams({ shippingAddress })
    // update billing address if is no different than shipping
    if (!guestOrderParams.value.billingAddress?.differentThanShipping) {
      updateGuestOrderParams({ billingAddress: shippingAddress })
    }
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
  apartment: {
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
