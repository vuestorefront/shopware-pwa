import { GluegunCommand } from "gluegun";

const command: GluegunCommand = {
  name: "dev",
  description: "Run the initialised project for development.",
  run: async (toolbox) => {
    const {
      system: { spawn },
      print: { info },
    } = toolbox;

    const jetpack = require("fs-jetpack");

    info(`Starting Shopware PWA development project...`);

    // toolbox.themeFolders.forEach((themeFolder) =>
    //   toolbox.watchThemeFolder(themeFolder)
    // );

    // Refresh languages during local development
    if (jetpack.exists("locales")) {
      jetpack.watch("locales", { recursive: true }, async () => {
        await toolbox.runtime.run(`languages`, { local: true });
      });
    }

    await spawn("yarn dev", {
      stdio: "inherit",
    });
  },
};

module.exports = command;
