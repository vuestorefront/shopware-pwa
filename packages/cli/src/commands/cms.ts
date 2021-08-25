import { GluegunToolbox } from "gluegun";

module.exports = {
  name: "cms",
  alias: ["cms"],
  hidden: true,
  run: async (toolbox: GluegunToolbox) => {
    const path = require("path");

    toolbox.checkThemePath();

    const mainCmsPath = path.join(toolbox.getThemePath(), "cms");

    const swCmsPath = path.join(".shopware-pwa", "sw-cms");
    const swPluginsPath = path.join(".shopware-pwa", "pwa-bundles-assets");

    // Aliases and componentsMap to save
    const aliases = {};
    const cmsComponentsMap = {
      sections: {},
      blocks: {},
      elements: {},
    };

    // Read theme cms settings
    await toolbox.resolveCms(mainCmsPath, aliases, cmsComponentsMap);

    // Override CMS by plugins
    const pluginsConfig = await toolbox.filesystem.readAsync(
      path.join(".shopware-pwa", "pwa-bundles.json"),
      "json"
    );
    if (pluginsConfig) {
      const pluginsList = Object.keys(pluginsConfig);
      for (let index = 0; index < pluginsList.length; index++) {
        await toolbox.resolveCms(
          path.join(swPluginsPath, pluginsList[index], "cms"),
          aliases,
          cmsComponentsMap
        );
      }
    }

    // Override CMS by user project
    await toolbox.resolveCms("cms", aliases, cmsComponentsMap);

    // Write merged map to file
    await toolbox.filesystem.writeAsync(
      path.join(swCmsPath, "cmsMap.json"),
      cmsComponentsMap
    );

    // Generate cmsNameMapper with cms components
    await toolbox.template.generate({
      template: "/cmsNameMapper.ejs",
      target: ".shopware-pwa/sw-cms/cmsNameMapper.js",
      props: {
        componentsMap: aliases,
        cmsMap: cmsComponentsMap,
      },
    });

    toolbox.print.success(`[CLI > cms] CMS prepared`);
  },
};
