import { ref, Ref, computed } from "@vue/composition-api";
import { getPage } from "@shopware-pwa/shopware-6-client";
import { SearchCriteria } from "@shopware-pwa/shopware-6-client/src/interfaces/search/SearchCriteria";
import { getStore } from "../..";
import { parseUrlQuery } from "@shopware-pwa/helpers";

/**
 * @alpha
 */
export const useCms = (): any => {
  let vuexStore = getStore();
  const error: Ref<any> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const page = computed(() => {
    return vuexStore.getters.getPage;
  });

  const search = async (path: string, query?: any) => {
    loading.value = true;

    const searchCriteria: SearchCriteria = parseUrlQuery(query);
    // Temp Maciej solution for associations
    if (!searchCriteria.configuration) searchCriteria.configuration = {};
    if (!searchCriteria.configuration.associations)
      searchCriteria.configuration.associations = [];
    searchCriteria.configuration.associations.push({
      name: "options",
      associations: [
        {
          name: "group"
        }
      ]
    });
    try {
      const result = await getPage(path, searchCriteria);
      vuexStore.commit("SET_PAGE", result);
    } catch (e) {
      error.value = e;
      console.error("Problem with fetching CMS data", e.message);
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  return {
    page,
    loading,
    search,
    error
  };
};
