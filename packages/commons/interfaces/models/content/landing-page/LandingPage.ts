import { CmsPage } from "../cms/CmsPage";
import { SeoUrl } from "../navigation/Navigation";

/**
 * @public
 */
export type LandingPage = {
    active: boolean;
    translations: null | unknown;
    cmsPage: null | CmsPage;
    cmsPageId: string;
    name: string;
    metaTitle: null | string;
    metaDescription: null | string;
    keywords: null | string;
    url: string;
    slotConfig: null | unknown[];
    seoUrls: null | SeoUrl[];
    _uniqueIdentifier: string;
    versionId: string;
    translated: {
      [key: string]: string;
    };
    createdAt: string;
    updatedAt: null | string;
    extensions: unknown;
    id: string;
    customFields: null | unknown;
    cmsPageVersionId: string;
    apiAlias: "landing_page";
};
