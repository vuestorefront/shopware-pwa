import { EntityError, ErrorLevel } from "@shopware-pwa/commons";

import { INTERCEPTOR_KEYS } from "@shopware-pwa/composables";

/**
 * @internal
 */
export const broadcastErrors = (
  errors: EntityError[],
  methodName: string,
  broadcast: Function
): void => {
  if (!Array.isArray(errors) || !errors.length || !methodName) {
    return;
  }

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
