import { GluegunCommand } from "gluegun";

const command: GluegunCommand = {
  name: "shopware-pwa",
  description: "intro",
  hidden: true,
  run: async (toolbox) => {
    const { print } = toolbox;

    print.info(`Welcome to Shopware PWA CLI`);
    print.info("Explore your options typing: shopware-pwa --help");
  },
};

module.exports = command;
