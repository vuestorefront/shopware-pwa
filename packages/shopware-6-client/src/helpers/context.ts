import { AxiosResponse } from "axios";

export function extractContextToken(response: AxiosResponse) {
  return (
    response.data["sw-context-token"] ||
    response.data["contextToken"] ||
    response.headers["sw-context-token"]
  );
}
