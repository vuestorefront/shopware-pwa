export const STEPS = {
  PERSONAL_DETAILS: 0,
  SHIPPING: 1,
  PAYMENT: 2,
  REVIEW: 3,
}

export const getStepByNumber = (number) => {
  for (let [key, value] of Object.entries(STEPS)) {
    if (value === number) return key
  }
  return 'PERSONAL_DETAILS'
}
