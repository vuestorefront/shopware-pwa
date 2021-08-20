import { getCurrentInstance, getCurrentScope } from "vue-demi";

function _getFromProperty(object: { [key: string]: unknown }, name: string) {
  return object[`$${name}`] || object[name];
}

/**
 * Inject context into effect scope. Do not use this function directly, internal use only.
 *
 * @alpha
 */
export function extendScopeContext(scope: any, app: any) {
  scope.vm.shopwareApiInstance = _getFromProperty(app, "shopwareApiInstance");
  scope.vm.sharedStore = app.$sharedStore; //_getFromProperty(app, "sharedStore");
  scope.vm.interceptors = _getFromProperty(app, "interceptors");
  scope.vm.shopwareDefaults = _getFromProperty(app, "shopwareDefaults");
  scope.vm.i18n = _getFromProperty(app, "i18n");
  scope.vm.routing = _getFromProperty(app, "routing");
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
