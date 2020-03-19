import { ShopwareError } from "@shopware-pwa/commons/interfaces/errors/ApiError";

/**
 * Get the messages from the API response (array of ShopwareErrors)
 */
export function getMessagesFromErrorsArray(
  errors: ShopwareError[]
): String[] | undefined {
  if (!errors || !Array.isArray(errors) || !errors.length) {
    return;
  }
  // return a message only if detail and pointer propery is provided in upcoming ShopwareError
  return errors
    .map(
      ({ detail, source }) =>
        detail &&
        source &&
        source.pointer &&
        `${source.pointer.substring(1)}: ${detail}`
    )
    .filter(message => message);
}
