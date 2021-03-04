import { useNotifications } from "@shopware-pwa/composables"

export const addToWishlistNotification = (payload, rootContext) => {
  const { pushSuccess } = useNotifications(rootContext)
  pushSuccess(
    rootContext.$t(`{productName} has been added to wishlist.`, {
      productName: payload?.product?.translated?.name || payload?.product?.name,
    })
  )
}

export const addToCartNotification = (payload, rootContext) => {
  const { pushSuccess } = useNotifications(rootContext)
  pushSuccess(
    rootContext.$t("{productName} has been added to cart.", {
      productName: payload?.product?.translated?.name || payload?.product?.name,
    })
  )
}

export const addPromotionCodeNotification = (result, rootContext) => {
  const { pushSuccess, pushError } = useNotifications(rootContext)
  // It's strange that success also ends up as an error in the API response
  const err = Object.values(result.errors)[0]
  if (err) {
    switch (err.messageKey) {
      case "promotion-discount-added":
        pushSuccess(rootContext.$t("Promotion code added successfully"))
        break
      case "promotion-not-found":
        pushError(rootContext.$t("Promotion code does not exist"))
        break
      default:
        pushError(err.message.toString())
    }
  }
}
