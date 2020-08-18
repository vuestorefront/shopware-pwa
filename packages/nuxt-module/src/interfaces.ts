import { ModuleThis } from "@nuxt/types/config/module";

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

export interface ShopwarePwaConfigFile {
  shopwareEndpoint: string;
  shopwareAccessToken: string;
  defaultLanguageCode?: string;
}

export default {};
