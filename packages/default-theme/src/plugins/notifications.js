import {
  useIntercept,
  INTERCEPTOR_KEYS,
  useNotifications,
  getApplicationContext,
} from "@shopware-pwa/composables"
import { getTranslatedProperty } from "@shopware-pwa/helpers"

export default async ({ app }) => {
  if (process.client) {
    const { setup } = app
    app.setup = function (...args) {
      let result = {}
      if (setup instanceof Function) {
        result = setup(...args) || {}
      }

      const { on } = useIntercept()
      const { pushSuccess, pushWarning, pushError } = useNotifications()
      const { i18n, router, routing } = getApplicationContext()

      on({
        broadcastKey: INTERCEPTOR_KEYS.ADD_TO_CART,
        name: "show-notification",
        handler: ({ apiResponse, product }) => {
          // ignore warning or notice type
          const errorFound = Object.entries(apiResponse?.errors)?.find(
            ([code, error]) => error.level === 20
          ) // 20 is ErrorLevel.ERROR
          errorFound ||
            pushSuccess(
              i18n.t("{productName} has been added to cart.", {
                productName: getTranslatedProperty(product, "name"),
              })
            )
        },
      })

      on({
        broadcastKey: INTERCEPTOR_KEYS.ADD_PROMOTION_CODE,
        name: "show-notification",
        handler: ({ result, promotionCode }) => {
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
        },
      })

      on({
        broadcastKey: INTERCEPTOR_KEYS.ADD_TO_WISHLIST,
        name: "show-notification",
        handler: (payload) => {
          pushSuccess(
            i18n.t(`{productName} has been added to wishlist.`, {
              productName: getTranslatedProperty(payload?.product, "name"),
            })
          )
        },
      })

      on({
        broadcastKey: INTERCEPTOR_KEYS.WARNING,
        name: "show-notification",
        handler: ({ warning }) => {
          pushWarning(warning.message)
        },
      })

      on({
        broadcastKey: INTERCEPTOR_KEYS.ERROR,
        name: "show-notification",
        handler: ({ error }) => {
          // notify on every broadcasted error from http 500 group.
          // disconnect if they are not necesarry entirely, or just create conditions to filter they out
          error?.statusCode === 500 && pushError(error.message)
        },
      })

      on({
        broadcastKey: INTERCEPTOR_KEYS.USER_REGISTER,
        name: "show-notification",
        handler: ({ customer }) => {
          if (!customer) {
            return
          }

          if (
            customer.doubleOptInRegistration &&
            !customer.doubleOptInConfirmDate
          ) {
            return pushSuccess(
              i18n.t(
                "Congratulations! You have been successfully registered. Check your email and confirm you account."
              ),
              {
                persistent: true,
              }
            )
          }

          pushSuccess(
            i18n.t("Congratulations! You have been successfully registered.")
          )
        },
      })

      on({
        broadcastKey: INTERCEPTOR_KEYS.USER_LOGOUT,
        name: "react-on-logout",
        handler: () => {
          const accountPath = "/account"
          // TODO: use route from getApplicationContext method after fix from https://github.com/vuestorefront/shopware-pwa/issues/1732 is done
          const currentRoute = app?.context?.route
          pushSuccess(i18n.t(`You have been successfully logged out.`))

          // if it's an area of restricted user profile - then redirect to the home page
          if (currentRoute?.path?.startsWith(routing.getUrl(accountPath))) {
            router.push(routing.getUrl("/"))
          }
        },
      })

      return result
    }
  }
}
