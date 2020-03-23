import { computed, Ref } from "@vue/composition-api";
import { CmsSlot } from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";

export interface UseImageProps {
  getImgUrl: Ref<Readonly<any>>;
  getAlt: Ref<Readonly<any>>;
  getTitle: Ref<Readonly<any>>;
}

export const useImageProps = (content: CmsSlot): UseImageProps => {
  const getImgUrl = computed(() => content?.data?.media?.url);
  const getAlt = computed(() => content?.data?.media?.alt);
  const getTitle = computed(() => content?.data?.media?.title);

  return {
    getImgUrl,
    getAlt,
    getTitle
  };
};
