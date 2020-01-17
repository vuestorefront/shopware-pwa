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
    const spinner = spin("Preparing Nuxt project");
    const isNuxtGenerated = exists("nuxt.config.js");
    if (!isNuxtGenerated) {
      const nuxtGenerate = `npx create-nuxt-app --answers '
    {
      "name": "shopware-pwa-project",
      "description": "shopware-pwa-project description",
      "author": "Vue Storefront",
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
  };

  /**
   * Updates package.json with versions.
   * TODO:
   * - uncomment packages which are already published
   * - dynamically get new versions from template
   */
  toolbox.updateNuxtPackageJson = async () => {
    const nuxtThemePackage = toolbox.filesystem.read(
      `${toolbox.defaultThemeLocation}/package.json`,
      "json"
    );

    const packageDependenciesToUpdate = [
      // "@shopware-pwa/composables",
      // "@shopware-pwa/helpers",
      "@shopware-pwa/shopware-6-client",
      "@vue/composition-api",
      "@storefront-ui/vue",
      "@vuelidate/core",
      "@vuelidate/validators",
      "cookie-universal-nuxt",
      "slugify",
      "nuxt",
      "@nuxtjs/pwa",
      "@nuxtjs/axios"
    ];
    const devPackageDependenciesToUpdate = [
      // "@vue-storefront/nuxt"
    ];
    await toolbox.patching.update("package.json", config => {
      packageDependenciesToUpdate.forEach(packageName => {
        config.dependencies[packageName] =
          nuxtThemePackage.dependencies[packageName];
      });

      devPackageDependenciesToUpdate.forEach(packageName => {
        config.devDependencies[packageName] =
          nuxtThemePackage.devDependencies[packageName];
      });

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
