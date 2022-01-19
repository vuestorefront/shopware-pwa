import { CmsSlot } from "@shopware-pwa/commons";

/**
 * Gets the link of a cms slot
 *
 * @public
 */
export function getCmsLink(content?: CmsSlot): String {
  return content?.data?.url || "";
}
