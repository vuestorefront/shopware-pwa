import { GluegunToolbox } from "gluegun";

module.exports = {
  name: "settings",
  description: `Provides synchronization of not publicly exposed config into your nuxt.config.js
  
  example of use: shopware-pwa settings
  `,
  run: async (toolbox: GluegunToolbox) => {
    const inputParameters = toolbox.inputParameters;
    Object.assign(inputParameters, toolbox.parameters.options);

    // when --ci parameter is provided, then we skip questions for default values
    const isCIrun = inputParameters.ci;

    if (!isCIrun) {
      toolbox.print.info(`
[CLI > settings] Synchronizing crucial configuration - not exposed via store-api`);

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
        "[CLI > settings] Please provide your admin credentials using the --username and --password options or answering the questions."
      );
      return;
    }

    // Get Auth Token for API
    const authToken = await toolbox.auth.getAuthToken();
    if (!authToken) {
      toolbox.print.error(
        `[CLI > settings] An error occured. Please try again.`
      );
      return -1;
    }

    try {
      const coreRegistrationData = await toolbox.settings.fetchAdminConfigGroup(
        "loginRegistration",
        authToken
      );
      await toolbox.settings.appendNuxtConfig(
        coreRegistrationData,
        "publicRuntimeConfig"
      );
    } catch (error) {
      toolbox.print.error(
        `[CLI > settings] An error occured during synchronizing settings. Please try again or do it manually.`
      );
    }
  },
};
