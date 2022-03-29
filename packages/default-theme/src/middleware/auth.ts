import { effectScope } from "vue-demi"
import {
  useUser,
  extendScopeContext,
  getApplicationContext,
} from "@shopware-pwa/composables"
import { PAGE_LOGIN } from "@/helpers/pages"
import { Context } from "@nuxt/types"

/**
 * 1. Check if requesting route is restricted only for authenticated user
 * 2. Redirect to /login otherwise (always force logout on /login route)
 */
export default async function ({
  route,
  redirect,
  app,
}: Context): Promise<void> {
  if (route.path.includes("/account/recover/password")) return // allow the route for password recovery

  const scope = effectScope()
  extendScopeContext(scope, app)

  await scope.run(async () => {
    const contextName = "auth-middleware"
    const { routing } = getApplicationContext({
      contextName,
    })
    const { isLoggedIn, logout, refreshUser, isGuestSession } = useUser()

    if (route.path === PAGE_LOGIN) {
      await logout()
      return
    }
    try {
      await refreshUser()
    } catch (error) {
      // potential error is not crucial for end-user
      // 403 after logout should be silenced
    }

    if (!isLoggedIn.value || isGuestSession.value) {
      redirect(routing.getUrl(PAGE_LOGIN))
    }
  })

  scope.stop()
}
