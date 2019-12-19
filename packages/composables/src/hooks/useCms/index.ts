import { ref, Ref, computed } from "@vue/composition-api";
import { getPage } from "@shopware-pwa/shopware-6-client";
import { getStore } from "../..";
import { useCategoryFilters } from '../useCategoryFilters'

export const useCms = (): any => {
  let vuexStore = getStore();
  const error: Ref<any> = ref(null);
  const loading: Ref<boolean> = ref(false);
    const page = computed(() => {
    return vuexStore.getters.getPage;
  });

  const search = async (path: string, params: any) => {
    loading.value = true;
    try {
      const result = await getPage(path, Object.assign({
        configuration: {
          associations: [
            {
              name: "options",
              associations: [
                {
                  name: "group"
                }
              ]
            }
          ]
        }
      }, params));
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
