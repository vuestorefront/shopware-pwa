import { computed, Ref } from "@vue/composition-api";
import { CmsSlot } from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";

/**
 * @alpha
 */
export interface UseImageProps {
  getImgUrl: Ref<Readonly<any>>;
  getAlt: Ref<Readonly<any>>;
  getTitle: Ref<Readonly<any>>;
}

/**
 * @alpha
 */
export const useImageProps = (content: CmsSlot | undefined): UseImageProps => {
  const getImgUrl = computed(() => {
    const imgUrl = content?.data?.media?.url;
    return imgUrl || "";
  });
  const getAlt = computed(() => {
    const alt = content?.data?.media?.alt;
    return alt || "";
  });
  const getTitle = computed(() => {
    const title = content?.data?.media?.title;
    return title || "";
  });

  return {
    getImgUrl,
    getAlt,
    getTitle,
  };
};
