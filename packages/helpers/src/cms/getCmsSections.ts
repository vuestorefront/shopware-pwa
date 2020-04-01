import {
  CmsPage,
  CmsSection,
} from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";

/**
 * @alpha
 */
export function getCmsSections(content: CmsPage): CmsSection[] {
  return content?.sections || [];
}
