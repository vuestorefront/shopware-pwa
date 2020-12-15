import { GluegunToolbox } from "gluegun";
import axios from "axios";

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
      `${shopwareEndpoint}/api/v3/search/sales-channel-domain`,
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
          language: ["id", "name"],
        },
        associations: {
          language: {},
        },
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return fetchDomainsResponse.data.data;
  };

  toolbox.domains.prepareDomainsMap = (domains, pwaHost: string) => {
    let domainsMap = {};
    domains.forEach((domain) => {
      domainsMap[domain.id] = {
        url: toolbox.domains.stripHost(domain.url, pwaHost),
        currencyId: domain.currencyId,
        snippetSetId: domain.snippetSetId,
        languageId: domain.language.id,
        languageName: domain.language.name,
      };
    });

    return domainsMap;
  };

  toolbox.domains.stripTrailingSlash = (host) => {
    return host.replace(/\/$/, "");
  };

  toolbox.domains.stripHost = (absolutePath: string, pwaHost: string) => {
    let path = absolutePath.replace(pwaHost, "");

    return path.indexOf("/") >= 0 ? path : `/${path}`;
  };
};
