import { ref, Ref, computed } from "vue-demi";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { PropertyGroup } from "@shopware-pwa/commons/interfaces/models/content/property/PropertyGroup";
import {
  useCms,
  ApplicationVueContext,
  getApplicationContext,
} from "@shopware-pwa/composables";
import {
  invokePost,
  getProductEndpoint,
} from "@shopware-pwa/shopware-6-client";
/**
 * interface for {@link useProductConfigurator} composable
 * @beta
 */
export interface IUseProductConfigurator {
  /**
   * Handler for action when the selected option is changed
   */
  handleChange: (
    attribute: string,
    option: string,
    onChangeHandled?: Function
  ) => Promise<void>;

  findVariantForSelectedOptions: (options?: {
    [key: string]: string;
  }) => Promise<void>;
  /**
   * Indicates if the options are being (re)loaded
   */
  isLoadingOptions: Ref<boolean>;
  /**
   * Object of currently selected options
   */
  getSelectedOptions: Ref<{
    [key: string]: string;
  }>;
  /**
   * All assigned properties which the variant can be made of
   */
  getOptionGroups: Ref<PropertyGroup[]>;
}

/**
 * Product options - {@link IUseAddToCart}
 * @beta
 */
export function useProductConfigurator(
  rootContext: ApplicationVueContext,
  product: Product
): IUseProductConfigurator {
  const { page } = useCms();
  const selected = ref({} as any);
  const isLoadingOptions = ref(!!product.options?.length);
  const parentProductId = computed(() => product.parentId);
  const getOptionGroups = computed(
    () => (page.value as any)?.configurator || []
  );

  const findGroupCodeForOption = (optionId: string) => {
    const group = getOptionGroups.value.find((optionGroup: any) => {
      const optionFound = optionGroup.options.find(
        (option: any) => option.id === optionId
      );
      return !!optionFound;
    });

    return group?.translated?.name;
  };

  // create a group -> optionId map
  product.optionIds?.forEach((optionId) => {
    const optionGroupCode = findGroupCodeForOption(optionId);
    if (optionGroupCode) {
      selected.value[optionGroupCode] = optionId;
    }
  });

  const findVariantForSelectedOptions = async (options?: {
    [code: string]: string;
  }) => {
    const { apiInstance } = getApplicationContext(
      rootContext,
      "useProductConfigurator"
    );
    const filter = [
      {
        type: "equals",
        field: "parentId",
        value: parentProductId.value,
      },
      ...Object.values(options || selected.value).map((id) => ({
        type: "equals",
        field: "optionIds",
        value: id,
      })),
    ];
    try {
      /* istanbul ignore next */
      if (apiInstance) {
        apiInstance.defaults.headers["sw-include-seo-urls"] = true;
      }
      const response = await invokePost(
        {
          address: getProductEndpoint(),
          payload: {
            limit: 1,
            filter,
            includes: {
              product: ["id", "translated", "productNumber", "seoUrls"],
              seo_url: ["seoPathInfo"],
            },
            associations: {
              seoUrls: {},
            },
          },
        },
        apiInstance
      );
      return response?.data?.elements?.[0]; // return first matching product
    } catch (e) {
      console.error("SwProductDetails:findVariantForSelectedOptions", e);
    }
  };

  const handleChange = async (
    group: string,
    option: string,
    onChangeHandled?: Function
  ): Promise<void> => {
    selected.value = Object.assign({}, selected.value, {
      [group]: option,
    });
    if (typeof onChangeHandled === "function") {
      // run passed callback
      await onChangeHandled();
    }
  };

  return {
    handleChange,
    findVariantForSelectedOptions,
    isLoadingOptions,
    getOptionGroups,
    getSelectedOptions: selected,
  };
}
