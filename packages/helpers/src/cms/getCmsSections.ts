import {
  CmsPage,
  CmsSection
} from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/cms/CmsPage";

/**
 * @alpha
 */
export function getCmsSections(content: CmsPage): CmsSection[] {
  return content && content.sections ? content.sections : [];
}
