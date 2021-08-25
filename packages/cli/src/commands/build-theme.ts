import { GluegunCommand } from "gluegun";

const command: GluegunCommand = {
  name: "build-theme",
  description: "Build your theme for Shopware PWA projects.",
  run: async (toolbox) => {
    const path = require("path");
    const fse = require("fs-extra");
    if (!toolbox.isProduction) {
      toolbox.print.warning(
        `[CLI > build-theme] You're running CLI in development mode!`
      );
    }

    const buildingSpinner = toolbox.print.spin(
      "[CLI > build-theme] Building theme..."
    );

    const destinationDirectoryName = "dist";

    const themePackage = await toolbox.filesystem.readAsync(
      "package.json",
      "json"
    );

    const baseTheme = themePackage.baseTheme;

    await toolbox.filesystem.removeAsync(destinationDirectoryName);
    await toolbox.filesystem.dirAsync(destinationDirectoryName);

    if (baseTheme) {
      buildingSpinner.text =
        "[CLI > build-theme] Running with base theme: " + baseTheme;
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

        // Get locales from baseTheme
        const resultLocalesMap = {};
        const baseThemeLocalesMap = await toolbox.languages.getLocalesMap(
          path.join(themePath, "locales")
        );
        await toolbox.languages.mergeLocalesMap(
          resultLocalesMap,
          baseThemeLocalesMap
        );

        // Get locales from local theme and merge theme with those from baseTheme
        const localThemeLocalesMap = await toolbox.languages.getLocalesMap(
          "locales"
        );
        await toolbox.languages.mergeLocalesMap(
          resultLocalesMap,
          localThemeLocalesMap
        );

        // Write the merged locales to the dist folder.
        await toolbox.languages.writeLanguages(
          resultLocalesMap,
          path.join(destinationDirectoryName, "locales")
        );
      } catch (e) {
        buildingSpinner.fail(e.message);
        process.exit(1);
      }
    }

    await toolbox.filesystem.copyAsync("src", destinationDirectoryName, {
      overwrite: true,
    });
    buildingSpinner.succeed("[CLI > build-theme] Theme built!");
  },
};

module.exports = command;
