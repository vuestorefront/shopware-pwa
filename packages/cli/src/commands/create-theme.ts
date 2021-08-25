import { GluegunCommand } from "gluegun";
import validatePackageName from "validate-npm-package-name";

const command: GluegunCommand = {
  name: "create-theme",
  description: "Create new theme for Shopware PWA projects.",
  run: async (toolbox) => {
    const path = require("path");
    const execa = require("execa");

    if (!toolbox.isProduction) {
      toolbox.print.warning(
        `[CLI > create-theme] You're running CLI in development mode!`
      );
    }

    toolbox.print.info(`[CLI > create-theme] Creating new theme project...`);

    const themeNameAnswers = await toolbox.prompt.ask({
      type: "input",
      name: "themeName",
      message:
        "Type a name for your theme (needs to meet NPM package name validation rules):",
      initial: "",
    });

    const { themeName } = themeNameAnswers;

    // Validate
    const nameValidationResult = validatePackageName(themeName);
    if (!nameValidationResult.validForNewPackages) {
      toolbox.print.error(
        `[CLI > create-theme] Cannot create new theme with name "${themeName}":`
      );
      nameValidationResult.warnings?.forEach((warning) =>
        toolbox.print.warning(`  -> ${warning}`)
      );
      nameValidationResult.errors?.forEach((error) =>
        toolbox.print.error(`  -> ${error}`)
      );
      process.exit(1);
    }

    const dirPath = path.resolve(themeName);
    await Promise.all([
      toolbox.filesystem.dirAsync(dirPath),
      toolbox.filesystem.dirAsync(path.join(dirPath, "src")),
      toolbox.filesystem.dirAsync(path.join(dirPath, "src", "app")),
      toolbox.filesystem.dirAsync(path.join(dirPath, "src", "assets")),
      toolbox.filesystem.dirAsync(path.join(dirPath, "src", "cms")),
      toolbox.filesystem.dirAsync(path.join(dirPath, "src", "components")),
      toolbox.filesystem.dirAsync(path.join(dirPath, "src", "helpers")),
      toolbox.filesystem.dirAsync(path.join(dirPath, "src", "layouts")),
      toolbox.filesystem.dirAsync(path.join(dirPath, "src", "locales")),
      toolbox.filesystem.dirAsync(path.join(dirPath, "src", "logic")),
      toolbox.filesystem.dirAsync(path.join(dirPath, "src", "middleware")),
      toolbox.filesystem.dirAsync(path.join(dirPath, "src", "pages")),
      toolbox.filesystem.dirAsync(path.join(dirPath, "src", "plugins")),
      toolbox.filesystem.dirAsync(path.join(dirPath, "src", "static")),
      toolbox.filesystem.dirAsync(path.join(dirPath, "src", "store")),
    ]);

    // initialize git repo in theme folder
    await execa("git", ["init"], {
      stdio: "pipe",
      cwd: dirPath,
    });

    // generate .gitignore file
    await toolbox.template.generate({
      template: `/themes/gitignore`,
      target: path.join(dirPath, ".gitignore"),
      props: {},
    });

    type ThemeSelectOptions =
      | "@shopware-pwa/default-theme"
      | "@shopware-pwa/theme-base"
      | "custom";

    const baseThemeAnswers = await toolbox.prompt.ask({
      type: "select",
      name: "baseThemeSelect",
      message: "Which theme you'd like to extend:",
      choices: [
        "@shopware-pwa/default-theme",
        "@shopware-pwa/theme-base",
        "custom",
      ],
      initial: 0,
    });
    const themeSelectOption: ThemeSelectOptions =
      baseThemeAnswers.baseThemeSelect as ThemeSelectOptions;

    let baseThemePackageName = "";
    if (themeSelectOption === "custom") {
      const customThemeNameAnswer = await toolbox.prompt.ask({
        type: "input",
        name: "baseThemeName",
        message: "Type the NPM package name of theme you'd like to extend:",
        initial: "@shopware-pwa/default-theme",
      });
      baseThemePackageName = customThemeNameAnswer.baseThemeName;
    } else {
      baseThemePackageName = themeSelectOption;
    }

    // create and update package.json
    await execa("yarn", ["init", "-y"], {
      stdio: "pipe",
      cwd: dirPath,
    });
    await toolbox.patching.update(
      path.join(dirPath, "package.json"),
      (config) => {
        config.baseTheme = baseThemePackageName;

        config.scripts = config.scripts || {};
        config.scripts.build = "shopware-pwa build-theme";
        config.scripts.dev = "shopware-pwa dev-theme";

        config.files = ["dist"];
        delete config.main;
        return config;
      }
    );

    // add base package dependency
    if (baseThemePackageName) {
      await execa(
        "yarn",
        ["add", "-D", "@shopware-pwa/cli", baseThemePackageName],
        {
          stdio: "inherit",
          cwd: dirPath,
        }
      );
    }
    // invoke yarn
    await execa("yarn", [], {
      stdio: "inherit",
      cwd: dirPath,
    });

    toolbox.print.success(
      `[CLI > create-theme] New theme generated! Go inside new folder and type "yarn dev" to start creation.`
    );
  },
};

module.exports = command;
