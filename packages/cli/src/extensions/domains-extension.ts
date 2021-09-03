import { GluegunToolbox } from "gluegun";
import axios from "axios";
const DEFAULT_API_INSTANCE_DOMAINS_SOURCE =
  "https://gist.githubusercontent.com/mkucmus/51aea54148684f886f8ad0649c95dff6/raw/domains.json";

module.exports = (toolbox: GluegunToolbox) => {
  toolbox.domains = {};

  /**
   * Reads snippets from the API
   */
  toolbox.domains.fetchDomainsForSalesChannel = async (
    shopwareEndpoint: string,
    authToken: string,
    salesChannelAccessKey: string
  ) => {
    const fetchDomainsResponse = await axios.post(
      `${toolbox.normalizeBaseUrl(
        shopwareEndpoint
      )}/api/search/sales-channel-domain`,
      {
        filter: [
          {
            type: "equals",
            field: "salesChannel.accessKey",
            value: salesChannelAccessKey,
          },
        ],
        includes: {
          sales_channel_domain: [
            "id",
            "url",
            "language",
            "snippetSetId",
            "currencyId",
          ],
          language: ["id", "name", "locale"],
          locale: ["code"],
        },
        associations: {
          language: {
            associations: {
              locale: {},
            },
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return fetchDomainsResponse?.data?.data;
  };

  toolbox.domains.prepareDomainsMap = (domains) => {
    let domainsMap = {};
    domains.forEach((domain) => {
      const url = new URL(domain.url);
      domainsMap[domain.url] = {
        url: domain.url,
        origin: url.origin,
        host: url.hostname,
        pathPrefix: url.pathname,
        domainId: domain.id,
        currencyId: domain.currencyId,
        snippetSetId: domain.snippetSetId,
        languageId: domain.language.id,
        languageName: domain.language.name,
        languageLabel: domain.language.name,
        languageLocaleCode: domain.language.locale.code,
      };
    });

    return domainsMap;
  };

  toolbox.domains.getDefaultDemoDomainsJson = async () => {
    const defaultDomainsJsonResponse = await axios.get(
      DEFAULT_API_INSTANCE_DOMAINS_SOURCE
    );

    return defaultDomainsJsonResponse.data;
  };
};
