import path from "path";
import { NuxtModuleOptions, ShopwarePwaConfigFile } from "./interfaces";
import fse from "fs-extra";

export function getTargetSourcePath(moduleObject: NuxtModuleOptions) {
  return path.join(moduleObject.options.rootDir, ".shopware-pwa", "source");
}

export function getThemeSourcePath(
  moduleObject: NuxtModuleOptions,
  config: ShopwarePwaConfigFile
) {
  const directPath = path.join(moduleObject.options.rootDir, config.theme);
  const directPathExist = fse.existsSync(directPath);
  if (directPathExist) return directPath;

  const nodePackagePath = path.join(
    moduleObject.options.rootDir,
    "node_modules",
    config.theme
  );
  const nodePackagePathExist = fse.existsSync(nodePackagePath);
  if (nodePackagePathExist) return nodePackagePath;

  throw `No theme found for "${directPath}". Please make sure that path is correct or theme is installed from NPM.`;
}
export function getProjectSourcePath(moduleObject: NuxtModuleOptions) {
  return path.join(moduleObject.options.rootDir, "src");
}

export function filterNodeModules(src: string, dest: string) {
  return !dest.includes("node_modules");
}

export async function useThemeAndProjectFiles({
  TARGET_SOURCE,
  THEME_SOURCE,
  PROJECT_SOURCE,
}: {
  TARGET_SOURCE: string;
  THEME_SOURCE: string;
  PROJECT_SOURCE: string;
}) {
  await fse.emptyDir(TARGET_SOURCE);
  await fse.copy(THEME_SOURCE, TARGET_SOURCE, {
    dereference: true,
    filter: filterNodeModules,
  });
  await fse.copy(PROJECT_SOURCE, TARGET_SOURCE);
}

export async function onThemeFilesChanged({
  event,
  filePath,
  TARGET_SOURCE,
  THEME_SOURCE,
  PROJECT_SOURCE,
}: {
  event: string;
  filePath: string;
  TARGET_SOURCE: string;
  THEME_SOURCE: string;
  PROJECT_SOURCE: string;
}) {
  const relativePath = filePath.replace(THEME_SOURCE, "");
  const projectFilePath = path.join(PROJECT_SOURCE, relativePath);
  const targetFilePath = path.join(TARGET_SOURCE, relativePath);
  const existInProject = await fse.pathExists(projectFilePath);
  if (existInProject) return; // Do nothing
  if (event === "add" || event === "change") {
    await fse.copy(filePath, targetFilePath);
  }
  if (event === "unlink") {
    await fse.remove(targetFilePath);
  }
}

export async function onProjectFilesChanged({
  event,
  filePath,
  TARGET_SOURCE,
  THEME_SOURCE,
  PROJECT_SOURCE,
}: {
  event: string;
  filePath: string;
  TARGET_SOURCE: string;
  THEME_SOURCE: string;
  PROJECT_SOURCE: string;
}) {
  const relativePath = filePath.replace(PROJECT_SOURCE, "");
  const targetFilePath = path.join(TARGET_SOURCE, relativePath);
  if (event === "add" || event === "change") {
    await fse.copy(filePath, targetFilePath);
  }
  if (event === "unlink") {
    const baseThemeFilePath = path.join(THEME_SOURCE, relativePath);
    const existInTheme = await fse.pathExists(baseThemeFilePath);
    if (existInTheme) {
      await fse.copy(baseThemeFilePath, targetFilePath);
    } else {
      await fse.remove(targetFilePath);
    }
  }
}
