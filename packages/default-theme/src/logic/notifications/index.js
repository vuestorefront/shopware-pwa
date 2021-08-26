import {
  getApplicationContext,
  useNotifications,
} from "@shopware-pwa/composables"

export const warningNotification = ({ warning }) => {
  const { pushWarning } = useNotifications()

  pushWarning(warning.message)
}

export const addToWishlistNotification = (payload) => {
  const { pushSuccess } = useNotifications()
  const { i18n } = getApplicationContext()
  pushSuccess(
    i18n.t(`{productName} has been added to wishlist.`, {
      productName: payload?.product?.translated?.name || payload?.product?.name,
    })
  )
}

export const addToCartNotification = (payload) => {
  const { pushSuccess } = useNotifications()
  pushSuccess(
    i18n.t("{productName} has been added to cart.", {
      productName: payload?.product?.translated?.name || payload?.product?.name,
    })
  )
}

export const addPromotionCodeNotification = (payload) => {
  const { pushSuccess, pushError } = useNotifications()
  const { result, promotionCode } = payload

  if (!result.errors || !Object.keys(result.errors).length) {
    return pushSuccess(i18n.t("Promotion code added successfully"))
  }

  const err = Object.values(result.errors).find(
    (error) => promotionCode === error.promotionCode
  )
  if (err) {
    switch (err.messageKey) {
      case "promotion-not-found":
        pushError(i18n.t("Promotion code does not exist"))
        break
      default:
        pushError(err.message.toString())
    }
  }
}
