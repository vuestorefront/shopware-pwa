import {
  EntityError,
  ErrorLevel,
} from "@shopware-pwa/commons/interfaces/models/common/EntityError";

import { INTERCEPTOR_KEYS, useIntercept } from "@shopware-pwa/composables";
import { ApplicationVueContext } from "../appContext";

/**
 * @beta
 */
export const broadcastErrors = (
  errors: EntityError[],
  methodName: string,
  rootContext: ApplicationVueContext
): void => {
  if (!Array.isArray(errors) || !errors.length || !methodName || !rootContext) {
    return;
  }
  const { broadcast } = useIntercept(rootContext);

  errors.forEach((error) => {
    let interceptorKey;

    switch (error.level) {
      case ErrorLevel.NOTICE:
        interceptorKey = INTERCEPTOR_KEYS.NOTICE;
        break;
      case ErrorLevel.WARNING:
        interceptorKey = INTERCEPTOR_KEYS.WARNING;
        break;
      default:
        interceptorKey = INTERCEPTOR_KEYS.ERROR;
    }

    broadcast(interceptorKey, {
      methodName: methodName,
      inputParams: {},
      [interceptorKey]: error,
    });
  });
};
