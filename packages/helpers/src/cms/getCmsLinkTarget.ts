import { CmsSlot } from "@shopware-pwa/commons";

/**
 * Return the target attribute for the cms link
 *
 * @public
 */
export function getCmsLinkTarget(
  content?: Omit<CmsSlot, "data"> & {
    data?: { url?: string; newTab?: boolean };
  }
): String {
  const inNewTab = content?.data?.newTab;

  return inNewTab ? "_blank" : "_self";
}
