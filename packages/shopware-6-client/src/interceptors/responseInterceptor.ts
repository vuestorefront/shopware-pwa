import { update } from "../";
import { AxiosResponse } from "axios";

export function responseInterceptor(response: AxiosResponse) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const contextToken =
    response.data["sw-context-token"] || response.headers["sw-context-token"];
  update({ contextToken });
  return response;
}
