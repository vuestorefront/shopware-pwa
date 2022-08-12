import { AxiosError } from "axios";
import {
  ShopwareError,
  ShopwareApiError,
  ClientApiError,
} from "@shopware-pwa/commons";

/**
 * Handle all HTTP status codes from 4xx group as an API errors, including 500 (exception for order placement issue)
 * 408 timeout error is handled separately
 */
const isApiError = (statusCode: number): boolean => {
  if (
    (statusCode != 408 && statusCode.toString().startsWith("4")) ||
    statusCode == 500
  ) {
    return true;
  }
  return false;
};
/**
 * @param {ShopwareApiError} error
 */
const extractApiErrorStatusCode = (error: ShopwareApiError): number => {
  return (
    (error.response && error.response.status) ||
    guessTheStatusCodeFromTheMessage(error.message)
  );
};

/**
 * Sometimes the HTTP status code is not available and must be guessed from the message.
 * In cases like connection problems, or timeout error comes from intermediate layer (i.e. client)
 */
const guessTheStatusCodeFromTheMessage = (message: string): number => {
  // catch the specific timeout rejection from axios
  if (typeof message === "string" && message.startsWith("timeout of")) {
    return 408;
  }

  // offline mode exception
  if (typeof message === "string" && message.startsWith("Network Error")) {
    return 0;
  }

  return 500;
};

/**
 * Extract error message
 * Keep the original errors[] format if 400 Bad Request for validation purposes.
 * 400 responses always points to the specific field/param/option, thus should be kept entirely.
 *
 * @param {ShopwareApiError} error
 * @returns {(string|ShopwareError[])} single message if statusCode !== 400, array of native errors otherwise
 */
const extractApiErrorMessage = (error: ShopwareApiError): ShopwareError[] => {
  return error.response?.data?.errors || [];
};

/**
 * Extract message from AxiosError which comes from somewhere else.
 * @param {AxiosError} error
 * @returns {string}
 */
const extractNotApiErrorMessage = (error: AxiosError): ShopwareError[] => [
  {
    detail: error.message,
    status: "",
    code: "",
    title: "",
    meta: {},
    source: {},
  },
];

/**
 * Extracts and create the consistent error object
 * Error message depends on:
 * 1. type of error (API or other network layer)
 * 2. status code
 *
 * @param {ShopwareApiError} error
 * @returns {Promise<ClientApiError>}
 */
export async function errorInterceptor(
  error: ShopwareApiError
): Promise<ClientApiError> {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  const statusCode = extractApiErrorStatusCode(error);
  const clientApiError: ClientApiError = {
    messages: isApiError(statusCode)
      ? extractApiErrorMessage(error)
      : extractNotApiErrorMessage(error),
    statusCode: statusCode,
  };
  return Promise.reject(clientApiError);
}
