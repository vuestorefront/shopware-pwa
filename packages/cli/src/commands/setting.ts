import { GluegunToolbox } from "gluegun";
/**
 * 1. get store settings
 * 2. extract core.loginRegistration.doubleOptInGuestOrder value
 * 3. store it in the shopware-pwa.config.js
 */
module.exports = {
  name: "settings",
  hidden: true,
  run: async (toolbox: GluegunToolbox) => {
    toolbox.print.info("System settings are being fetched...");
    try {
      const isDoubleOptIn = await toolbox.settings.isDoubleOptInGuestOrderEnabled();
      toolbox.settings.updateShopwarePwaConfigWithSetting({
        key: "doubleOptInGuestOrder",
        value: !!isDoubleOptIn,
      });
    } catch (error) {
      toolbox.print.error("An error occured during fetching the settings.");
    }
  },
};
