import { NuxtModuleOptions } from "./interfaces";

/* istanbul ignore next */
export function invokeBuildLogger(moduleObject: NuxtModuleOptions) {
  if (!process.env.JEST_WORKER_ID) {
    const ua = require("universal-analytics");
    const visitor = ua("UA-167979975-1");
    if (moduleObject.options.dev) {
      visitor.pageview("/dev-app").send();
    } else {
      visitor.pageview("/build-app").send();
    }
  }
}
