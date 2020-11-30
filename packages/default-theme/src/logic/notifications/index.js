import { useNotifications } from "@shopware-pwa/composables"

export const addToCartNotification = (product, rootContext) => {
  const { pushSuccess } = useNotifications(rootContext)
  pushSuccess(
    rootContext.i18n.t("{productName} has been added to cart.", {
      productName: product?.translated?.name || product?.name,
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
        pushSuccess(rootContext.i18n.t("Promotion code added successfully"))
        break
      case "promotion-not-found":
        pushError(rootContext.i18n.t("Promotion code does not exist"))
        break
      default:
        pushError(err.message.toString())
    }
  }
}
