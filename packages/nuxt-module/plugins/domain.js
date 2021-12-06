import Middleware from "./middleware";
import { computed, effectScope } from "vue-demi";
import {
  useSessionContext,
  useSharedState,
  extendScopeContext,
} from "@shopware-pwa/composables";
const FALLBACK_DOMAIN = "<%= options.fallbackDomain %>" || "/";
const FALLBACK_LOCALE = "<%= options.fallbackLocale %>";
const SHOPWARE_DOMAINS_ALLOW_LIST = "<%= options.shopwareDomainsAllowList %>";
const domainsAllowListArray = SHOPWARE_DOMAINS_ALLOW_LIST?.split(",") || [];
const domains = require("sw-plugins/domains");
const domainsList = Object.values(domains).filter(
  ({ url }) => domainsAllowListArray.includes(url) // TODO: possibly problematic with prefix paths
);

// register domains based routing and configuration
export default async ({ app, route, req }, inject) => {
  const scope = effectScope();
  extendScopeContext(scope, app);

  await scope.run(async () => {
    const { sharedRef } = useSharedState();
    const { setCurrency } = useSessionContext();

    const currentDomainData = sharedRef("sw-current-domain");

    const routeDomainUrl = computed(() => route.meta?.[0]?.pathPrefix);
    const routeDomain = computed(() =>
      Object.values(domainsList).find(
        (domain) => domain.pathPrefix === routeDomainUrl.value
      )
    );

    const getCurrentDomain = computed(
      () => currentDomainData.value || routeDomain.value
    );

    const getNormalizedDomainPath = computed(() =>
      getCurrentDomain.value && getCurrentDomain.value?.url !== "/"
        ? getCurrentDomain.value?.pathPrefix
        : ""
    );

    const getDomainConfigFromRequest = (req) => {
      let hostname;
      let pathname;

      if (process.client) {
        hostname = window.location.hostname;
        pathname = window.location.pathname;
      } else if (!process.static) {
        const detectedHost =
          req.headers["x-forwarded-host"] || req.headers.host;
        hostname = Array.isArray(detectedHost) ? detectedHost[0] : detectedHost;
        hostname = hostname?.split(":")?.[0]; // remove port
        pathname = req.originalUrl;
      }

      if (hostname) {
        // first check the domains with prefix path as they are more specific than ones with just a hostname
        let matchingDomainConfig = domainsList
          .filter((domain) => domain.pathPrefix !== "/")
          .find((domain) => {
            const pathnameWithTrailingSlash = pathname + "/";
            /* add trailing slash also to the comparison to be completely safe
             * example: pathPrefix "/en" would otherwise also match /endless
             */
            const pathPrefixPartOfPathname =
              pathnameWithTrailingSlash.startsWith(domain.pathPrefix + "/");
            return pathPrefixPartOfPathname && domain.host === hostname;
          });

        if (matchingDomainConfig) return matchingDomainConfig;
        // if there wasn't a match already, check the domains that only have a hostname
        matchingDomainConfig = domainsList
          .filter((domain) => domain.pathPrefix === "/")
          .find((domain) => {
            return domain.host === hostname;
          });

        if (matchingDomainConfig) return matchingDomainConfig;

        console.error(
          `[Error][Shopware PWA] There is no domain configuration for ${hostname} - add this host to config and run domains configuration. (https://shopware-pwa-docs.vuestorefront.io/landing/cookbook/#how-to-add-another-language)`,
          domainsList
        );
      }
    };

    const routing = {
      // list of available domains from "domains.json" - output of "domains" CLI command
      availableDomains: (domainsList && Object.values(domainsList)) || [],
      fallbackDomain: FALLBACK_DOMAIN,
      fallbackLocale: FALLBACK_LOCALE,
      // set current domain's configuration
      setCurrentDomain: (domainData) => {
        currentDomainData.value = domainData;
      },
      // get current domain's configuration
      getCurrentDomain,
      // get route for current domain
      getUrl: (path) => {
        if (!path) {
          return "";
        }
        return getNormalizedDomainPath.value
          ? `${getNormalizedDomainPath.value}${path}`.replace(/^\/\/+/, "/")
          : path;
      },
      // get absolute url for current domain
      getAbsoluteUrl: (path) => {
        return `${currentDomainData.value?.url || ""}${path}`;
      },
    };

    const currentDomainConfig = getDomainConfigFromRequest(req);
    currentDomainConfig && routing.setCurrentDomain(currentDomainConfig);

    // public plugin within the context
    app.routing = routing;
    inject("routing", routing);

    // middleware to set languageId & currencyId for api client and i18n plugin
    Middleware.routing = function ({ isHMR, app, from, route }) {
      if (isHMR) {
        return;
      }

      /**
       * If the origin gets changed, this is always a initial request to the server.
       * The currentDomain then is already set correctly by the plugin (see line 117).
       *
       * If the prefixPath gets changed, the corresponding domain-config can be detected from the route.
       * The detected domain config from the new route has to be compared with the current one, if they don't match, the
       * current domain config has to be changed to the config detected from the route
       *
       * Edgecase that is currently not supported: domains with the same prefixPath on different origins, because during route-building,
       * only the domainConfig from the last origin gets added to the meta-object
       */

      const hasPrefixPath = (domainConfig) => {
        if (!domainConfig) return false;

        return domainConfig?.pathPrefix !== "/";
      };

      // a route can have multiple metadata objects inside - find the one with domainId - it comes from compiled routes (domains nuxt-module)
      let domainConfig =
        Array.isArray(route.meta) && route.meta.find((data) => !!data.domainId);

      /* For pages that don't have a prefix path, the domainConfig has to be determined separately,
       * because every nuxt route has the same path (e.g. TLD.de/search and TLD.com/search)
       * The nuxt-router always picks the first route that matches the new path, so for these pages the
       * domainConfig attached to the route doesn't have to be the right one.
       */
      if (!hasPrefixPath(domainConfig)) {
        if (process.client) {
          // During client-side navigation the domain config can be manually loaded through the location origin.
          const currentOrigin = location.origin;
          domainConfig = app.routing.availableDomains.find(
            (domain) =>
              domain.origin === currentOrigin && !hasPrefixPath(domain)
          );
        } else {
          // Server-side, the currentDomain then is already set correctly by the plugin (see line 117).
          domainConfig = app.routing.getCurrentDomain.value;
        }
      }

      /*
       * The following block is important for this case: switch from a domainConfig without prefixPath to a domainConfig
       * with prefixPath, e.g. TLD.com/search to TLD.com/de/search
       */
      let fromDomainConfig = from?.meta.find(
        (metaEntry) => !!metaEntry.domainId
      );
      /* Same cause as in the above block:
       * the fromDomainConfig has to be determined separately for routes with a domainConfig without prefixPath
       */
      if (!hasPrefixPath(fromDomainConfig)) {
        if (process.client) {
          // During client-side navigation the domain config can be manually loaded through the location origin,
          // because the origin is still the same
          const currentOrigin = location.origin;
          fromDomainConfig = app.routing.availableDomains.find(
            (domain) =>
              domain.origin === currentOrigin && !hasPrefixPath(domain)
          );
        }
        // Note: There is no need to determine the fromDomainConfig on the server side request, so there is no else-case here
        // This is because on the initial request the following has to run nevertheless
      }

      if (!domainConfig) {
        return;
      }

      if (
        domainConfig &&
        domainConfig.domainId !== fromDomainConfig?.domainId
      ) {
        /*
         This only runs:
          - on initial request on the server (also change of origin)
          - on change of prefixPath
         */

        const { languageId, languageLocaleCode, currencyId } = domainConfig;
        app.routing.setCurrentDomain(domainConfig);
        // to work on the old structure
        languageId &&
          app.$shopwareApiInstance &&
          app.$shopwareApiInstance.update({
            languageId,
          });
        languageId &&
          app.$shopware &&
          app.$shopware.apiInstance.update({ languageId });
        app.i18n.locale = languageLocaleCode;
        const currencyPromise = setCurrency({ id: currencyId });
        Promise.all([currencyPromise]).catch((e) => {
          console.error("[MIDDLEWARE][DOMAINS]", e);
        });
      }
    };
  });

  scope.stop();
};
