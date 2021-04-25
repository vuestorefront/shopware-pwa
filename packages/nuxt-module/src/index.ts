import { Module } from "@nuxt/types";
/* istanbul ignore next */
import "./interfaces";
import { NuxtModuleOptions } from "./interfaces";
/* istanbul ignore next */
import { runModule } from "./module";

/* istanbul ignore next */
const ShopwarePWAModule: Module<{}> = async function (moduleOptions: {}) {
  const moduleObject: NuxtModuleOptions = this as any;
  await runModule(moduleObject, moduleOptions);
};

/* istanbul ignore next */
export default ShopwarePWAModule;
