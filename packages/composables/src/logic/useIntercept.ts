import {
  getApplicationContext,
  ApplicationVueContext,
} from "@shopware-pwa/composables";
import { getCurrentInstance, onUnmounted } from "@vue/composition-api";

/**
 * Keys used accross composables with the description of incommint parameters.
 *
 * @beta
 */
export const INTERCEPTOR_KEYS = {
  /**
   * Broadcasted by useAddToCart composable on successful addToCart method invocation.
   * As a parameter passes product added to cart and quantity.
   */
  ADD_TO_CART: "addToCart",
  /**
   * Broadcasted through application in case of important error.
   * Can be used to connect to external service collectiong logs.
   * As a parameter passes:
   * - methodName - string - method where error occured
   * - inputParams - Object - input params of the method
   * - error - string - message of the error
   */
  ERROR: "error",
  /**
   * Broadcasted after user is logged out.
   * Contains no params.
   */
  USER_LOGOUT: "onUserLogout",
};

/**
 * interface for {@link useIntercept} composable
 * @beta
 */
export interface IUseIntercept {
  /**
   * Broadcast new event
   */
  broadcast: (broadcastKey: string, value?: any) => void;
  /**
   * Intercept broadcasted event
   */
  intercept: (broadcastKey: string, method: Function) => void;
  /**
   * Stop listening on event
   */
  disconnect: (broadcastKey: string, method: Function) => void;
}

/**
 * Allows to broadcast and intercept events across application.
 *
 * @beta
 */
export const useIntercept = (
  rootContext: ApplicationVueContext
): IUseIntercept => {
  const { interceptors } = getApplicationContext(rootContext, "useIntercept");

  const localSunscribers: any[] = [];
  const isVueInstance: boolean = !!getCurrentInstance();

  const broadcast = (broadcastKey: string, value?: any) => {
    if (interceptors[broadcastKey]?.length) {
      interceptors[broadcastKey].forEach((broadcastMethod: Function) =>
        broadcastMethod(value)
      );
    }
  };

  const intercept = (broadcastKey: string, method: Function) => {
    if (!interceptors[broadcastKey]) interceptors[broadcastKey] = [];
    interceptors[broadcastKey].push(method);
    isVueInstance && localSunscribers.push({ broadcastKey, method });
  };

  const disconnect = (broadcastKey: string, method: Function) => {
    interceptors[broadcastKey] =
      interceptors[broadcastKey]?.filter(
        (subscribedMethod: Function) => subscribedMethod !== method
      ) || [];
  };

  // Automatically clean listener if it was used in Vue component
  isVueInstance &&
    onUnmounted(() => {
      localSunscribers.forEach(({ broadcastKey, method }) => {
        disconnect(broadcastKey, method);
      });
    });

  return {
    broadcast,
    intercept,
    disconnect,
  };
};
