import { AxiosResponse } from "axios";
import { extractContextToken } from "../helpers/context";
import { ClientSettings } from "../settings";

export function createResponseInterceptor(
  update: (
    settings: Partial<ClientSettings>,
    responseConfig: AxiosResponse<any>["config"]
  ) => void
) {
  return function (response: AxiosResponse) {
    const contextToken = extractContextToken(response);
    contextToken && update({ contextToken }, response.config);
    return response;
  };
}
