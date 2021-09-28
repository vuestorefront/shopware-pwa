import { defaultPwaConfigFile } from "@shopware-pwa/commons";

/**
 * @public
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
   * id of current language
   */
  languageId?: string;
}

export const defaultConfig: ClientSettings = {
  endpoint: defaultPwaConfigFile.shopwareEndpoint,
  accessToken: defaultPwaConfigFile.shopwareAccessToken,
  contextToken: "",
  languageId: "",
  defaultPaginationLimit: 10,
  timeout: 10000, // ms
};
