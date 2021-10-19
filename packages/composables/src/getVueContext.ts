import { getCurrentInstance, getCurrentScope } from "vue-demi";
import { getContextProperty } from "./internalHelpers/getContextProperty";

/**
 * Inject context into effect scope. Do not use this function directly, internal use only.
 *
 * @alpha
 */
export function extendScopeContext(scope: any, app: any) {
  scope.vm.shopwareApiInstance = getContextProperty(app, "shopwareApiInstance");
  scope.vm.sharedStore = getContextProperty(app, "sharedStore");
  scope.vm.interceptors = getContextProperty(app, "interceptors");
  scope.vm.shopwareDefaults = getContextProperty(app, "shopwareDefaults");
  scope.vm.i18n = getContextProperty(app, "i18n");
  scope.vm.routing = getContextProperty(app, "routing");
  scope.vm.shopware = getContextProperty(app, "shopware");
}

/**
 * Use Vue instance scope. Do not use this function directly, internal use only.
 *
 *
 * @alpha
 */
export function useVueContext() {
  const vueComponentInstance = getCurrentInstance()?.proxy;
  const vueScopeInstance = (getCurrentScope() as any)?.vm;

  return {
    isVueComponent: !!vueComponentInstance,
    isVueScope: !!vueScopeInstance,
  };
}
