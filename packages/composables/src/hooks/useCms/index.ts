import { ref, Ref, computed } from "@vue/composition-api";
import { getPage } from "@shopware-pwa/shopware-6-client";
import { SearchCriteria } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { parseUrlQuery } from "@shopware-pwa/helpers";
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";
import { getApplicationContext } from "@shopware-pwa/composables";
import { ApplicationVueContext } from "../../appContext";

/**
 * @alpha
 */
export const useCms = (rootContext: ApplicationVueContext): any => {
  const { vuexStore, apiInstance } = getApplicationContext(
    rootContext,
    "useCms"
  );

  const error: Ref<any> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const page = computed(() => {
    return vuexStore.getters.getPage;
  });
  const categoryId = computed(() => {
    // each cms page is in relation one-to-one with categoryId (resourceIdentifier)
    return page.value && page.value.resourceIdentifier;
  });

  /**
   * @alpha
   */
  const search = async (path: string, query?: any) => {
    loading.value = true;

    const searchCriteria: SearchCriteria = parseUrlQuery(query);
    // Temp Maciej solution for associations
    if (!searchCriteria.configuration) searchCriteria.configuration = {};
    // Temp solution for consistant page size
    // @TODO: https://github.com/DivanteLtd/shopware-pwa/issues/739
    /* istanbul ignore else */
    if (!searchCriteria.pagination || searchCriteria.pagination === "null") {
      searchCriteria.pagination = {};
    }

    /* istanbul ignore else */
    if (!searchCriteria.pagination.limit) {
      searchCriteria.pagination.limit = 10;
    }

    if (!searchCriteria.configuration.associations)
      searchCriteria.configuration.associations = [];
    searchCriteria.configuration.associations.push({
      name: "options",
      associations: [
        {
          name: "group",
        },
      ],
    });

    /* istanbul ignore else */
    if (!searchCriteria.configuration.includes) {
      searchCriteria.configuration.includes = {
        cms_page_slot: [
          "id",
          "type",
          "slot",
          "blockId",
          "data",
          "backgroundMediaMode",
          "backgroundMedia",
        ],
        cms_page_block: [
          "slots",
          "type",
          "id",
          "backgroundMedia",
          "sectionPosition",
        ],
        cms_page_section: [
          "id",
          "backgroundMedia",
          "blocks",
          "type",
          "sizingMode",
        ],
        cms_page: ["id", "name", "sections", "type", "config"],
        product: [
          "name",
          "ratingAverage",
          "calculatedPrice",
          "calculatedPrices",
          "cover",
          "id",
          "translated",
          "options",
        ],
        product_media: ["media"],
        media: ["url"],
        calculated_price: ["unitPrice"],
        product_group_option: ["name", "id", "group", "translated"],
        product_group: ["id", "name", "options", "translated"],
      };
    }

    try {
      const result = await getPage(path, searchCriteria, apiInstance);
      vuexStore.commit("SET_PAGE", result);
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const getBreadcrumbsObject = computed(() => page.value?.breadcrumb || []);

  return {
    page,
    categoryId,
    loading,
    search,
    error,
    getBreadcrumbsObject,
  };
};
