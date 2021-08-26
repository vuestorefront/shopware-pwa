import { effectScope } from "vue-demi"
import {
  useIntercept,
  INTERCEPTOR_KEYS,
  extendScopeContext,
} from "@shopware-pwa/composables"
import {
  addPromotionCodeNotification,
  addToCartNotification,
  addToWishlistNotification,
  warningNotification,
} from "@/logic/notifications"

export default async ({ app }) => {
  const scope = effectScope()
  extendScopeContext(scope, app)

  scope.run(async () => {
    const { intercept } = useIntercept()
    intercept(INTERCEPTOR_KEYS.ADD_TO_CART, addToCartNotification)
    intercept(INTERCEPTOR_KEYS.ADD_PROMOTION_CODE, addPromotionCodeNotification)
    intercept(INTERCEPTOR_KEYS.ADD_TO_WISHLIST, addToWishlistNotification)
    intercept(INTERCEPTOR_KEYS.WARNING, warningNotification)
  })
}
