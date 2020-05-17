import { GluegunToolbox } from "gluegun";

module.exports = {
  name: "init",
  alias: ["i"],
  description:
    "Create new Shopware PWA project inside the current directory. Can be invoked multiple times for actualisations.",
  run: async (toolbox: GluegunToolbox) => {
    const {
      system: { run },
      print: { info, warning, success, spin },
    } = toolbox;

    const STAGES = {
      STABLE: "latest stable (recommended)",
      CANARY: "canary (current master branch)",
      LOCAL: "local contibution (to contribute locally in shopware-pwa)",
    };

    const inputParameters = toolbox.inputParameters;
    // when --ci parameter is provided, then we skip questions for default values
    const isCIrun = inputParameters.ci;

    if (!toolbox.isProduction) {
      warning(`You're running CLI in development mode!`);
    }

    if (!isCIrun) {
      const shopwareEndpointQuestion = {
        type: "input",
        name: "shopwareEndpoint",
        message: "Shopware instance address:",
        initial: inputParameters.shopwareEndpoint,
      };
      const shopwareAccessTokenQuestion = {
        type: "input",
        name: "shopwareAccessToken",
        message: "Shopware instance access token:",
        initial: inputParameters.shopwareAccessToken,
      };
      const stageQuestion = {
        type: "select",
        name: "stage",
        message: "Which version you'd like to use:",
        choices: Object.values(STAGES),
        initial: inputParameters.stage,
      };

      const answers = await toolbox.prompt.ask([
        shopwareEndpointQuestion,
        shopwareAccessTokenQuestion,
        stageQuestion,
      ]);
      Object.assign(inputParameters, answers);
    }

    await toolbox.generateNuxtProject();

    let stage = inputParameters.stage || STAGES.STABLE;
    if (inputParameters.stage === "canary") stage = STAGES.CANARY;
    if (inputParameters.stage === "local") stage = STAGES.LOCAL;

    const updateConfigSpinner = spin(
      "Updating configuration for option: " + stage
    );

    // Adding Shopware PWA core dependencies
    const corePackages = [
      "@shopware-pwa/composables",
      "@shopware-pwa/helpers",
      "@shopware-pwa/shopware-6-client",
      "@shopware-pwa/default-theme",
      "@shopware-pwa/nuxt-module",
    ];
    const coreDevPackages = ["@shopware-pwa/cli"];

    const npmPackages = ["@vue-storefront/nuxt", "vue-i18n"];

    const npmDevPackages = ["fs-jetpack", "cookie-universal", "husky"];

    try {
      // - unlink potential linked locally packages
      await run(
        `yarn unlink ${corePackages.join(" ")} ${coreDevPackages.join(" ")}`
      );
    } catch (e) {
      // It's just for safety, unlink on fresh project will throw an error so we can catch it here
    }

    switch (stage) {
      case STAGES.CANARY:
        await run(
          `yarn add ${corePackages
            .map((dep) => `${dep}@canary`)
            .join(" ")} ${npmPackages.join(" ")}`
        );
        await run(
          `yarn add -D ${coreDevPackages
            .map((dep) => `${dep}@canary`)
            .join(" ")} ${npmDevPackages.join(" ")}`
        );
        break;
      case STAGES.LOCAL:
        await run(`yarn add ${npmPackages.join(" ")}`);
        await run(`yarn add -D ${npmDevPackages.join(" ")}`);
        await run(`npx yalc add ${corePackages.join(" ")}`);
        await run(`npx yalc add -D ${coreDevPackages.join(" ")}`);
        await run(
          `yarn link ${corePackages.join(" ")} ${coreDevPackages.join(" ")}`
        );
        break;
      case STAGES.STABLE:
      default:
        await run(
          `yarn add ${corePackages
            .map((dep) => `${dep}@latest`)
            .join(" ")} ${npmPackages.join(" ")}`
        );
        await run(
          `yarn add -D ${coreDevPackages
            .map((dep) => `${dep}@latest`)
            .join(" ")} ${npmDevPackages.join(" ")}`
        );
        break;
    }

    await toolbox.updateNuxtPackageJson(stage === STAGES.CANARY);
    await toolbox.updateNuxtConfigFile();
    updateConfigSpinner.succeed();

    const generateFilesSpinner = spin("Generating project files");
    await toolbox.generateTemplateFiles();
    const copyPromisses = toolbox.themeFolders.map((themeFolder) =>
      toolbox.copyThemeFolder(themeFolder)
    );
    await Promise.all(copyPromisses);
    generateFilesSpinner.succeed();

    // generate plugin files
    await toolbox.runtime.run(`plugins`, inputParameters);
    await toolbox.runtime.run(`cms`);
    await toolbox.runtime.run(`languages`, inputParameters);

    const updateDependenciesSpinner = spin("Updating dependencies");
    // Loading additional packages
    await run(`npx sort-package-json`);
    await run(`yarn`);
    // await run(`yarn lint`);
    updateDependenciesSpinner.succeed();

    success(`Generated Shopware PWA project!`);
    info(`Type 'shopware-pwa dev' and start exploring`);
  },
};
