import { GluegunToolbox } from "gluegun";

// TODO: method from nuxt-module/src/files.ts - move it to shared package - https://github.com/DivanteLtd/shopware-pwa/issues/849
function getAllFiles(
  dirPath: string,
  arrayOfFiles: string[] = [],
  excludeHidden: boolean = true
): string[] {
  const jetpack = require("fs-jetpack");
  const path = require("path");
  if (!dirPath || !jetpack.exists(dirPath)) return [];
  const files: string[] = jetpack.list(dirPath) as string[];
  files.forEach((file) => {
    if (jetpack.exists(path.join(dirPath, file)) === "dir") {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      const fileName = path.join(dirPath, file).replace(__dirname + "/", "");
      if (!(excludeHidden && file.startsWith("."))) {
        arrayOfFiles.push(path.normalize(fileName));
      }
    }
  });

  return arrayOfFiles;
}

module.exports = {
  name: "override",
  alias: ["o"],
  hidden: false,
  description:
    "Allows you to override theme component. Component will appear in project ready to be edited.",
  run: async (toolbox: GluegunToolbox) => {
    const path = require("path");

    toolbox.checkThemePath();

    const directoryPath = path.join(toolbox.getThemePath(), "components");

    const componentsFullPaths = getAllFiles(directoryPath);
    const themeComponents = componentsFullPaths.map((path) =>
      path.replace(directoryPath, "")
    );

    const componentToOverrideQuestion = {
      type: "autocomplete",
      name: "componentToOverride",
      message: "Type or select component to override",
      limit: 10,
      choices: themeComponents,
    };

    const answers = await toolbox.prompt.ask([componentToOverrideQuestion]);

    const copyFrom = path.join(directoryPath, answers.componentToOverride);
    const copyTo = path.join("src", "components", answers.componentToOverride);

    try {
      await toolbox.filesystem.copyAsync(copyFrom, copyTo);
      toolbox.print.success(
        `Component overrided. You can edit it in ${copyTo}`
      );
    } catch (e) {
      toolbox.print.error(e.message);
    }
  },
};
