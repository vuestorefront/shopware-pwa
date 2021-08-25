import { GluegunCommand } from "gluegun";

const command: GluegunCommand = {
  name: "dev",
  description: "Run the initialised project for development.",
  run: async (toolbox) => {
    const {
      system: { spawn },
      print: { info },
    } = toolbox;

    const path = require("path");
    const chokidar = require("chokidar");
    const jetpack = toolbox.filesystem;

    info(`[CLI > dev] Starting Shopware PWA development project...`);

    // Watch locales
    await jetpack.dirAsync("locales"); // create folder if not exist
    const localesWatchEvents = ["add", "change", "unlink"];
    const locales = path.join("locales/*.json");
    const localPLuginsLocales = path.join("sw-plugins/**/locales/*");
    chokidar
      .watch([locales, localPLuginsLocales], {
        ignoreInitial: true,
      })
      .on("all", async (event) => {
        if (localesWatchEvents.includes(event)) {
          await toolbox.languages.invokeRefreshLanguages(true);
        }
      });

    // Watch plugins
    const pluginsWatchEvents = ["add", "change", "unlink"];
    const localPluginsPath = path.join("sw-plugins");
    chokidar
      .watch([localPluginsPath], {
        ignoreInitial: true,
        ignored: "**/locales/*.json",
      })
      .on("all", async (event) => {
        if (pluginsWatchEvents.includes(event)) {
          await toolbox.plugins.invokeRefreshPlugins(true);
          await toolbox.cms.invokeRefreshCMS();
        }
      });

    // Watch CMS
    const cmsWatchEvents = ["add", "change", "unlink"];
    const cmsPath = path.join("cms");
    chokidar
      .watch([cmsPath], {
        ignoreInitial: true,
      })
      .on("all", async (event) => {
        if (cmsWatchEvents.includes(event)) {
          toolbox.cms.invokeRefreshCMS();
        }
      });

    // initial config invoke
    await toolbox.plugins.invokeRefreshPlugins(true);
    await toolbox.cms.invokeRefreshCMS();
    await toolbox.languages.invokeRefreshLanguages();

    const debugOn = toolbox.parameters.options.debug;

    let spawnCommand = "yarn nuxt";
    if (debugOn) {
      spawnCommand = "node --inspect node_modules/.bin/nuxt";
    }

    await spawn(spawnCommand, {
      stdio: "inherit",
    });
  },
};

module.exports = command;
