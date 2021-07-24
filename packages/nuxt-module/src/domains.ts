import path from "path";
import { NuxtModuleOptions, DomainConfig } from "./interfaces";
import { NuxtRouteConfig } from "@nuxt/types/config/router";
import jetpack from "fs-jetpack";
import { ShopwarePwaConfigFile } from "@shopware-pwa/commons";

export async function setupDomains(
  moduleObject: NuxtModuleOptions,
  shopwarePwaConfig: ShopwarePwaConfigFile
) {
  const domainConfigPath = path.join(
    moduleObject.options.rootDir,
    ".shopware-pwa",
    "sw-plugins",
    "domains.json"
  );
  const domainsConfigExists = jetpack.exists(domainConfigPath);
  /* istanbul ignore next */
  if (!domainsConfigExists) {
    // save an empty domains.json for further config.
    /* istanbul ignore next */
    await jetpack.writeAsync(domainConfigPath, "{}");
    /* istanbul ignore next */
    console.warn(
      "[shopware-pwa] Domains config is not initialized properly, please run 'shopware-pwa init' or 'shopware-pwa domains' command again."
    );
  }

  const domainsConfigFile = await jetpack.readAsync(domainConfigPath);

  if (!domainsConfigFile) {
    throw new Error(
      "[shopware-pwa] Domains config is not initialized properly, please run 'shopware-pwa init'"
    );
  }

  let domainsRoutes: NuxtRouteConfig[] = [];
  const domainsEntries: DomainConfig[] = Object.values(
    JSON.parse(domainsConfigFile as string)
  );

  /**
   * if one of children routes has a default name like "" - do not set the name of a parent
   */
  /* istanbul ignore next */
  const dontUseNamedRoute = (route: NuxtRouteConfig) => {
    return route?.children?.find(
      (childRoute: NuxtRouteConfig) => childRoute.path == ""
    );
  };

  /* istanbul ignore next */
  const appendChildrenWithUniqueName = (
    routes: NuxtRouteConfig[],
    parentRoute: any,
    domainId: string
  ): NuxtRouteConfig[] => {
    return routes.map((route) => ({
      ...route,
      name: dontUseNamedRoute(route)
        ? ""
        : `${parentRoute.path}_${
            route.path !== "" ? route.path : "_"
          }_${domainId}`,
      children:
        route.children &&
        appendChildrenWithUniqueName(route.children, route, domainId),
    }));
  };

  /* istanbul ignore next */
  const enrichRoutes = (routes: NuxtRouteConfig[]) => {
    // reverse routes to set the global wildcard /* as a last one in the matching table
    // to match always the custom ones first, the /* should be a path of the last chance (page resolver)
    // flip an array if the first element is wildard for all other routes /*
    if (routes[0]?.name?.startsWith("all")) {
      routes.reverse();
    }

    routes.forEach((route) => {
      // skip route enrichment if there is domainId attached with other configuration
      if (!route.meta?.domainId || !domainsEntries.length) {
        domainsEntries
          .filter(({ url }) =>
            shopwarePwaConfig.shopwareDomainsAllowList?.includes(url)
          )
          .forEach((domainConfig) => {
            const routeName = dontUseNamedRoute(route)
              ? ""
              : `${route.name}_${route.path}_domainId_${domainConfig.domainId}`;
            // create own routes table, based on the nuxt one
            if (
              !domainsRoutes.find((routeData) => routeData.name === routeName)
            ) {
              domainsRoutes.push({
                ...route, // not lose not domain related data
                // TODO: load path configured in page component
                path: `${
                  domainConfig.pathPrefix !== "/" ? domainConfig.pathPrefix : ""
                }${route.path}`, // prefix each route with pathPrefix if available for this domain config
                name: routeName, // add unique name
                meta: domainConfig.pathPrefix !== "/" ? domainConfig : [], // store additional information about the route like language id for corresponding domain - used in middleware and plugin
                children:
                  route.children &&
                  appendChildrenWithUniqueName(
                    route.children,
                    `${domainConfig.domainId}_${route.name}`,
                    domainConfig.domainId
                  ),
              });
            }
          });
      }
    });
    if (domainsRoutes.length) {
      const wildCardIndexFound = domainsRoutes.findIndex((v) => v.path == "/*");
      // force the path of last change to be last one in the routes list
      wildCardIndexFound &&
        domainsRoutes.push(domainsRoutes.splice(wildCardIndexFound, 1)[0]);

      // search for case like /:3000/* and move it to the end of the list
      const paramsIndex = domainsRoutes.findIndex((v) =>
        /\/:.*\/\*/.test(v.path)
      );
      paramsIndex &&
        domainsRoutes.push(domainsRoutes.splice(paramsIndex, 1)[0]);

      routes.splice(0, routes.length, ...domainsRoutes); // force replace the new routes table
    }
  };

  // hook in extendRoutes, when the routes.js and routes.json are being built - enrich them with available domains and corresponding metadata
  /* istanbul ignore next */
  moduleObject.nuxt.hook("build:extendRoutes", (routes: NuxtRouteConfig[]) =>
    /* istanbul ignore next */
    enrichRoutes(routes)
  );
  /* istanbul ignore next */
  moduleObject.addPlugin({
    fileName: "domain.js",
    src: path.join(__dirname, "..", "plugins", "domain.js"),
    options: {
      pwaHost: shopwarePwaConfig.pwaHost,
      shopwareDomainsAllowList: shopwarePwaConfig.shopwareDomainsAllowList,
      fallbackDomain: shopwarePwaConfig.fallbackDomain || "/",
    },
  });

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
  moduleObject.options.router.middleware.push("routing");
}
