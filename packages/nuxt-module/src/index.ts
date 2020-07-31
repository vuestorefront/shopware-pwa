import { Module } from "@nuxt/types";
/* istanbul ignore next */
import "./interfaces";
import { NuxtModuleOptions } from "./interfaces";
/* istanbul ignore next */
import { runModule } from "./module";

/* istanbul ignore next */
const ShopwarePWAModule: Module<{}> = function (moduleOptions: {}) {
  const moduleObject: NuxtModuleOptions = this as any;
  runModule(moduleObject, moduleOptions);
};

/* istanbul ignore next */
module.exports = ShopwarePWAModule;
