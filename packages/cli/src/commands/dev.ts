import { GluegunCommand } from "gluegun";

const command: GluegunCommand = {
  name: "dev",
  run: async toolbox => {
    const {
      system: { spawn },
      print: { info }
    } = toolbox;

    info(`Starting Shopware PWA development project...`);

    toolbox.themeFolders.forEach(themeFolder =>
      toolbox.watchThemeFolder(themeFolder)
    );

    await spawn("yarn dev", {
      stdio: "inherit"
    });
  }
};

module.exports = command;
