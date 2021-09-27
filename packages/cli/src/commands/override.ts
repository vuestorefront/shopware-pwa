import { GluegunToolbox } from "gluegun";
import { getAllFiles } from "@shopware-pwa/commons/node";

module.exports = {
  name: "override",
  alias: ["o", "overwrite"],
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

    let fileToOverwrite: string;
    if (!toolbox.parameters.options.file) {
      const answers = await toolbox.prompt.ask([componentToOverrideQuestion]);
      fileToOverwrite = answers.componentToOverride;
    } else {
      fileToOverwrite = toolbox.parameters.options.file;
    }

    const copyFrom = path.join(directoryPath, fileToOverwrite);
    const copyTo = path.join("src", "components", fileToOverwrite);

    try {
      await toolbox.filesystem.copyAsync(copyFrom, copyTo);
      toolbox.print.success(
        `[CLI > override] Component overrided. You can edit it in ${copyTo}`
      );
    } catch (e) {
      toolbox.print.error(`[CLI > override] ${e.message}`);
    }
  },
};
