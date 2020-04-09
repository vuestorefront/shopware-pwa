import { required } from 'vuelidate/lib/validators'
import { useCheckout, createCheckoutStep } from '@shopware-pwa/composables'

const { guestOrderParams } = useCheckout()

export const usePersonalDetailsStep = createCheckoutStep({
  stepNumber: 0,
  data: guestOrderParams,
  stepFields: {
    salutationId: null,
    firstName: null,
    lastName: null,
    email: null,
  },
  stepDataUpdated: (updatedData) => {
    const billingAddress = updatedData.differentThanShipping
      ? updatedData
      : guestOrderParams.value.shippingAddress
    guestOrderParams.value = {
      ...guestOrderParams.value,
      billingAddress,
    }
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
