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
      devTools: [],
    };
    if (!isNuxtGenerated) {
      const nuxtGenerate = `npx --ignore-existing create-nuxt-app@2.15.0 --answers "${JSON.stringify(
        nuxtAnswers
      ).replace(/"/g, '\\"')}"`;
      await run(nuxtGenerate);
      await toolbox.removeDefaultNuxtFiles();
      spinner.succeed();
    } else {
      spinner.succeed(
        "Preparing Nuxt project: project is already created. Remove `nuxt.config.js` to regenerate whole project."
      );
    }
  };

  /**
   * Remove unnecesarry Nuxt files
   * TODO: check generated files and add here ones which are not necessary
   */
  toolbox.removeDefaultNuxtFiles = async () => {
    toolbox.filesystem.remove(path.join("pages", "index.vue"));
    toolbox.filesystem.remove(path.join("components", "Logo.vue"));
    toolbox.filesystem.remove(path.join("layouts", "default.vue"));
  };

  /**
   * Updates package.json with versions.
   * TODO:
   * - uncomment packages which are already published
   * - dynamically get new versions from template
   */
  toolbox.updateNuxtPackageJson = async (stage) => {
    const nuxtThemePackage = toolbox.filesystem.read(
      path.join(toolbox.defaultThemeLocation, "package.json"),
      "json"
    );

    if (!nuxtThemePackage) throw new Error("Theme package not found!");

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
        after: "mode: 'universal',",
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

    // Add telemetry flag
    const configTelemetryFlag = await toolbox.patching.exists(
      "nuxt.config.js",
      `telemetry:`
    );
    if (!configTelemetryFlag) {
      await toolbox.patching.patch("nuxt.config.js", {
        insert: `
  telemetry: false,`,
        after: "mode: 'universal',",
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

    const isMainScssFileCreated = exists("./assets/scss/main.scss");
    if (!isMainScssFileCreated) {
      await toolbox.template.generate({
        template: "main.scss",
        target: `./assets/scss/main.scss`,
        props: {},
      });
    }

    const isVariablesScssFileCreated = exists("./assets/scss/variables.scss");
    if (!isVariablesScssFileCreated) {
      await toolbox.template.generate({
        template: "variables.scss",
        target: `./assets/scss/variables.scss`,
        props: {},
      });
    }
  };

  toolbox.copyThemeFolder = async (folderName, destination) => {
    const dest = destination ? destination : folderName;
    await toolbox.filesystem.copyAsync(
      path.join(toolbox.defaultThemeLocation, folderName),
      dest,
      { overwrite: true }
    );
  };

  toolbox.watchThemeFolder = (folderName) => {
    const fs = require("fs");
    fs.watch(
      path.join(toolbox.defaultThemeLocation, folderName),
      { recursive: true },
      async () => {
        toolbox.print.info(`Reloading [${folderName}] files...`);
        await toolbox.copyThemeFolder(folderName);
      }
    );
  };
};
