import { GluegunToolbox } from "gluegun";

module.exports = {
  name: "init",
  alias: ["i"],
  run: async (toolbox: GluegunToolbox) => {
    const {
      system: { run },
      print: { info, success, spin }
    } = toolbox;

    await toolbox.generateNuxtProject();

    await toolbox.removeDefaultNuxtFiles();

    await toolbox.updateNuxtPackageJson();

    await toolbox.updateNuxtConfigFile();

    await toolbox.generateTemplateFiles();

    const copyPromisses = toolbox.themeFolders.map(themeFolder =>
      toolbox.copyThemeFolder(themeFolder)
    );
    await Promise.all(copyPromisses);

    // Linking local packages
    await run(`yarn link @shopware-pwa/composables`);
    await run(`yarn link @shopware-pwa/helpers`);
    await run(`yarn link @shopware-pwa/shopware-6-client`);
    await run(`yarn link @vue-storefront/nuxt`);

    // Loading additional packages
    await run(`yarn`);

    success(`Generated Shopware PWA project!`);
    info(`Type 'shopware-pwa dev' and start exploring`);
  }
};
