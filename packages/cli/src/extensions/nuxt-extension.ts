import { GluegunToolbox } from "gluegun";

module.exports = (toolbox: GluegunToolbox) => {
  const {
    system: { run },
    print: { spin },
    filesystem: { exists }
  } = toolbox;

  /**
   * Generates new project using `create-nuxt-app`.
   * Not invoked if nuxt.config.js file already exist.
   * TODO:
   * - provide force flag
   * - provide params, which can be used in answers JSON
   */
  toolbox.generateNuxtProject = async () => {
    const isNuxtGenerated = exists("nuxt.config.js");
    if (!isNuxtGenerated) {
      const spinner = spin("Preparing Nuxt project");
      const nuxtGenerate = `npx create-nuxt-app --answers '
    {
      "name": "shopware-pwa-project",
      "description": "shopware-pwa-project description",
      "author": "VueStorefront",
      "pm": "yarn",
      "ui": "none",
      "server": "none",
      "features": [
        "axios",
        "pwa"
      ],
      "linter": [
        "prettier",
        "lintStaged"
      ],
      "test": "jest",
      "mode": "universal",
      "devTools": []
    }
    '`;
      await run(nuxtGenerate);
      spinner.succeed("Nuxt project prepared");
    }
  };

  /**
   * Remove unnecesarry Nuxt files
   * TODO: check generated files and add here ones which are not necessary
   */
  toolbox.removeDefaultNuxtFiles = async () => {
    toolbox.filesystem.remove("pages/index.vue");
  };

  /**
   * Updates package.json with versions.
   * TODO:
   * - uncomment packages which are already published
   * - dynamically get new versions from template
   */
  toolbox.updateNuxtPackageJson = async () => {
    await toolbox.patching.update("package.json", config => {
      // dependencies
      // config.dependencies["@shopware-pwa/composables"] = "^0.1.0";
      // config.dependencies["@shopware-pwa/helpers"] = "^0.1.0";
      config.dependencies["@shopware-pwa/shopware-6-client"] =
        "^0.1.0-prealpha.0";
      config.dependencies["@storefront-ui/vue"] = "^0.4.0";
      config.dependencies["@vuelidate/core"] = "^2.0.0-alpha.0";
      config.dependencies["@vuelidate/validators"] = "^2.0.0-alpha.0";
      config.dependencies["cookie-universal-nuxt"] = "^2.1.0";
      config.dependencies["slugify"] = "^1.3.6";
      config.dependencies["@vue/composition-api"] = "^0.3.4";
      config.dependencies["nuxt"] = "^2.11.0";
      config.dependencies["@nuxtjs/pwa"] = "^3.0.0-beta.19";
      config.dependencies["@nuxtjs/axios"] = "^5.9.0";
      // dev dependencies
      // config.devDependencies["@vue-storefront/nuxt"] = "^0.0.1";

      config.engines = { node: "10.x" };
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
      before: "export default {"
    });
    // Add api-client plugin info
    const apiClientPluginExist = await toolbox.patching.exists(
      "nuxt.config.js",
      `'~/plugins/api-client'`
    );
    if (!apiClientPluginExist) {
      await toolbox.patching.patch("nuxt.config.js", {
        insert: `
    '~/plugins/api-client'`,
        after: "plugins: ["
      });
    }
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
                '@shopware-pwa/helpers'
              ]
            : [],
          prod: [
            '@shopware-pwa/shopware-6-client',
            '@shopware-pwa/composables',
            '@shopware-pwa/helpers'
          ]
        }
      }
    ],`,
        after: "buildModules: ["
      });
    }
    // Add cookie-universal-nuxt module
    const cookiePluginExist = await toolbox.patching.exists(
      "nuxt.config.js",
      `'cookie-universal-nuxt'`
    );
    if (!cookiePluginExist) {
      await toolbox.patching.patch("nuxt.config.js", {
        insert: `
    'cookie-universal-nuxt',`,
        after: "modules: ["
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
        after: "extend (config, ctx) {"
      });
    }
  };

  /**
   * Generates template files using ejs.
   * - api-client.js
   *
   * TODO:
   * - update template file to use params
   * - add params based on config file
   */
  toolbox.generateTemplateFiles = async () => {
    await toolbox.template.generate({
      template: "api-client.js.ejs",
      target: `plugins/api-client.js`
    });
  };

  toolbox.copyThemeFolder = async folderName => {
    await toolbox.filesystem.copyAsync(
      `${toolbox.defaultThemeLocation}/${folderName}`,
      folderName,
      { overwrite: true }
    );
  };

  toolbox.watchThemeFolder = folderName => {
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
