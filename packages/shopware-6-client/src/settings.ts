/**
 * @beta
 */
export interface ClientSettings {
  endpoint?: string;
  accessToken?: string;
  contextToken?: string;
  defaultPaginationLimit?: number;
  timeout?: number;
  languageId?: string;
}

export const defaultConfig: ClientSettings = {
  endpoint: "https://shopware6-demo.vuestorefront.io",
  accessToken: "SWSCVJJET0RQAXFNBMTDZTV1OQ",
  contextToken: "",
  languageId: "",
  defaultPaginationLimit: 10,
  timeout: 10000, // ms
};
