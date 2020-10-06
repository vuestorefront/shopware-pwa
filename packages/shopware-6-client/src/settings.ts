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
  endpoint: "https://pwa-demo-api.shopware.com",
  accessToken: "SWSC40-LJTNO6COUEN7CJMXKLA",
  contextToken: "",
  languageId: "",
  defaultPaginationLimit: 10,
  timeout: 10000, // ms
};
