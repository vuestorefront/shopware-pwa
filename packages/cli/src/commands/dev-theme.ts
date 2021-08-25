import { GluegunCommand } from "gluegun";

const command: GluegunCommand = {
  name: "dev-theme",
  description: "Develop your theme for Shopware PWA projects.",
  run: async (toolbox) => {
    const path = require("path");
    const fse = require("fs-extra");
    const chokidar = require("chokidar");
    toolbox.print.info(`Starting theme development...`);

    const themePackage = await toolbox.filesystem.readAsync(
      "package.json",
      "json"
    );
    const baseTheme = themePackage.baseTheme;

    // Watch src directory
    const srcDirectoryPath = path.join("src");
    chokidar
      .watch([srcDirectoryPath], {
        ignoreInitial: true,
      })
      .on("all", async (event, filePath) => {
        toolbox.print.info("[CLI > dev-theme]");
        const srcPath = filePath;
        const destPath = filePath.replace("src", "dist");

        if (["add", "change"].includes(event)) {
          toolbox.print.info("[CLI > dev-theme] Changed file: " + filePath);
          await fse.copy(srcPath, destPath);
        } else if (event === "unlink") {
          toolbox.print.info("[CLI > dev-theme] Removed file: " + filePath);

          // if we have base theme we should check if there is a component with that path
          if (baseTheme) {
            const themePath = toolbox.getThemePath(baseTheme);
            const themeFilePath = filePath.replace("src", themePath);
            const fileExistInTheme = await toolbox.filesystem.existsAsync(
              themeFilePath
            );
            // if component exist in theme we copy it to dist folder
            if (fileExistInTheme) {
              await fse.copy(themeFilePath, destPath);
            } else {
              // otherwise we're removing it from dist folder
              await await fse.remove(destPath);
            }
          }
        }
        toolbox.print.info("");
      });

    // at the beginning we're running build and wtching for changes in src folder from now on
    await toolbox.runtime.run(`build-theme`);

    toolbox.print.info(`[CLI > dev-theme] Waiting for changes...\n`);
  },
};

module.exports = command;
