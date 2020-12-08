/**
 * @beta
 */
export interface ClientSettings {
  /**
   * shopware URL
   */
  endpoint?: string;
  /**
   * id specific for each sales channel
   */
  accessToken?: string;
  /**
   * session id (dynamic)
   */
  contextToken?: string;
  /**
   * default amount of products shown on listings
   */
  defaultPaginationLimit?: number;
  /**
   * timeout limit (ms)
   */
  timeout?: number;
  /**
   * credentials for HTTP basic auth
   */
  auth?: {
    username: string;
    password: string;
  };
  /**
   * id of current language
   */
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
