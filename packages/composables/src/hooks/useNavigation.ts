import Vue from "vue";
import { reactive, computed, ComputedRef } from "@vue/composition-api";
import { getStoreNavigation } from "@shopware-pwa/shopware-6-client";
import {
  StoreNavigationElement,
  StoreNavigationType,
} from "@shopware-pwa/commons/interfaces/models/content/navigation/Navigation";
import { useDefaults, getApplicationContext } from "@shopware-pwa/composables";
import { ApplicationVueContext } from "../appContext";

// we store navigation elements by StoreNavigationType
const sharedNavigation = Vue.observable({
  "main-navigation": [],
  "footer-navigation": [],
  "service-navigation": [],
} as {
  [key in StoreNavigationType]: StoreNavigationElement[];
});

/**
 * interface for {@link useNavigation} composable
 *
 * Provides state for navigation trees depending on navigation type.
 *
 * @beta
 */
export interface IUseNavigation {
  navigationElements: ComputedRef<StoreNavigationElement[]>;
  /**
   * @deprecated use loadNavigationElements instead. Remove after v0.8
   */
  fetchNavigationElements: (depth: number) => Promise<void>;

  /**
   * Load navigation elements
   */
  loadNavigationElements: (params: { depth: number }) => Promise<void>;
}

/**
 * Composable for navigation. Options - {@link IUseNavigation}
 *
 * @example
 * ```
 * // get main navigation
 * useNavigation( root )
 * // get footer navigation
 * useNavigation( root, { type: "footer-navigation" } )
 * ```
 *
 * @beta
 */
export const useNavigation = (
  rootContext: ApplicationVueContext,
  params: {
    type: StoreNavigationType;
  } = {
    type: "main-navigation",
  }
): IUseNavigation => {
  const { apiInstance } = getApplicationContext(rootContext, "useNavigation");

  const { getIncludesConfig, getAssociationsConfig } = useDefaults(
    rootContext,
    "useNavigation"
  );

  const localNavigation = reactive(sharedNavigation);
  const navigationElements = computed(() => localNavigation[params.type]);

  const loadNavigationElements = async ({ depth }: { depth: number }) => {
    sharedNavigation[params.type] = [];
    const navigationResponse = await getStoreNavigation(
      {
        requestActiveId: params.type,
        requestRootId: params.type,
        searchCriteria: {
          configuration: {
            includes: getIncludesConfig(),
            associations: getAssociationsConfig(),
          },
        },
        depth,
      },
      apiInstance
    );

    sharedNavigation[params.type] = navigationResponse || [];
  };

  return {
    navigationElements,
    fetchNavigationElements: (depth: number) =>
      loadNavigationElements({ depth }),
    loadNavigationElements,
  };
};
