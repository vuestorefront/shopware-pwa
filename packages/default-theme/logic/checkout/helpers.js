import { CHECKOUT_STEPS } from '@shopware-pwa/default-theme/logic/checkout/steps'

export const getStepByNumber = (number) => {
  for (let [key, value] of Object.entries(CHECKOUT_STEPS)) {
    if (value === number) return key
  }
  return 'PERSONAL_DETAILS'
}
