import {
  useIntercept,
  INTERCEPTOR_KEYS,
  addPromotionCodeNotification,
  addToCartNotification,
} from "@shopware-pwa/composables"

export default async ({ app }) => {
  const { intercept } = useIntercept(app)
  intercept(INTERCEPTOR_KEYS.ADD_TO_CART, addToCartNotification)
  intercept(INTERCEPTOR_KEYS.ADD_PROMOTION_CODE, addPromotionCodeNotification)
}
