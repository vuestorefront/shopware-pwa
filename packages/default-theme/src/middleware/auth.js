import { useUser } from "@shopware-pwa/composables"
import { PAGE_LOGIN } from "@/helpers/pages"
const LOGIN_ROUTE_NAME = "login"

const PAGES_FOR_LOGGED_IN_ONLY = [
  "account", // user's account page
  "account-profile",
  "account-orders",
  "account-addresses",
]

/**
 * 1. Check if requesting route is restricted only for authenticated user
 * 2. Redirect to /login otherwise (always force logout on /login route)
 */
export default async function ({ route, redirect, app }) {
  const { isLoggedIn, logout, refreshUser } = useUser(app)

  if (route.name === LOGIN_ROUTE_NAME) {
    await logout()
  }

  await refreshUser()

  if (
    PAGES_FOR_LOGGED_IN_ONLY.includes(route.name) &&
    isLoggedIn &&
    !isLoggedIn.value
  ) {
    redirect(PAGE_LOGIN)
  }
}
