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

export interface ShopwareApiClientConfig {
  timeout?: number;
}

export interface ShopwarePwaConfigFile {
  shopwareEndpoint: string;
  shopwareAccessToken: string;
  theme: string;
  defaultLanguageCode?: string;
  shopwareApiClient?: ShopwareApiClientConfig;
  apiDefaults?: {
    [composableName: string]: {
      includes?: Includes;
      associations?: Association[];
    };
  };
}

export default {};
