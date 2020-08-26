import path from "path";
import { NuxtModuleOptions } from "./interfaces";
import fse from "fs-extra";

export function getTargetSourcePath(moduleObject: NuxtModuleOptions) {
  return path.join(moduleObject.options.rootDir, ".shopware-pwa", "source");
}
export function getBaseSourcePath(moduleObject: NuxtModuleOptions) {
  return path.join(
    moduleObject.options.rootDir,
    "node_modules",
    "@shopware-pwa",
    "default-theme"
  );
}
export function getProjectSourcePath(moduleObject: NuxtModuleOptions) {
  return path.join(moduleObject.options.rootDir, "src");
}

export function filterNodeModules(src: string, dest: string) {
  return !dest.includes("node_modules");
}

export async function useThemeAndProjectFiles({
  TARGET_SOURCE,
  BASE_SOURCE,
  PROJECT_SOURCE,
}: {
  TARGET_SOURCE: string;
  BASE_SOURCE: string;
  PROJECT_SOURCE: string;
}) {
  await fse.emptyDir(TARGET_SOURCE);
  await fse.copy(BASE_SOURCE, TARGET_SOURCE, {
    dereference: true,
    filter: filterNodeModules,
  });
  await fse.copy(PROJECT_SOURCE, TARGET_SOURCE);
}

export async function onThemeFilesChanged({
  event,
  filePath,
  TARGET_SOURCE,
  BASE_SOURCE,
  PROJECT_SOURCE,
}: {
  event: string;
  filePath: string;
  TARGET_SOURCE: string;
  BASE_SOURCE: string;
  PROJECT_SOURCE: string;
}) {
  const relativePath = filePath.replace(BASE_SOURCE, "");
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
  BASE_SOURCE,
  PROJECT_SOURCE,
}: {
  event: string;
  filePath: string;
  TARGET_SOURCE: string;
  BASE_SOURCE: string;
  PROJECT_SOURCE: string;
}) {
  const relativePath = filePath.replace(PROJECT_SOURCE, "");
  const targetFilePath = path.join(TARGET_SOURCE, relativePath);
  if (event === "add" || event === "change") {
    await fse.copy(filePath, targetFilePath);
  }
  if (event === "unlink") {
    const baseThemeFilePath = path.join(BASE_SOURCE, relativePath);
    const existInTheme = await fse.pathExists(baseThemeFilePath);
    if (existInTheme) {
      await fse.copy(baseThemeFilePath, targetFilePath);
    } else {
      await fse.remove(targetFilePath);
    }
  }
}
