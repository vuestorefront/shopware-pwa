import { GluegunCommand } from "gluegun";

const command: GluegunCommand = {
  name: "dev",
  description: "Run the initialised project for development.",
  run: async (toolbox) => {
    const {
      system: { spawn },
      print: { info },
    } = toolbox;

    info(`Starting Shopware PWA development project...`);

    // toolbox.themeFolders.forEach((themeFolder) =>
    //   toolbox.watchThemeFolder(themeFolder)
    // );

    const fs = require("fs");

    // Refresh languages during local development
    fs.watch(`locales`, { recursive: true }, async () => {
      await toolbox.runtime.run(`languages`, { local: true });
    });

    await spawn("yarn dev", {
      stdio: "inherit",
    });
  },
};

module.exports = command;
