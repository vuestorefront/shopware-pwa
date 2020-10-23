import { useCart } from "@shopware-pwa/composables"
const CHECKOUT_ROUTE_NAME = "checkout"
const NO_ITEMS_ROUTE_PATH = "/"

/**
 * 1. Check if there is an order (based on cart) stick to the current session
 * 2. Redirect to home otherwise
 */
export default async function ({ route, redirect, app }) {
  if (route.name !== CHECKOUT_ROUTE_NAME) {
    return
  }

  const { cartItems } = useCart(app)

  if (cartItems.value < 1) {
    redirect(NO_ITEMS_ROUTE_PATH)
  }
}
