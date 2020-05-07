import { GluegunToolbox } from "gluegun";

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
      const nuxtGenerate = `npx --ignore-existing create-nuxt-app --answers "${JSON.stringify(
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
    toolbox.filesystem.remove("pages/index.vue");
    toolbox.filesystem.remove("components/Logo.vue");
    toolbox.filesystem.remove("layouts/default.vue");
  };

  /**
   * Updates package.json with versions.
   * TODO:
   * - uncomment packages which are already published
   * - dynamically get new versions from template
   */
  toolbox.updateNuxtPackageJson = async (canary = false) => {
    const nuxtThemePackage = toolbox.filesystem.read(
      `${toolbox.defaultThemeLocation}/package.json`,
      "json"
    );

    if (!nuxtThemePackage) throw new Error("Theme package not found!");

    await toolbox.patching.update("package.json", (config) => {
      config.scripts.lint = "prettier --write '*.{js,vue}'";

      config["lint-staged"] = {
        "*.{js,vue}": "prettier",
      };
      config["husky"] = {
        hooks: {
          "pre-commit": "lint-staged",
        },
      };
      if (nuxtThemePackage.dependencies) {
        Object.keys(nuxtThemePackage.dependencies).forEach((packageName) => {
          config.dependencies[packageName] =
            nuxtThemePackage.dependencies[packageName];
        });
      }

      if (nuxtThemePackage.devDependencies) {
        Object.keys(nuxtThemePackage.devDependencies).forEach((packageName) => {
          config.devDependencies[packageName] =
            nuxtThemePackage.devDependencies[packageName];
        });
      }

      // update versions to canary
      if (canary) {
        Object.keys(config.dependencies).forEach((dependencyName) => {
          if (dependencyName.includes("@shopware-pwa")) {
            config.dependencies[dependencyName] = "canary";
          }
        });
        Object.keys(config.devDependencies).forEach((dependencyName) => {
          if (dependencyName.includes("@shopware-pwa")) {
            config.dependencies[dependencyName] = "canary";
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
    // Add path import
    const pathImportExist = await toolbox.patching.exists(
      "nuxt.config.js",
      `import path from 'path'`
    );
    if (!pathImportExist) {
      await toolbox.patching.prepend(
        "nuxt.config.js",
        `import path from 'path'\n`
      );
    }
    // Add coreDevelopment flag
    await toolbox.patching.patch("nuxt.config.js", {
      insert: "const coreDevelopment = true\n",
      before: "export default {",
    });
    // Add buildModules
    const VSFbuildModuleExist = await toolbox.patching.exists(
      "nuxt.config.js",
      `'@vue-storefront/nuxt'`
    );
    if (!VSFbuildModuleExist) {
      await toolbox.patching.patch("nuxt.config.js", {
        insert: `
    [
      '@vue-storefront/nuxt',
      {
        coreDevelopment,
        useRawSource: {
          dev: coreDevelopment
            ? [
                '@shopware-pwa/shopware-6-client',
                '@shopware-pwa/composables',
                '@shopware-pwa/helpers',
                '@shopware-pwa/default-theme'
              ]
            : [],
          prod: [
            '@shopware-pwa/shopware-6-client',
            '@shopware-pwa/composables',
            '@shopware-pwa/helpers',
            '@shopware-pwa/default-theme'
          ]
        }
      }
    ],
    '@shopware-pwa/nuxt-module',
    `,
        after: "buildModules: [",
      });
    }
    // Add coreJS
    const coreJSBuildExist = await toolbox.patching.exists(
      "nuxt.config.js",
      `require.resolve('@nuxt/babel-preset-app')`
    );
    if (!coreJSBuildExist) {
      await toolbox.patching.patch("nuxt.config.js", {
        insert: `
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 }
            }
          ]
        ]
      }
    },`,
        after: "build: {",
      });
    }
    // extend webpack
    const webpackConfigExtended = await toolbox.patching.exists(
      "nuxt.config.js",
      `config.resolve.alias['@storefront-ui/vue'] = path.resolve(`
    );
    if (!webpackConfigExtended) {
      await toolbox.patching.patch("nuxt.config.js", {
        insert: `
      config.resolve.alias['@storefront-ui/vue'] = path.resolve(
        'node_modules/@storefront-ui/vue'
      )
      config.resolve.alias['@storefront-ui/shared'] = path.resolve(
        'node_modules/@storefront-ui/shared'
      )
      if (ctx.isClient && !ctx.isDev) {
        config.optimization.splitChunks.cacheGroups.commons.minChunks = 2
      }`,
        after: /extend[ ]?\(config, ctx\)[ ]?{/,
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
    port: 3000,
    host: '0.0.0.0'
  },`,
        after: "mode: 'universal',",
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
  };

  toolbox.copyThemeFolder = async (folderName, destination) => {
    const dest = destination ? destination : folderName;
    await toolbox.filesystem.copyAsync(
      `${toolbox.defaultThemeLocation}/${folderName}`,
      dest,
      { overwrite: true }
    );
  };

  toolbox.watchThemeFolder = (folderName) => {
    const fs = require("fs");
    fs.watch(
      `${toolbox.defaultThemeLocation}/${folderName}`,
      { recursive: true },
      async () => {
        toolbox.print.info(`Reloading [${folderName}] files...`);
        await toolbox.copyThemeFolder(folderName);
      }
    );
  };
};
