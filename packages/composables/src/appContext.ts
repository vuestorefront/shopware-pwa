import { getCurrentInstance } from "@vue/composition-api";

export function checkAppContext(key: string, rootContext: any): boolean {
  if (!rootContext?.$shopwareApiInstance) {
    process.env.NODE_ENV !== "production" &&
      console.warn(
        `[SECURITY][${key}] Trying to access Application context without Vue instance context.` // TODO: see link...
      );
    return false;
  }
  return true;
}

export function getApplicationContext(key: string, rootContext: any) {
  let context = rootContext;
  if (!checkAppContext(key, rootContext)) {
    context = getCurrentInstance();
  }
  return {
    apiInstance: context?.shopwareApiInstance || context?.$shopwareApiInstance,
    vuexStore: context?.store || context?.$store,
  };
}
