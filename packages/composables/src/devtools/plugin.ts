import { setupDevtoolsPlugin, DevtoolsPluginApi } from "@vue/devtools-api";
import { App, InjectionKey, watch } from "vue-demi";

const TIMELINE_EVENT_LAYER_ID = "shopware:events";
const INSPECTOR_ID = "shopware";
export const shopwareSymbol = Symbol("shopware") as InjectionKey<string>;

/* istanbul ignore next */
export function registerShopwareDevtools(
  app: App,
  shopwarePluginInstance: any
) {
  let devtoolsApi: DevtoolsPluginApi<any>;
  let trackId = 0;

  setupDevtoolsPlugin(
    {
      id: "shopware-pwa",
      label: "Shopware PWA",
      logo: "https://shopware.com/media/unknown/2d/80/8c/shopware_signet_blue.svg",
      packageName: "shopware-pwa",
      homepage: "shopware.com",
      app,
      enableEarlyProxy: true,
    },
    (api) => {
      devtoolsApi = api;

      watch(
        () => shopwarePluginInstance.state.sharedStore,
        (v) => {
          // refresh window when the state has changed
          api.sendInspectorState(INSPECTOR_ID);
        },
        { deep: true }
      );

      api.addTimelineLayer({
        id: TIMELINE_EVENT_LAYER_ID,
        label: `Shopware PWA`,
        color: 1613567,
      });

      api.addInspector({
        id: INSPECTOR_ID,
        label: "Shopware PWA",
        icon: "shopping_cart",
      });

      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          payload.rootNodes = [
            {
              id: "shared-state",
              label: "Shared state",
            },
            {
              id: "interceptors",
              label: "Interceptors",
            },
            {
              id: "api-client",
              label: "API client",
            },
            {
              id: "api-defaults",
              label: "API defaults",
            },
          ];
        }
      });

      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          switch (payload.nodeId) {
            case "api-client":
              payload.state = {
                config: payload.app.$shopware.apiInstance.config,
              };
              break;
            case "shared-state":
              payload.state = {
                store:
                  payload.app.$shopware.state.sharedStore ||
                  payload.app.$sharedStore,
              };
              break;
            case "interceptors":
              payload.state = {
                registered: payload.app.$shopware.state.interceptors,
              };
              break;

            case "api-defaults":
              payload.state = payload.app.$shopware.state.shopwareDefaults;
              break;

            default:
              payload.state = {};
              break;
          }
        }
      });
    }
  );

  const devtools = {
    trackEvent: (label: string, params: any) => {
      const groupId = "track" + trackId++;

      // Start
      const log = (label: string, params: any) => {
        devtoolsApi.addTimelineEvent({
          layerId: TIMELINE_EVENT_LAYER_ID,
          event: {
            time: Date.now(),
            data: {
              label,
              params,
            },
            title: label,
            groupId,
          },
        });
      };

      log(label, params);

      return {
        log,
      };
    },
    log: (label: string, params: any) => {
      devtoolsApi.addTimelineEvent({
        layerId: TIMELINE_EVENT_LAYER_ID,
        event: {
          time: Date.now(),
          data: {
            label,
            params,
          },
          title: label,
        },
      });
    },
    warning: (label: string, params: any) => {
      devtoolsApi.addTimelineEvent({
        layerId: TIMELINE_EVENT_LAYER_ID,
        event: {
          time: Date.now(),
          data: {
            label,
            params,
          },
          title: label,
          logType: "warning",
        },
      });
    },
    error: (label: string, params: any) => {
      devtoolsApi.addTimelineEvent({
        layerId: TIMELINE_EVENT_LAYER_ID,
        event: {
          time: Date.now(),
          data: {
            label,
            params,
          },
          title: label,
          logType: "error",
        },
      });
    },
  };

  return devtools;
}
