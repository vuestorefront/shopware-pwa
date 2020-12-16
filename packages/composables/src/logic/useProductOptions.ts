import { ref, Ref, computed } from "@vue/composition-api";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { PropertyGroup } from "@shopware-pwa/commons/interfaces/models/content/property/PropertyGroup";
import { useCms } from "@shopware-pwa/composables";
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";
import { ApplicationVueContext, getApplicationContext } from "../appContext";
import { invokePost, endpoints } from "@shopware-pwa/shopware-6-client";
import { getProductUrl } from "@shopware-pwa/helpers";
/**
 * interface for {@link useProductOptions} composable
 * @beta
 */
export interface IUseProductOptions {
  /**
   * Handler for action when the selected option is changed
   */
  handleChange: (attribute: string, option: string) => Promise<void>;
  /**
   * Indicates if the options are being (re)loaded
   */
  isLoadingOptions: Ref<boolean>;
  /**
   * Object of currently selected options
   * e.g. {
   *    color: "red-color-option-id"
   * }
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
export const useProductOptions = (
  rootContext: ApplicationVueContext,
  product: Product
): IUseProductOptions => {
  const { contextName } = getApplicationContext(
    rootContext,
    "useProductOptions"
  );
  const { page } = useCms(rootContext);
  const selected = ref({});
  const isLoadingOptions = ref(!!product.options?.length);

  const findVariantForSelectedOptions = async (options?: {
    [code: string]: string;
  }) => {
    const { apiInstance } = getApplicationContext(
      rootContext,
      "useProductOptions"
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
      if (apiInstance) {
        apiInstance.defaults.headers["sw-include-seo-urls"] = true;
      }
      const response = await invokePost(
        {
          address: endpoints.getProductEndpoint(),
          payload: {
            limit: 10,
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
      return response.data.data[0];
    } catch (e) {
      console.error("SwProductDetails:findVariantForSelectedOptions", e);
    }
  };

  const handleChange = async (
    attribute: string,
    option: string,
    onHandledChange?: Function
  ): Promise<void> => {
    selected.value = Object.assign({}, selected.value, {
      [attribute]: option,
    });
    // look for variant with the selected options
    const variantFound = await findVariantForSelectedOptions();
    if (variantFound) {
      (onHandledChange && onHandledChange()) ||
        rootContext.$router.push(getProductUrl(variantFound));
    } else {
      // if no product was found - reset other options and try to find a first matching product
      const simpleOptionVariant = await findVariantForSelectedOptions({
        option: option,
      });
      if (simpleOptionVariant) {
        (onHandledChange && onHandledChange()) ||
          rootContext.$router.push(getProductUrl(simpleOptionVariant));
      }
    }
  };

  const parentProductId = computed(() => product.parentId);
  const getOptionGroups = computed(() => page.value.configurator || []);

  return {
    handleChange,
    isLoadingOptions,
    getOptionGroups,
    getSelectedOptions: selected,
  };
};
