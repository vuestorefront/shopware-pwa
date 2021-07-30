import { GluegunToolbox } from "gluegun";

module.exports = {
  name: "domains",
  description: `Provides multi-domain support for Shopware PWA
  
  shopware-pwa domains will fetch the domain configuration from your Shopware Store based on the shopwareAccessKey provided
  within your shopware-pwa.config.js.

  Eventually, the configuration will be stored in you .shopware-pwa/sw-plguins/domains.json file, ready to be parsed.
  `,
  run: async (toolbox: GluegunToolbox) => {
    const inputParameters = toolbox.inputParameters;
    Object.assign(inputParameters, toolbox.parameters.options);

    const path = require("path");
    const shopwarePwaPath = path.join(".shopware-pwa", "sw-plugins");

    // when --ci parameter is provided, then we skip questions for default values
    const isCIrun = inputParameters.ci;

    if (!isCIrun) {
      toolbox.print.info(`
Synchronize the domain's related config from backend (in order to build a domains.json file)`);

      const shopwareUsernameQuestion = !inputParameters.username && {
        type: "input",
        name: "username",
        message: "Shopware admin username:",
        initial: process.env.ADMIN_USER,
        footer: process.env.ADMIN_USER && "username is taken from .env",
      };

      const shopwarePasswordQuestion = !inputParameters.password && {
        type: "password",
        name: "password",
        message: "Shopware admin password:",
        initial: process.env.ADMIN_PASSWORD,
        footer: process.env.ADMIN_PASSWORD && "password from .env is hidden",
      };

      const answers = await toolbox.prompt.ask([
        shopwareUsernameQuestion,
        shopwarePasswordQuestion,
      ]);

      Object.assign(inputParameters, answers);
    }

    const { username, password } = inputParameters;

    if ((!username || !password) && !toolbox.isDefaultDemoData()) {
      toolbox.print.error(
        "Please provide your admin credentials using the --username and --password options or answering the questions."
      );
      return;
    }

    // Get Auth Token for API
    const authToken = await toolbox.auth.getAuthToken();
    if (!authToken) {
      toolbox.print.error(
        `Please try again. This synchronization is required.`
      );
      return -1;
    }

    let domainsMap = {};

    try {
      const domains = await toolbox.domains.fetchDomainsForSalesChannel(
        inputParameters.shopwareEndpoint,
        authToken,
        inputParameters.shopwareAccessToken
      );

      domainsMap = toolbox.domains.prepareDomainsMap(domains);
    } catch (error) {
      if (!toolbox.isDefaultDemoData()) {
        console.error(error);
      }
    }

    let domainsFilePath = path.join(shopwarePwaPath, "domains.json");
    try {
      // if the provided pwaHost value equals the default shopware api instance (fallback) and the domains are still blank - load default domains.json file from gist.
      if (!Object.keys(domainsMap).length && toolbox.isDefaultDemoData()) {
        toolbox.print.warning("Loading default domains.json file.");
        const defaultDomainsMap =
          await toolbox.domains.getDefaultDemoDomainsJson();
        if (defaultDomainsMap) {
          domainsMap = defaultDomainsMap;
        }
      }
      await toolbox.filesystem.writeAsync(domainsFilePath, domainsMap);
      toolbox.print.success("Shopware domains refreshed");
    } catch (error) {
      toolbox.print.error("Unable to save a domains.json.");
      console.error(error);
    }
  },
};
