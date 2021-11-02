import axios from "axios";
import { GluegunToolbox } from "gluegun";

module.exports = (toolbox: GluegunToolbox) => {
  const CONFIG_ENTRY_ALLOWED_MAP = {
    "core.loginRegistration.doubleOptInGuestOrder": "doubleOptInGuestOrder",
    "core.loginRegistration.doubleOptInRegistration": "doubleOptInRegistration",
  };

  toolbox.settings = {};

  /**
   * Reads system config
   */
  toolbox.settings.fetchAdminConfigGroup = async (
    groupKey: string,
    adminAuthToken: string
  ): Promise<{
    [configKey: string]: any;
  }> => {
    try {
      const response = await axios.get(
        `${toolbox.config.shopwareEndpoint}/api/_action/system-config?domain=core.${groupKey}`,
        {
          headers: {
            Authorization: `Bearer ${adminAuthToken}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error("err", err);
    }
  };

  toolbox.settings.appendNuxtConfig = async (
    config: {
      [key: string]: string;
    },
    target: "publicRuntimeConfig" | "privateRuntimeConfig"
  ) => {
    const {
      filesystem: { exists },
    } = toolbox;

    toolbox.print.info(
      "[CLI > settings] Appending nuxt.config.js with runtime config"
    );
    let acceptedConfigEntries = "";
    for (const [key, value] of Object.entries(config)) {
      if (CONFIG_ENTRY_ALLOWED_MAP[key]) {
        acceptedConfigEntries += `${CONFIG_ENTRY_ALLOWED_MAP[key]}: ${value},
        `;
      }
    }
    const isNuxtGenerated = exists("nuxt.config.js");
    if (!isNuxtGenerated) {
      toolbox.print.info(
        "[CLI > settings] nuxt.config.js file does not exist. aborting..."
      );
      return;
    }

    if (!Object.keys(acceptedConfigEntries).length) {
      return;
    }

    if (await toolbox.patching.exists("nuxt.config.js", target)) {
      //await toolbox.patching.
    }

    // if (nuxtConfigContent) {
    //   console.warn('nuxtConfigContent', nuxtConfigContent)

    // }
  };
};
