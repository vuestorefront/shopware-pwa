import {
  ApplicationVueContext,
  getApplicationContext,
} from "@shopware-pwa/composables";
import { getCurrentInstance, onUnmounted } from "vue-demi";

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
   * Broadcasted by useWishlist composable on successful addToWishlist method invocation.
   * As a parameter passes:
   * - product object
   */
  ADD_TO_WISHLIST: "addToWishlist",
  /**
   * Broadcasted by useCart composable on successful submitPromotionCode method invocation.
   * As a parameter passes used promotion code and response result.
   */
  ADD_PROMOTION_CODE: "addPromotionCode",
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
   * Broadcasted through application in case of relevant warning.
   * Can be used to inform end-user about current request's problems.
   * As a parameter passes:
   * - methodName - string - method where error occured
   * - inputParams - Object - input params of the method
   * - warning - Object - error object with specific message, like CartError object
   */
  WARNING: "warning",
  /**
   * Broadcasted through application in case of relevant notice message.
   * Can be used to inform end-user about current request's problems.
   * As a parameter passes:
   * - methodName - string - method where error occured
   * - inputParams - Object - input params of the method
   * - notice - Object - error object with specific message, like CartError object
   */
  NOTICE: "notice",
  /**
   * Broadcasted by useCheckout, createOrder method.
   * As a parameter passes:
   * - order object
   */
  ORDER_PLACE: "onOrderPlace",

  /**
   * Broadcasted by useOrderDetauils, changePaymentMethod method.
   */
  ORDER_PAYMENT_METHOD_CHANGED: "onOrderPaymentMethodChanged",

  /**
   * Broadcasted by useOrderDetauils, cancel method.
   */
  ORDER_CANCELLED: "onOrderCanceled",

  /**
   * Broadcasted by useOrderDetauils, loadOrderDetails method.
   */
  ORDER_DETAILS_LOADED: "onOrderDetailsLoaded",

  /**
   * Broadcasted by useOrderDetauils, handlePayment method.
   */
  ORDER_HANDLE_PAYMENT: "onOrderHandlePayment",

  /**
   * Broadcasted by useSessionContext, setCurrency method.
   * As a parameter passes:
   * - currency object
   */
  SESSION_SET_CURRENCY: "onCurrencyChange",
  /**
   * Broadcasted by useSessionContext, setPaymentMethod method.
   * As a parameter passes:
   * - payment method object
   */
  SESSION_SET_PAYMENT_METHOD: "onPaymentMethodChange",
  /**
   * Broadcasted by useSessionContext, setShippingMethod method.
   * As a parameter passes:
   * - shipping method object
   */
  SESSION_SET_SHIPPING_METHOD: "onShippingMethodChange",
  /**
   * Broadcasted after user is logged out.
   * Contains no params.
   */
  USER_LOGOUT: "onUserLogout",
  /**
   * Broadcasted after user is logged in.
   * As a parameter passes:
   * - customer object
   */
  USER_LOGIN: "onUserLogin",
  /**
   * Broadcasted after user is successfully registered.
   */
  USER_REGISTER: "onUserRegister",
};

/**
 * interface for the callback function of interceptors
 * @beta
 */
export interface IInterceptorCallbackFunction {
  (payload: any, rootContext?: ApplicationVueContext): void;
}

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
  intercept: (
    broadcastKey: string,
    method: IInterceptorCallbackFunction
  ) => void;
  /**
   * Stop listening on event
   */
  disconnect: (
    broadcastKey: string,
    method: IInterceptorCallbackFunction
  ) => void;
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

  const localSubscribers: any[] = [];
  const isVueInstance: boolean = !!getCurrentInstance();

  const broadcast = (broadcastKey: string, value?: any) => {
    if (interceptors[broadcastKey]?.length) {
      interceptors[broadcastKey].forEach(
        (broadcastMethod: IInterceptorCallbackFunction) =>
          broadcastMethod(value, rootContext)
      );
    }
  };

  const intercept = (
    broadcastKey: string,
    method: IInterceptorCallbackFunction
  ) => {
    if (!interceptors[broadcastKey]) interceptors[broadcastKey] = [];
    interceptors[broadcastKey].push(method);
    isVueInstance && localSubscribers.push({ broadcastKey, method });
  };

  const disconnect = (
    broadcastKey: string,
    method: IInterceptorCallbackFunction
  ) => {
    interceptors[broadcastKey] =
      interceptors[broadcastKey]?.filter(
        (subscribedMethod: IInterceptorCallbackFunction) =>
          subscribedMethod !== method
      ) || [];
  };

  // Automatically clean listener if it was used in Vue component
  isVueInstance &&
    onUnmounted(() => {
      localSubscribers.forEach(({ broadcastKey, method }) => {
        disconnect(broadcastKey, method);
      });
    });

  return {
    broadcast,
    intercept,
    disconnect,
  };
};
