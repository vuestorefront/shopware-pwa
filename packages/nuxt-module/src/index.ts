import { Module } from "@nuxt/types";
import * as Interfaces from "./interfaces";
/* istanbul ignore next */
import { runModule } from "./module";

/* istanbul ignore next */
const ShopwarePWAModule: Module<{}> = function(moduleOptions: {}) {
  const moduleObject: Interfaces.NuxtModuleOptions = this as any;
  runModule(moduleObject, moduleOptions);
};

/* istanbul ignore next */
export default ShopwarePWAModule;
