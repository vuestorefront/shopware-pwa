import { getCurrentInstance } from "@vue/composition-api";

function checkAppContext(key: string, rootContext: any): boolean {
  if (!rootContext?.$shopwareApiInstance) {
    process.env.NODE_ENV !== "production" &&
      console.warn(
        `[SECURITY][${key}] Trying to access Application context without Vue instance context. See https://shopware-pwa-docs.vuestorefront.io/landing/fundamentals/#context-awareness`
      );
    return false;
  }
  return true;
}

/**
 *
 * @beta
 */
export function getApplicationContext(
  rootContext: any,
  key: string = "getApplicationContext"
) {
  let context = rootContext;
  if (!checkAppContext(key, rootContext)) {
    context = getCurrentInstance();
  }
  return {
    apiInstance: context?.$shopwareApiInstance,
    vuexStore: context?.$store,
    router: context?.$router,
    i18n: context?.$i18n,
  };
}
