import { AxiosResponse } from "axios";
import { extractContextToken } from "../helpers/context";
import { ClientSettings } from "../settings";

export function createResponseInterceptor(
  update: (settings: Partial<ClientSettings>) => void
) {
  return function (response: AxiosResponse) {
    const contextToken = extractContextToken(response);
    contextToken && update({ contextToken });
    return response;
  };
}
