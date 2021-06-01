import { useNotifications } from "@shopware-pwa/composables"

export const warningNotification = ({ warning }, rootContext) => {
  const { pushWarning } = useNotifications(rootContext)
  pushWarning(warning.message)
}

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

export const addPromotionCodeNotification = (payload, rootContext) => {
  const { pushSuccess, pushError } = useNotifications(rootContext)
  const { result, promotionCode } = payload

  if (!result.errors || !Object.keys(result.errors).length) {
    return pushSuccess(rootContext.$t("Promotion code added successfully"))
  }

  const err = Object.values(result.errors).find(
    (error) => promotionCode === error.promotionCode
  )
  if (err) {
    switch (err.messageKey) {
      case "promotion-not-found":
        pushError(rootContext.$t("Promotion code does not exist"))
        break
      default:
        pushError(err.message.toString())
    }
  }
}
