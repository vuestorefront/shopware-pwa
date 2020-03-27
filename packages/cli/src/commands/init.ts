import { GluegunToolbox } from "gluegun";

module.exports = {
  name: "init",
  alias: ["i"],
  description:
    "Create new Shopware PWA project inside the current directory. Can be invoked multiple times for actualisations.",
  run: async (toolbox: GluegunToolbox) => {
    const {
      system: { run },
      print: { info, warning, success, spin }
    } = toolbox;

    // when --ci parameter is provided, then we skip questions for default values
    const isCIrun = toolbox.parameters.options.ci;

    if (!toolbox.isProduction) {
      warning(`You're running CLI in development mode!`);
    }

    const inputParameters = toolbox.inputParameters;

    if (!isCIrun) {
      const shopwareEndpointQuestion = {
        type: "input",
        name: "shopwareEndpoint",
        message: "Shopware instance address:",
        initial: inputParameters.shopwareEndpoint
      };
      const shopwareAccessTokenQuestion = {
        type: "input",
        name: "shopwareAccessToken",
        message: "Shopware instance access token:",
        initial: inputParameters.shopwareAccessToken
      };
      const shopwareUsernameQuestion = !inputParameters.username && {
        type: "input",
        name: "username",
        message: "Shopware admin username:"
      };
      const shopwarePasswordQuestion = !inputParameters.password && {
        type: "password",
        name: "password",
        message: "Shopware admin password:"
      };

      const answers = await toolbox.prompt.ask([
        shopwareEndpointQuestion,
        shopwareAccessTokenQuestion,
        shopwareUsernameQuestion,
        shopwarePasswordQuestion
      ]);
      Object.assign(inputParameters, answers);
    }

    await toolbox.generateNuxtProject();

    const updateConfigSpinner = spin("Updating configuration");
    // Adding Shopware PWA core dependencies
    await run(`yarn add -D fs-jetpack cookie-universal husky`);
    await run(`yarn add @vue-storefront/nuxt`);
    try {
      // - unlink potential linked locally packages
      await run(`yarn unlink ${toolbox.coreDependencyPackageNames.join(" ")}`);
    } catch (e) {
      // It's just for safety, unlink on fresh project will throw an error so we can catch it here
    }
    // for development run - link local packages
    if (!toolbox.isProduction) {
      await run(`npx yalc add ${toolbox.coreDependencyPackageNames.join(" ")}`);
      await run(`yarn link ${toolbox.coreDependencyPackageNames.join(" ")}`);
    } else {
      // - add dependencies from npm
      await run(`yarn add ${toolbox.coreDependencyPackageNames.join(" ")}`);
    }

    await toolbox.updateNuxtPackageJson();
    await toolbox.updateNuxtConfigFile();
    updateConfigSpinner.succeed();

    const generateFilesSpinner = spin("Generating project files");
    await toolbox.generateTemplateFiles();
    const copyPromisses = toolbox.themeFolders.map(themeFolder =>
      toolbox.copyThemeFolder(themeFolder)
    );
    await Promise.all(copyPromisses);
    generateFilesSpinner.succeed();

    // generate plugin files
    await toolbox.runtime.run(`generate`, inputParameters);

    const updateDependenciesSpinner = spin("Updating dependencies");
    // Loading additional packages
    await run(`npx sort-package-json`);
    await run(`yarn`);
    // await run(`yarn lint`);
    updateDependenciesSpinner.succeed();

    success(`Generated Shopware PWA project!`);
    info(`Type 'shopware-pwa dev' and start exploring`);
  }
};
