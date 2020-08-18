import path from "path";
import { NuxtModuleOptions, ShopwarePwaConfigFile } from "./interfaces";
import jetpack from "fs-jetpack";

export function extendLocales(
  moduleObject: NuxtModuleOptions,
  shopwarePwaConfig: ShopwarePwaConfigFile | undefined
) {
  const languageConfigExists = jetpack.exists(
    path.join(
      moduleObject.options.rootDir,
      ".shopware-pwa",
      "sw-plugins",
      "languages.json"
    )
  );
  if (!languageConfigExists) {
    throw new Error(
      "[shopware-pwa] Languages config is not initialized properly, please run 'shopware-pwa init'"
    );
  }

  const defaultLanguageCode = shopwarePwaConfig?.defaultLanguageCode || "en-GB";

  const defaultLanguageFileExists = jetpack.exists(
    path.join(
      moduleObject.options.rootDir,
      ".shopware-pwa",
      "sw-plugins",
      "locales",
      `${defaultLanguageCode}.json`
    )
  );
  if (!defaultLanguageFileExists) {
    throw new Error(
      `[shopware-pwa] There is no default language file for ${defaultLanguageCode} code, please add translation file to locales folder.`
    );
  }
  const localesDirListing =
    jetpack.list(
      path.join(
        moduleObject.options.rootDir,
        ".shopware-pwa",
        "sw-plugins",
        "locales"
      )
    ) || [];
  const localeFromFiles = localesDirListing.map((localeFileName) =>
    localeFileName.replace(".json", "")
  );
  moduleObject.addPlugin({
    src: path.join(__dirname, "..", "plugins", "i18n.js"),
    fileName: "i18n.js",
    options: {
      defaultLanguage: defaultLanguageCode,
      availableLocales: localeFromFiles,
    },
  });
  /* istanbul ignore next */
  moduleObject.options.router.middleware =
    moduleObject.options.router.middleware || [];
  /* istanbul ignore next */
  if (typeof moduleObject?.options?.router?.middleware === "string") {
    moduleObject.options.router.middleware = [
      moduleObject.options.router.middleware,
    ];
  }
  moduleObject.options.router.middleware.push("i18n");
}
