import {
  useIntercept,
  INTERCEPTOR_KEYS,
  useNotifications,
  getApplicationContext,
} from "@shopware-pwa/composables"

export default async ({ app }) => {
  if (process.client) {
    const { setup } = app
    app.setup = function (...args) {
      let result = {}
      if (setup instanceof Function) {
        result = setup(...args) || {}
      }

      const { intercept } = useIntercept()
      const { pushSuccess, pushWarning, pushError } = useNotifications()
      const { i18n } = getApplicationContext()

      intercept(INTERCEPTOR_KEYS.ADD_TO_CART, (payload) => {
        pushSuccess(
          i18n.t("{productName} has been added to cart.", {
            productName:
              payload?.product?.translated?.name || payload?.product?.name,
          })
        )
      })

      intercept(
        INTERCEPTOR_KEYS.ADD_PROMOTION_CODE,
        ({ result, promotionCode }) => {
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
      )

      intercept(INTERCEPTOR_KEYS.ADD_TO_WISHLIST, (payload) => {
        pushSuccess(
          i18n.t(`{productName} has been added to wishlist.`, {
            productName:
              payload?.product?.translated?.name || payload?.product?.name,
          })
        )
      })

      intercept(INTERCEPTOR_KEYS.WARNING, ({ warning }) => {
        pushWarning(warning.message)
      })

      return result
    }
  }
}
