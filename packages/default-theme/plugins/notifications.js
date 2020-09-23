import {
  useIntercept,
  INTERCEPTOR_KEYS,
  useNotifications,
} from "@shopware-pwa/composables"

export default async ({ app }) => {
  const { intercept } = useIntercept(app)
  const { pushSuccess } = useNotifications(app)
  intercept(INTERCEPTOR_KEYS.ADD_TO_CART, function ({ product }) {
    pushSuccess(
      `${product?.translated?.name || product?.name} has been added to cart.`
    )
  })
}
