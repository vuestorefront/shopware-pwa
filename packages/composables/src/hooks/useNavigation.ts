import { computed, ComputedRef } from "vue-demi";
import { getStoreNavigation } from "@shopware-pwa/shopware-6-client";
import {
  StoreNavigationElement,
  StoreNavigationType,
} from "@shopware-pwa/commons/interfaces";
import {
  useDefaults,
  getApplicationContext,
  useSharedState,
} from "@shopware-pwa/composables";

/**
 * interface for {@link useNavigation} composable
 *
 * Provides state for navigation trees depending on navigation type.
 *
 * @beta
 */
export interface IUseNavigation {
  navigationElements: ComputedRef<StoreNavigationElement[] | null>;

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
 * useNavigation()
 * // get footer navigation
 * useNavigation({ type: "footer-navigation" } )
 * ```
 *
 * @beta
 */
export function useNavigation(params?: {
  type?: StoreNavigationType;
}): IUseNavigation {
  const COMPOSABLE_NAME = "useNavigation";
  const contextName = COMPOSABLE_NAME;

  const type = params?.type || "main-navigation";

  const { apiInstance } = getApplicationContext({ contextName });
  const { sharedRef } = useSharedState();

  const { getIncludesConfig, getAssociationsConfig } = useDefaults({
    defaultsKey: contextName,
  });

  const sharedElements = sharedRef<StoreNavigationElement[]>(
    `useNavigation-${type}`
  );
  const navigationElements = computed(() => sharedElements.value);

  const loadNavigationElements = async ({ depth }: { depth: number }) => {
    try {
      const navigationResponse = await getStoreNavigation(
        {
          requestActiveId: type,
          requestRootId: type,
          searchCriteria: {
            includes: getIncludesConfig(),
            associations: getAssociationsConfig(),
          },
          depth,
        },
        apiInstance
      );

      sharedElements.value = navigationResponse || [];
    } catch (e) {
      sharedElements.value = [];
      console.error("[useNavigation][loadNavigationElements]", e.messages);
    }
  };

  return {
    navigationElements,
    loadNavigationElements,
  };
}
