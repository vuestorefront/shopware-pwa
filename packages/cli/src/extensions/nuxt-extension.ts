import { GluegunToolbox } from "gluegun";
import { STAGES } from "../stages";
const path = require("path");

module.exports = (toolbox: GluegunToolbox) => {
  const {
    system: { run },
    print: { spin },
    filesystem: { exists },
  } = toolbox;

  /**
   * Generates new project using `create-nuxt-app`.
   * Not invoked if nuxt.config.js file already exist.
   * TODO:
   * - provide force flag
   * - provide params, which can be used in answers JSON
   */
  toolbox.generateNuxtProject = async () => {
    const spinner = spin("Preparing Nuxt project");
    const isNuxtGenerated = exists("nuxt.config.js");
    const nuxtAnswers = {
      name: "shopware-pwa-project",
      description: "shopware-pwa-project description",
      author: "Vue Storefront",
      pm: "yarn",
      ui: "none",
      language: "js",
      server: "none",
      features: ["axios", "pwa"],
      linter: ["prettier", "lintStaged"],
      test: "jest",
      mode: "universal",
      target: "server",
      devTools: [],
      gitUsername: "",
      ci: "none",
    };
    if (!isNuxtGenerated) {
      const nuxtGenerate = `npx --ignore-existing create-nuxt-app@3.2.0 --answers "${JSON.stringify(
        nuxtAnswers
      ).replace(/"/g, '\\"')}"`;
      await run(nuxtGenerate);
      await toolbox.removeDefaultNuxtFiles();
      spinner.succeed();
      return true;
    } else {
      spinner.succeed(
        "Preparing Nuxt project: project is already created. Remove `nuxt.config.js` to regenerate whole project."
      );
      return false;
    }
  };

  /**
   * Remove unnecessary Nuxt files
   * TODO: check generated files and add here ones which are not necessary
   */
  toolbox.removeDefaultNuxtFiles = async () => {
    return Promise.all([
      toolbox.filesystem.removeAsync(path.join("pages", "index.vue")),
      toolbox.filesystem.removeAsync(path.join("components", "Logo.vue")),
      toolbox.filesystem.removeAsync(path.join("layouts", "default.vue")),
    ]);
  };

  /**
   * Change structure of project, by moving all Nuxt related folders to `src`
   */
  toolbox.moveDefaultNuxtFoldersToSrc = async (
    newProjectGenerated: boolean
  ) => {
    const foldersToMove = [
      "assets",
      "components",
      "layouts",
      "middleware",
      "pages",
      "plugins",
      "static",
      "store",
    ];
    return Promise.all(
      foldersToMove.map(async (folderName: string) => {
        const destinationDirectory: string = path.join("src", folderName);
        const existSrc = await toolbox.filesystem.existsAsync(folderName);
        const existDestination = await toolbox.filesystem.existsAsync(
          destinationDirectory
        );
        if (existSrc && !existDestination) {
          await toolbox.filesystem.moveAsync(folderName, destinationDirectory);
          if (!newProjectGenerated) {
            toolbox.print.success(
              `Directory "${folderName}" has been migrated to "${destinationDirectory}"`
            );
          }
        } else if (existSrc && existDestination) {
          toolbox.print.error(
            `Couldn't automatically migrate directory "${folderName}" to "${destinationDirectory}". Please do manual migration and remove ${folderName} from the root directory.`
          );
        }
      })
    );
  };

  /**
   * Updates package.json with versions.
   * TODO:
   * - uncomment packages which are already published
   * - dynamically get new versions from template
   */
  toolbox.updateNuxtPackageJson = async (stage) => {
    await toolbox.patching.update("package.json", (config) => {
      config.scripts.lint = "prettier --write '*.{js,vue}'";
      config.scripts.dev = "shopware-pwa dev";
      config.scripts.build = "shopware-pwa build";

      // update versions to canary
      if (stage === STAGES.CANARY) {
        Object.keys(config.dependencies).forEach((dependencyName) => {
          if (dependencyName.includes("@shopware-pwa")) {
            config.dependencies[dependencyName] = "canary";
          }
        });
        Object.keys(config.devDependencies).forEach((dependencyName) => {
          if (dependencyName.includes("@shopware-pwa")) {
            config.devDependencies[dependencyName] = "canary";
          }
        });
      }

      delete config.engines;
      return config;
    });
  };

  /**
   * Updates nuxt.config.js with configuration for Shopwre PWA
   */
  toolbox.updateNuxtConfigFile = async () => {
    // Add buildModules
    const VSFbuildModuleExist = await toolbox.patching.exists(
      "nuxt.config.js",
      `'@shopware-pwa/nuxt-module'`
    );
    if (!VSFbuildModuleExist) {
      await toolbox.patching.patch("nuxt.config.js", {
        insert: `
    '@shopware-pwa/nuxt-module',
    `,
        after: "buildModules: [",
      });
    }

    // Add server to 0.0.0.0
    const serverSectionExist = await toolbox.patching.exists(
      "nuxt.config.js",
      `server: {`
    );
    if (!serverSectionExist) {
      await toolbox.patching.patch("nuxt.config.js", {
        insert: `
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0'
  },`,
        after: "export default {",
      });
    }

    // Add shopware-pwa meta tag
    const headSectionExist = await toolbox.patching.exists(
      "nuxt.config.js",
      `head: {`
    );
    if (headSectionExist) {
      await toolbox.patching.patch("nuxt.config.js", {
        insert: `\n { hid: 'project-type', name: 'project-type', content: 'shopware-pwa' },`,
        after: "meta: [",
      });
    }

    // Add global SCSS file to config
    const isGlobalScssFileAdded = await toolbox.patching.exists(
      "nuxt.config.js",
      `~assets/scss/main.scss`
    );
    if (!isGlobalScssFileAdded) {
      await toolbox.patching.patch("nuxt.config.js", {
        insert: `
    '~assets/scss/main.scss',`,
        after: "css: [",
      });
    }

    // ignore .yalc
    const yalcIgnoreExist = await toolbox.patching.exists(
      ".gitignore",
      `.yalc`
    );
    if (!yalcIgnoreExist) {
      await toolbox.patching.append(".gitignore", ".yalc\nyalc.lock\n");
    }
    const swPluginsIgnoreExist = await toolbox.patching.exists(
      ".gitignore",
      `.shopware-pwa`
    );
    if (!swPluginsIgnoreExist) {
      await toolbox.patching.append(".gitignore", ".shopware-pwa\n");
    }

    // Ignore rootDirectory static folder: https://github.com/DivanteLtd/shopware-pwa/issues/1047
    const rootStaticDirectoryIgnored = await toolbox.patching.exists(
      ".gitignore",
      `/static`
    );
    if (!rootStaticDirectoryIgnored) {
      await toolbox.patching.append(".gitignore", "/static");
    }

    // Add telemetry flag
    const configTelemetryFlag = await toolbox.patching.exists(
      "nuxt.config.js",
      `telemetry:`
    );
    if (!configTelemetryFlag) {
      await toolbox.patching.patch("nuxt.config.js", {
        insert: `
  telemetry: false,`,
        after: "export default {",
      });
    }
  };

  /**
   * Generates template files using ejs.
   * - api-client.js
   */
  toolbox.generateTemplateFiles = async (
    { shopwareEndpoint, shopwareAccessToken } = toolbox.inputParameters
  ) => {
    const isConfigGenerated = exists("shopware-pwa.config.js");
    if (!isConfigGenerated) {
      await toolbox.template.generate({
        template: "shopware-pwa.config.js",
        target: `shopware-pwa.config.js`,
        props: {
          shopwareEndpoint,
          shopwareAccessToken,
        },
      });
    }

    const isDockerfileGenerated = exists("Dockerfile");
    if (!isDockerfileGenerated) {
      await toolbox.template.generate({
        template: "Dockerfile",
        target: `Dockerfile`,
        props: {},
      });
    }

    const isMainScssFileCreated = exists("./src/assets/scss/main.scss");
    if (!isMainScssFileCreated) {
      await toolbox.template.generate({
        template: "main.scss",
        target: `./src/assets/scss/main.scss`,
        props: {},
      });
    }

    const isVariablesScssFileCreated = exists(
      "./src/assets/scss/variables.scss"
    );
    if (!isVariablesScssFileCreated) {
      await toolbox.template.generate({
        template: "variables.scss",
        target: `./src/assets/scss/variables.scss`,
        props: {},
      });
    }
  };

  toolbox.copyThemeFolder = async (folderName, destination) => {
    const dest = destination ? destination : folderName;
    const destinationExist = toolbox.filesystem.existsAsync(dest);
    if (destinationExist) return;
    return toolbox.filesystem.copyAsync(
      path.join(toolbox.getThemePath(), folderName),
      dest,
      { overwrite: true }
    );
  };
};
