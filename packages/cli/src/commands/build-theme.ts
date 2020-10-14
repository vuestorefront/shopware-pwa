import { GluegunCommand } from "gluegun";

const command: GluegunCommand = {
  name: "build-theme",
  description: "Build your theme for Shopware PWA projects.",
  run: async (toolbox) => {
    const fse = require("fs-extra");
    const buildingSpinner = toolbox.print.spin("Building theme...");

    const destinationDirectoryName = "dist";

    const themePackage = await toolbox.filesystem.readAsync(
      "package.json",
      "json"
    );

    const baseTheme = themePackage.baseTheme;

    await toolbox.filesystem.removeAsync(destinationDirectoryName);
    await toolbox.filesystem.dirAsync(destinationDirectoryName);

    if (baseTheme) {
      buildingSpinner.text = "Running with base theme: " + baseTheme;
      try {
        const themePath = toolbox.getThemePath(baseTheme);
        await fse.copy(themePath, destinationDirectoryName, {
          dereference: true,
          filter: (src: string, dest: string) => {
            return (
              !dest.includes("node_modules") && !dest.includes("package.json")
            );
          },
        });
      } catch (e) {
        buildingSpinner.fail(e.message);
        process.exit(1);
      }
    }

    await toolbox.filesystem.copyAsync("src", destinationDirectoryName, {
      overwrite: true,
    });
    buildingSpinner.succeed("Theme built!");
  },
};

module.exports = command;
