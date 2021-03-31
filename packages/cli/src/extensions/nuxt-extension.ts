import { GluegunToolbox } from "gluegun";
import { join } from "path";
const path = require("path");

module.exports = (toolbox: GluegunToolbox) => {
  const {
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
    if (!isNuxtGenerated) {
      const baseDirectory = toolbox.plugin && toolbox.plugin.directory;
      let templateDirectory = `${baseDirectory}/templates`;

      if (!toolbox.filesystem.isDirectory(templateDirectory)) {
        templateDirectory = `${baseDirectory}/build/templates`;
      }
      const projectTemplatePath = join(templateDirectory, "project-template");
      await toolbox.filesystem.copyAsync(projectTemplatePath, ".", {
        overwrite: true,
      });

      // Rename missed .gitignore file
      const gitIgnoreExists = await toolbox.filesystem.existsAsync("gitignore");
      if (gitIgnoreExists) {
        await toolbox.filesystem.moveAsync("gitignore", ".gitignore");
      }
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
   * Updates nuxt.config.js with configuration for Shopwre PWA
   * TODO: we can remove this method after: https://github.com/vuestorefront/shopware-pwa/issues/1403
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

    // Add chokidar flag
    const configChokidarFlag = await toolbox.patching.exists(
      "nuxt.config.js",
      `CHOKIDAR_USEPOLLING`
    );
    if (!configChokidarFlag) {
      const configEnvSection = await toolbox.patching.exists(
        "nuxt.config.js",
        "env:"
      );
      await toolbox.patching.patch("nuxt.config.js", {
        insert: !configEnvSection
          ? `
  env: {
    CHOKIDAR_USEPOLLING: process.env.NODE_ENV == "production" ? 0 : 1,
  },`
          : `
    CHOKIDAR_USEPOLLING: process.env.NODE_ENV == "production" ? 0 : 1,`,
        after: !configEnvSection ? "export default {" : "env: {",
      });
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
   */
  toolbox.generateTemplateFiles = async (
    { shopwareEndpoint, shopwareAccessToken, pwaHost } = toolbox.inputParameters
  ) => {
    const isConfigGenerated = exists("shopware-pwa.config.js");
    if (!isConfigGenerated) {
      await toolbox.template.generate({
        template: "shopware-pwa.config.js",
        target: `shopware-pwa.config.js`,
        props: {
          shopwareEndpoint,
          shopwareAccessToken,
          pwaHost,
        },
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
