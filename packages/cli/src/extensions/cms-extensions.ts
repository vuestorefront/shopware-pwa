import { GluegunToolbox } from "gluegun";
import { join, resolve } from "path";
import { merge } from "lodash";

module.exports = (toolbox: GluegunToolbox) => {
  toolbox.cms = {};

  let runningRefreshCms: boolean = false;
  toolbox.cms.invokeRefreshCMS = async () => {
    if (runningRefreshCms) {
      return;
    }
    runningRefreshCms = true;
    await toolbox?.runtime?.run(`cms`, {});
    runningRefreshCms = false;
  };

  toolbox.resolveCms = async (directoryPath, aliases, cmsComponentsMap) => {
    // Read cmsMap.json file in cms folder, every cms folder should contain one
    const readedMap = await toolbox.filesystem.readAsync(
      join(directoryPath, "cmsMap.json"),
      "json"
    );

    // if there is no cmsMap.json file, we do nothing with it
    if (!readedMap) return;

    Object.keys(readedMap).forEach((sectionKey) => {
      Object.values(readedMap[sectionKey]).forEach((value: string) => {
        const alias = `sw-cms/${sectionKey}/${value}`;
        const path = resolve(join(directoryPath, sectionKey, value));
        const configPathExists = toolbox.filesystem.exists(`${path}.vue`);
        if (configPathExists) {
          aliases[alias] = path.replace(/\\/g, "/");
        } else {
          toolbox.print.warning(
            `[cms] Invalid config for type ${alias} - destination file not exist in folder: ${directoryPath}`
          );
        }
      });
    });

    merge(cmsComponentsMap, readedMap);
  };
};
