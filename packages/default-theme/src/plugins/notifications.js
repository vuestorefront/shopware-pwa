import { useIntercept, INTERCEPTOR_KEYS } from "@shopware-pwa/composables"
import {
  addPromotionCodeNotification,
  addToCartNotification,
  addToWishlistNotification,
  warningNotification,
} from "@/logic/notifications"

export default async ({ app }) => {
  const scope = effectScope()
  extendScopeContext(scope, app)
  const { intercept } = useIntercept()

  scope.run(async () => {
    intercept(INTERCEPTOR_KEYS.ADD_TO_CART, addToCartNotification)
    intercept(INTERCEPTOR_KEYS.ADD_PROMOTION_CODE, addPromotionCodeNotification)
    intercept(INTERCEPTOR_KEYS.ADD_TO_WISHLIST, addToWishlistNotification)
    intercept(INTERCEPTOR_KEYS.WARNING, warningNotification)
  })
}
