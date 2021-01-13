import path from "path";
import {
  NuxtModuleOptions,
  ShopwarePwaConfigFile,
  DomainConfig,
} from "./interfaces";
import { NuxtRouteConfig } from "@nuxt/types/config/router";
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
      "[shopware-pwa] Domains config is not initialized properly, please run 'shopware-pwa init'"
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

  if (!domainsConfigFile) {
    throw new Error(
      "[shopware-pwa] Domains config is not initialized properly, please run 'shopware-pwa init'"
    );
  }

  let domainsRoutes: NuxtRouteConfig[] = [];
  const domainsEntries: DomainConfig[] = Object.values(
    JSON.parse(domainsConfigFile as string)
  );

  const appendChildrenWithUniqueName = (routes, parentRoute = "", domainId) => {
    return routes.map((route) => ({
      ...route,
      name: `${parentRoute}_${route.path}_${domainId}`,
      children:
        route.children &&
        appendChildrenWithUniqueName(route.children, route.name, domainId),
    }));
  };

  /* istanbul ignore next */
  const enrichRoutes = (routes: NuxtRouteConfig[]) => {
    // reverse routes to set the global wildcard /* as a last one in the matching table
    // to match always the custom ones first, the /* should be a path of the last chance (page resolver)
    routes.reverse().forEach((route) => {
      // skip route enrichment if there is domainId attached with other configuration
      if (!route.meta?.domainId || !domainsEntries.length) {
        domainsEntries.forEach((domainConfig) => {
          const routeName = `${route.name}_domainId_${domainConfig.domainId}`;
          // create own routes table, based on the nuxt one
          if (
            !domainsRoutes.find((routeData) => routeData.name === routeName)
          ) {
            domainsRoutes.push({
              ...route, // not lose not domain related data
              path: `${domainConfig.url !== "/" ? domainConfig.url : ""}${
                route.path
              }`, // prefix each route with available domain
              name: routeName, // add unique name
              meta: domainConfig, // store additional information about the route like language id for corresponding domain - used in middleware and plugin
              children:
                route.children &&
                appendChildrenWithUniqueName(
                  route.children,
                  routeName,
                  domainConfig.domainId
                ),
            });
          }
        });
      }
    });
    if (domainsRoutes.length) {
      routes.splice(0, routes.length, ...domainsRoutes); // force replace the new routes table
    }
  };

  // hook in extendRoutes, when the routes.js and routes.json are being built - enrich them with available domains and corresponding metadata
  moduleObject.nuxt.hook("build:extendRoutes", (routes: NuxtRouteConfig[]) =>
    enrichRoutes(routes)
  );

  // register middleware programmatically
  /* istanbul ignore next */
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
