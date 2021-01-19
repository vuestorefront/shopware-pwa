import { GluegunToolbox } from "gluegun";

module.exports = {
  name: "domains",
  description: `Provides multi-domain support for Shopware PWA
  
  shopware-pwa domains will fetch the domain configuration from your Shopware Store based on the shopwareAccessKey provided
  within your shopware-pwa.config.js.

  You also need to provide a PWA host in order to resolve the domains correctly. It will strip out the host name from your
  absolute domains, so the application can work with relative paths.

  Eventually, the paths will be stored in you .shopware-pwa/sw-plguins/domains.json file, ready to be parsed.
  `,
  run: async (toolbox: GluegunToolbox) => {
    const inputParameters = toolbox.inputParameters;
    Object.assign(inputParameters, toolbox.parameters.options);

    const path = require("path");
    const shopwarePwaPath = path.join(".shopware-pwa", "sw-plugins");

    // when --ci parameter is provided, then we skip questions for default values
    const isCIrun = inputParameters.ci;

    if (!isCIrun) {
      const shopwareUsernameQuestion = !inputParameters.username && {
        type: "input",
        name: "username",
        message: "Shopware admin username:",
      };

      const shopwarePasswordQuestion = !inputParameters.password && {
        type: "password",
        name: "password",
        message: "Shopware admin password:",
      };

      const shopwarePwaHostQuestions = !inputParameters.pwaHost && {
        type: "input",
        name: "pwaHost",
        message: "Shopware PWA Host (used to resolve the relative domains):",
      };

      const answers = await toolbox.prompt.ask([
        shopwareUsernameQuestion,
        shopwarePasswordQuestion,
        shopwarePwaHostQuestions,
      ]);

      Object.assign(inputParameters, answers);
    }

    const { username, password, pwaHost } = inputParameters;

    if (!username || !password) {
      toolbox.print.error(
        "Please provide your admin credentials using the --username and --password options."
      );
      return;
    }

    // Get Auth Token for API
    let authToken;
    try {
      authToken = await toolbox.fetchPluginsAuthToken(toolbox.inputParameters);
    } catch (error) {
      if (error.response.status === 401) {
        toolbox.print.error("Invalid credentials, aborting domain import.");
        return -1;
      }
      toolbox.print.error(
        `Error during API authentication: ${error.response.status} (${error.response.statusText})`
      );
      return -1;
    }

    const domains = await toolbox.domains.fetchDomainsForSalesChannel(
      inputParameters.shopwareEndpoint,
      authToken,
      inputParameters.shopwareAccessToken
    );

    const domainsMap = toolbox.domains.prepareDomainsMap(
      domains,
      toolbox.domains.stripTrailingSlash(pwaHost)
    );

    let domainsFilePath = path.join(shopwarePwaPath, "domains.json");
    try {
      await toolbox.filesystem.writeAsync(domainsFilePath, domainsMap);
      toolbox.print.success("Shopware domains refreshed");
    } catch (error) {
      toolbox.print.error("Unable to save a domains.json.");
    }
  },
};
