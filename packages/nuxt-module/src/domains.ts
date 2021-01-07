import path from "path";
import { NuxtModuleOptions, ShopwarePwaConfigFile } from "./interfaces";
import jetpack from "fs-jetpack";

export async function setupDomains(
  moduleObject: NuxtModuleOptions,
  shopwarePwaConfig: ShopwarePwaConfigFile | undefined
) {
  const domainsConfigExists = jetpack.exists(
    path.join(
      moduleObject.options.rootDir,
      ".shopware-pwa",
      "sw-plugins",
      "domains.json"
    )
  );
  if (!domainsConfigExists) {
    throw new Error(
      "[shopware-pwa] domains config is not initialized properly, please run 'shopware-pwa init'"
    );
  }

  const domainsConfigFile = await jetpack.readAsync(
    path.join(
      moduleObject.options.rootDir,
      ".shopware-pwa",
      "sw-plugins",
      "domains.json"
    )
  );
  let domainsRoutes = [];
  const domainsEntries = Object.entries(JSON.parse(domainsConfigFile));

  moduleObject.nuxt.hook("build:extendRoutes", (routes) => {
    routes.forEach((route) => {
      if (!route.meta?.domainId) {
        const [domain1, domainData1] = domainsEntries[1];
        const [domain2, domainData2] = domainsEntries[2];
        console.warn("typeof", typeof domainData1);
        domainsRoutes.push({
          ...route,
          path: `${domain1}${route.path}`,
          alias: undefined,
          name: route.name + "1",
          meta: domainData1,
        });

        domainsRoutes.push({
          ...route,
          path: `${domain2}${route.path}`,
          alias: undefined,
          name: route.name + "2",
          meta: domainData2,
        });
      }
    });
    console.warn("domainsRoutes", domainsRoutes);
    if (domainsRoutes.length) {
      routes.splice(0, routes.length, ...domainsRoutes);
    }
  });

  moduleObject.options.router.middleware =
    moduleObject.options.router.middleware || [];
  /* istanbul ignore next */
  if (typeof moduleObject?.options?.router?.middleware === "string") {
    moduleObject.options.router.middleware = [
      moduleObject.options.router.middleware,
    ];
  }
  moduleObject.options.router.middleware.push("domainsRouting");
}
