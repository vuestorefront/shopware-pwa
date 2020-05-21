import { ModuleThis } from "@nuxt/types/config/module";

export interface NuxtModuleOptions extends ModuleThis {
  options: {
    rootDir: string;
    router: {
      middleware: string[];
    };
  };
  addLayout: (options: { src: string }, templateName: string) => void;
  addPlugin: (options: { src: string; fileName: string; options: {} }) => void;
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
}

export interface ShopwarePwaConfigFile {
  shopwareEndpoint: string;
  shopwareAccessToken: string;
  defaultLanguageCode?: string;
}

export default {};
