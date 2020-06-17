import { AxiosResponse } from "axios";
import { extractContextToken } from "../helpers/context";

export function createResponseInterceptor(update: any) {
  return function (response: AxiosResponse) {
    const contextToken = extractContextToken(response);
    contextToken && update({ contextToken });
    return response;
  };
}
