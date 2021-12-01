import { getPageResolverEndpoint, getSeoUrlEndpoint } from "../endpoints";
import { defaultInstance, ShopwareApiInstance } from "../apiService";
import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { CmsPageResponse } from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";

/**
 * @throws ClientApiError
 * @public
 */
export async function getCmsPage(
  path: string,
  criteria?: ShopwareSearchParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<CmsPageResponse> {
  const resp = await contextInstance.invoke.post(getPageResolverEndpoint(), {
    path: path,
    ...criteria,
  });

  return resp.data;
}

/**
 * Returns an array of SEO URLs for given entity
 * Can be used for other languages as well by providing the languageId
 *
 * @public
 */
export async function getSeoUrls(
  entityId: string,
  languageId?: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<
  {
    apiAlias: string;
    seoPathInfo: string;
  }[]
> {
  if (languageId) {
    contextInstance.defaults.headers.common["sw-language-id"] = languageId;
  }
  const resp = await contextInstance.invoke.post(getSeoUrlEndpoint(), {
    filter: [
      {
        type: "equals",
        field: "foreignKey",
        value: entityId,
      },
    ],
    includes: {
      seo_url: ["seoPathInfo"],
    },
  });

  return resp.data;
}
