import { GluegunToolbox } from "gluegun";
import axios from "axios";
const CONFIG_FILE = "nuxt.config.js";
module.exports = async (toolbox: GluegunToolbox) => {
  const {
    print,
    filesystem: { exists },
  } = toolbox;
  toolbox.settings = {};
  toolbox.settings.isDoubleOptInGuestOrderEnabled = async () => {
    const token = await toolbox.fetchAdminApiAuthToken(toolbox.inputParameters);
    const shopwareBaseUrl = toolbox.inputParameters.shopwareEndpoint;
    const url = `${shopwareBaseUrl}/api/v2/_action/system-config?domain=core.loginRegistration`;
    const systemConfig = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const doubleOptInGuestOrder =
      systemConfig.data["core.loginRegistration.doubleOptInGuestOrder"];

    return doubleOptInGuestOrder;
  };

  toolbox.settings.updateShopwarePwaConfigWithSetting = async (setting: {
    key: string;
    value: string | number | boolean;
  }) => {
    const isConfigGenerated = exists(CONFIG_FILE);
    const settingsString = `${setting.key}: "${setting.value}",`;

    if (isConfigGenerated) {
      const settingExists = await toolbox.patching.exists(
        CONFIG_FILE,
        setting.key
      );
      if (settingExists) {
        const replace = `${setting.key}: \s?\'[a-z0-9]*\',`;
        const re = new RegExp(replace, "gmi");
        await toolbox.patching.update(CONFIG_FILE, (data) => {
          return data.replace(re, settingsString);
        });
      } else {
        await toolbox.patching.patch(CONFIG_FILE, {
          insert: `
            ${settingsString}
        `,
          after: "publicRuntimeConfig: {",
        });
      }
      print.success(`${CONFIG_FILE} was updated ✓`);
    }
  };
};
