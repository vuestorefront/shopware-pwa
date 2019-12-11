import { CmsPage, CmsSection } from "@shopware-pwa/shopware-6-client";

export function getCmsSections(content: CmsPage): CmsSection[] {
  return content && content.sections ? content.sections : [];
}
