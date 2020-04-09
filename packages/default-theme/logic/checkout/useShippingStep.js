import { toRefs } from '@vue/composition-api'
import { required } from 'vuelidate/lib/validators'
import { useCheckout, createCheckoutStep } from '@shopware-pwa/composables'

const { guestOrderParams } = useCheckout()
const paramsRefs = toRefs(guestOrderParams)

export const useShippingStep = createCheckoutStep({
  stepNumber: 1,
  data: paramsRefs.shippingAddress,
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
    console.error('SHIPPING UPDATED', updatedData)
    guestOrderParams.value = {
      ...guestOrderParams.value,
      shippingAddress: updatedData,
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
