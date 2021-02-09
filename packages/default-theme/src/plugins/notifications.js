import { useIntercept, INTERCEPTOR_KEYS } from "@shopware-pwa/composables"
import {
  addPromotionCodeNotification,
  addToCartNotification,
  addToWishlistNotification,
} from "@/logic/notifications"

export default ({ app }) => {
  const { intercept } = useIntercept(app)
  intercept(INTERCEPTOR_KEYS.ADD_TO_CART, addToCartNotification)
  intercept(INTERCEPTOR_KEYS.ADD_PROMOTION_CODE, addPromotionCodeNotification)
  intercept(INTERCEPTOR_KEYS.ADD_TO_WISHLIST, addToWishlistNotification)
}
