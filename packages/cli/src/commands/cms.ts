import { GluegunToolbox } from "gluegun";
import { join, resolve } from "path";

module.exports = {
  name: "cms",
  alias: ["cms"],
  hidden: true,
  run: async (toolbox: GluegunToolbox) => {
    const mainCmsPath = join(toolbox.defaultThemeLocation, "cms");

    const swCmsPath = join(`.shopware-pwa`, `sw-cms`);

    // Read cmsMap.json file in cms folder, every cms folder should contain one
    const cmsComponentsMap = await toolbox.filesystem.readAsync(
      join(mainCmsPath, "cmsMap.json"),
      "json"
    );

    // Map of aliases
    const aliases = {};

    Object.keys(cmsComponentsMap).forEach((sectionKey) => {
      Object.values(cmsComponentsMap[sectionKey]).forEach((value: string) => {
        const alias = `sw-cms/${sectionKey}/${value}`;
        const path = resolve(join(mainCmsPath, sectionKey, value));
        aliases[alias] = path;
      });
    });

    // Write merged map to file
    await toolbox.filesystem.writeAsync(
      join(swCmsPath, "cmsMap.json"),
      cmsComponentsMap
    );

    // Generate cmsNameMapper with cms components
    await toolbox.template.generate({
      template: `/cmsNameMapper.ejs`,
      target: `.shopware-pwa/sw-cms/cmsNameMapper.js`,
      props: {
        componentsMap: aliases,
        cmsMap: cmsComponentsMap,
      },
    });

    toolbox.print.success(`CMS prepared`);
  },
};
