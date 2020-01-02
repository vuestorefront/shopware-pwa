import {
  CmsPage,
  CmsSection
} from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/cms/CmsPage";

export function getCmsSections(content: CmsPage): CmsSection[] {
  return content && content.sections ? content.sections : [];
}
