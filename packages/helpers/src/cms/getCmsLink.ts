import { CmsSlot } from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";

/**
 * @alpha
 */
export function getCmsLink(content?: CmsSlot): String {
  return content?.data?.url || "";
}
