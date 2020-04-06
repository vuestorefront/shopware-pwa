import { required } from 'vuelidate/lib/validators'
import { useCheckout, createCheckoutStep } from '@shopware-pwa/composables'

const { shippingData } = useCheckout()

export const useShippingStep = createCheckoutStep({
  stepNumber: 1,
  data: shippingData,
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
