import { GluegunCommand } from "gluegun";

const command: GluegunCommand = {
  name: "dev",
  run: async toolbox => {
    const {
      system: { run },
      print: { info }
    } = toolbox;

    info(`Starting Shopware PWA development project...`);

    toolbox.themeFolders.forEach(themeFolder =>
      toolbox.watchThemeFolder(themeFolder)
    );

    await run("yarn dev");
  }
};

module.exports = command;
