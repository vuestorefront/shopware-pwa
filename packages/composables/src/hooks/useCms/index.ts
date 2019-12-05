import { ref, Ref } from "@vue/composition-api";
import { getPage } from "@shopware-pwa/shopware-6-client";

export const useCms = (): any => {
  const loading: Ref<boolean> = ref(false);
  const page: Ref<any> = ref(null);
  const error: Ref<any> = ref(null);

  const search = async (path: string) => {
    loading.value = true;
    try {
      const result = await getPage(path);
      
      page.value = result;
      return result;
    } catch (e) {
      console.error(e)
      error.value = e;
      console.error("Problem with fetching data", e.message);
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
