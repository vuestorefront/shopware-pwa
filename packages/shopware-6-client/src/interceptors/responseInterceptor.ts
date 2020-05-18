import { update } from "../";
import { AxiosResponse } from "axios";
import { extractContextToken } from "../helpers/context";

export function responseInterceptor(response: AxiosResponse) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const contextToken = extractContextToken(response);
  contextToken && update({ contextToken });
  return response;
}
