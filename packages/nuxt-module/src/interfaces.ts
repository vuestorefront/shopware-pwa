import { ModuleThis } from "@nuxt/types/config/module";
import { Includes } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { Association } from "@shopware-pwa/commons/interfaces/search/Association";

export interface NuxtModuleOptions extends ModuleThis {
  addLayout: (options: { src: string }, templateName: string) => void;
  addPlugin: (options: {
    src: string;
    fileName: string;
    mode?: string;
    options: {};
  }) => void;
  extendRoutes: (method: Function) => void;
  extendBuild: (method: Function) => void;
  nuxt: any;
}

export interface WebpackConfig {
  resolve: {
    alias: {
      [x: string]: string;
    };
  };
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          minChunks: number;
        };
      };
    };
  };
}

export interface WebpackContext {
  isDev: boolean;
  isServer: boolean;
  isClient: boolean;
  isModern: boolean;
  isLegacy: boolean;
}

/**
 * @beta
 */
export interface ShopwareApiClientConfig {
  /**
   * value of timeout limit for the requests (ms)
   */
  timeout?: number;
  /**
   * credentials for HTTP basic auth
   */
  auth?: {
    username: string;
    password: string;
  };
}

/**
 * @beta
 */
export interface ShopwarePwaConfigFile {
  /**
   * shopware-pwa host URL
   */
  pwaHost?: string;
  /**
   * default domain prefix
   */
  fallbackDomain?: string;
  /**
   * Shopware6 URL
   */
  shopwareEndpoint: string;
  /**
   * id specific for each sales channel
   */
  shopwareAccessToken: string;
  /**
   * theme code: npm package name or local one (directory name)
   */
  theme: string;
  /**
   * default locale used in application
   */
  defaultLanguageCode?: string;
  /**
   * {ShopwareApiClientConfig}
   */
  shopwareApiClient?: ShopwareApiClientConfig;
  /**
   * set of includes, associations depending on use context (see: useDefaults composable)
   */
  apiDefaults?: {
    [composableName: string]: {
      includes?: Includes;
      associations?: Association[];
    };
  };
}

/**
 * @beta
 */
export interface DomainConfig {
  url: string;
  domainId: string;
  currencyId: string;
  snippetSetId: string;
  languageId: string;
  languageName: string;
  languageLocaleCode: string;
}

export default {};
