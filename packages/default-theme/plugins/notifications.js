import {
  useIntercept,
  INTERCEPTOR_KEYS,
  useNotifications,
} from "@shopware-pwa/composables"

export default async ({ app }) => {
  const { intercept } = useIntercept(app)
  const { pushSuccess, pushError } = useNotifications(app)
  intercept(INTERCEPTOR_KEYS.ADD_TO_CART, function ({ product }) {
    pushSuccess(
      `${product?.translated?.name || product?.name} has been added to cart.`
    )
  })

  intercept(INTERCEPTOR_KEYS.ADD_PROMOTION_CODE, function ({ result }) {
    // It's strange that success also ends up as an error in the API response
    if (result.errors?.length) {
      const err = Object.values(result.errors)[0]
      switch (err.messageKey) {
        case "promotion-discount-added":
          pushSuccess(app.i18n.t("Promotion code added successfully"))
          break
        case "promotion-not-found":
          pushError(app.i18n.t("Promotion code does not exist"))
          break
        default:
          pushError(err.message.toString())
      }
    }
  })
}
