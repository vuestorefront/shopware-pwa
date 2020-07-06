import { CmsSlot } from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";

/**
 * @alpha
 */
export function getCmsLinkTarget(content?: CmsSlot): String {
  const inNewTab = content?.data?.newTab;

  return inNewTab ? "_blank" : "_self";
}
