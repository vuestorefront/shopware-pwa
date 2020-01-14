import { GluegunToolbox } from "gluegun";

module.exports = (toolbox: GluegunToolbox) => {
  const {
    system: { run },
    print: { spin },
    filesystem: { exists }
  } = toolbox;
  toolbox.generateNuxtProject = async () => {
    const isNuxtGenerated = exists("nuxt.config.js");
    if (!isNuxtGenerated) {
      const spinner = spin("Preparing Nuxt project");
      const nuxtGenerate = `npx create-nuxt-app --answers '
    {
      "name": "shopware-pwa-project",
      "description": "shopware-pwa-project description",
      "author": "VueStorefront",
      "pm": "yarn",
      "ui": "none",
      "server": "none",
      "features": [
        "axios",
        "pwa"
      ],
      "linter": [
        "prettier",
        "lintStaged"
      ],
      "test": "jest",
      "mode": "universal",
      "devTools": []
    }
    '`;
      await run(nuxtGenerate);
      spinner.succeed("Nuxt project prepared");
    }
  };

  // enable this if you want to read configuration in from
  // the current folder's package.json (in a "cli" property),
  // cli.config.json, etc.
  // toolbox.config = {
  //   ...toolbox.config,
  //   ...toolbox.config.loadConfig(process.cwd(), "cli")
  // }
};
