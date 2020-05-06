import { update } from "../";
import { AxiosResponse } from "axios";

export function responseInterceptor(response: AxiosResponse) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const contextToken =
    response.data["contextToken"] || response.headers["sw-context-token"];
  contextToken && update({ contextToken });
  return response;
}
