import {
  EntityError,
  ErrorLevel,
} from "@shopware-pwa/commons/interfaces/models/common/EntityError";

import { INTERCEPTOR_KEYS } from "@shopware-pwa/composables";
import { ApplicationVueContext } from "../appContext";
import { useIntercept } from "../logic/useIntercept";

/**
 *
 * @beta
 */
export const broadcastErrors = (
  errors: EntityError[],
  methodName: string,
  rootContext: ApplicationVueContext
): any => {
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
