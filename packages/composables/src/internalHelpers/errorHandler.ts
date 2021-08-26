import {
  EntityError,
  ErrorLevel,
} from "@shopware-pwa/commons/interfaces/models/common/EntityError";

import { INTERCEPTOR_KEYS, useIntercept } from "@shopware-pwa/composables";

/**
 * @beta
 */
export const broadcastErrors = (
  errors: EntityError[],
  methodName: string
): void => {
  if (!Array.isArray(errors) || !errors.length || !methodName) {
    return;
  }
  const { broadcast } = useIntercept();

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
