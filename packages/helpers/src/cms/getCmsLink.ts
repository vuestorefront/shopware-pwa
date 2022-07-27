import { CmsSlot } from "@shopware-pwa/commons";

/**
 * Gets the link of a cms slot
 *
 * @public
 */
export function getCmsLink(
  content?: Omit<CmsSlot, "data"> & { data?: { url?: string } }
): String {
  return content?.data?.url || "";
}
