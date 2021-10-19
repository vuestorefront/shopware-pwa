import { getApplicationContext } from "@shopware-pwa/composables";
import { getCurrentInstance, onUnmounted } from "vue-demi";
import { SwInterceptor } from "../appContext";

/**
 * Keys used accross composables with the name of incommint parameters.
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
 * @public
 */
export interface IInterceptorCallbackFunction {
  (payload: any): void;
}

/**
 * Allows to broadcast and intercept events across application.
 *
 * @public
 */
export function useIntercept() {
  const COMPOSABLE_NAME = "useIntercept";
  const contextName = COMPOSABLE_NAME;

  const { interceptors, devtools } = getApplicationContext({ contextName });

  const localSubscribers: any[] = [];
  const isVueInstance: boolean = !!getCurrentInstance();

  /**
   * Broadcast new event
   */
  const broadcast = (broadcastKey: string, value?: any) => {
    const event = devtools?.trackEvent(
      "[useIntercept][broadcast] " + broadcastKey,
      value
    );
    if (interceptors[broadcastKey]?.length) {
      interceptors[broadcastKey].forEach((interceptor: SwInterceptor) => {
        event?.log("Run interceptor: " + interceptor.name, value);
        interceptor.handler(value);
      });
    }
    event?.log("Broadcast ended", value);
  };

  /**
   * Intercept broadcasted event
   *
   * @deprecated use `on` instead
   */
  const intercept = (
    broadcastKey: string,
    handler: IInterceptorCallbackFunction
  ) => {
    devtools?.warning(
      "[useIntercept][intercept] Anonymous interceptor registration for key: " +
        broadcastKey +
        " use 'on' method instead"
    );
    on({
      broadcastKey,
      name: "annonymous",
      handler,
    });
  };

  /**
   * Stop listening on event.
   * You can pass interceptor method handler or the interceptor name, which is a identifier.
   */
  const disconnect = (
    broadcastKey: string,
    interceptor: string | IInterceptorCallbackFunction
  ) => {
    devtools?.log("[useIntercept][disconnect] Disconnecting interceptor", {
      broadcastKey,
      interceptor,
    });
    interceptors[broadcastKey] =
      interceptors[broadcastKey]?.filter(
        (registeredInterceptor: any) =>
          registeredInterceptor.handler !== interceptor &&
          registeredInterceptor.name !== interceptor
      ) || [];
  };

  /**
   * Registers interceptor to handle on specific event
   * Provided name like 'show-notification' helps to
   * identify what the interceptor role is and helps with debugging.
   */
  function on(params: {
    broadcastKey: string;
    name: string;
    handler: IInterceptorCallbackFunction;
  }) {
    devtools?.log("[useIntercept][on] Registered interceptor", params);
    if (!interceptors[params.broadcastKey])
      interceptors[params.broadcastKey] = [];
    interceptors[params.broadcastKey].push({
      name: params.name,
      handler: params.handler,
    });
    localSubscribers.push({
      broadcastKey: params.broadcastKey,
      name: params.name,
    });
  }

  // Automatically clean listener if it was used in Vue component
  isVueInstance &&
    onUnmounted(() => {
      localSubscribers.forEach(({ broadcastKey, name }) => {
        disconnect(broadcastKey, name);
      });
    });

  return {
    broadcast,
    intercept,
    disconnect,
    on,
  };
}
