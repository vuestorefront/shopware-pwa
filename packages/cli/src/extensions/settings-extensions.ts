import axios from "axios";
import { GluegunToolbox } from "gluegun";

module.exports = (toolbox: GluegunToolbox) => {
  const { patching } = toolbox;
  const CONFIG_FILENAME = "nuxt.config.js";

  const CONFIG_ENTRY_ALLOWED_MAP = {
    "core.loginRegistration.doubleOptInGuestOrder": "doubleOptInGuestOrder",
    "core.loginRegistration.doubleOptInRegistration": "doubleOptInRegistration",
  };

  toolbox.settings = {};

  toolbox.settings.createConfigSection = (sectionKey: string) => {
    toolbox.print.info(`[CLI > settings] creating ${sectionKey} section`);
    patching.patch(CONFIG_FILENAME, {
      before: "head: {",
      insert: `${sectionKey}: {
},
`,
    });
  };
  toolbox.settings.updateConfigSection = async (
    sectionKey: string,
    sectionData: any
  ) => {
    if (!Object.keys(sectionData).length) {
      toolbox.print.info(
        `[CLI > settings] there's no settings to save. exiting.`
      );
      return;
    }

    for (const [key, value] of Object.entries(sectionData)) {
      if (CONFIG_ENTRY_ALLOWED_MAP[key]) {
        const configKey = CONFIG_ENTRY_ALLOWED_MAP[key];
        if (await patching.exists(CONFIG_FILENAME, `${configKey}:`)) {
          toolbox.print.info(`[CLI > settings] updating ${configKey} setting`);

          await patching.patch(CONFIG_FILENAME, {
            insert: `${configKey}: ${value},`,
            replace: new RegExp(`${configKey}\:\ (.+),`),
          });
        } else {
          toolbox.print.info(
            `[CLI > settings] adding ${configKey} setting in ${sectionKey}`
          );
          await patching.patch(CONFIG_FILENAME, {
            insert: `
  ${configKey}: ${value},`,
            after: `${sectionKey}: {`,
          });
        }
      }
    }
  };

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

    const isNuxtGenerated = exists(CONFIG_FILENAME);
    if (!isNuxtGenerated) {
      toolbox.print.info(
        "[CLI > settings] nuxt.config.js file does not exist. aborting..."
      );
      return;
    }

    try {
      if (await patching.exists(CONFIG_FILENAME, target)) {
        await toolbox.settings.updateConfigSection(target, config);
      } else {
        await toolbox.settings.createConfigSection(target);
        await toolbox.settings.updateConfigSection(target, config);
      }
      toolbox.print.success(
        `[CLI > settings] settings synchronized successfully.`
      );
    } catch (error) {
      toolbox.print.error(
        `[CLI > settings] your nuxt.config.js cannot be updated.`
      );
    }
  };
};
