import path from "path";
import { sortRoutes, createRoutes } from "@nuxt/utils";
import { NuxtModuleOptions } from "./interfaces";
import { getAllFiles } from "@shopware-pwa/commons/node";

export function overrideRoutes(
  moduleObject: any,
  routes: any,
  overrides: string[]
) {
  const pagesDir = path.join(
    moduleObject.options.rootDir,
    "node_modules/@shopware-pwa/default-theme"
  );
  routes.forEach((route: any) => {
    const pageComponentPath = path
      .normalize(route.component)
      .replace(pagesDir + path.sep, "");
    if (overrides.includes(pageComponentPath)) {
      route.component = path
        .normalize(route.component)
        .replace(pagesDir, moduleObject.options.rootDir);
    }
    route.component = path.normalize(route.component);
    if (route.children) {
      overrideRoutes(moduleObject, route.children, overrides);
    }
  });
}

export function addThemePages(moduleObject: NuxtModuleOptions) {
  const pagesDir = path.join(
    moduleObject.options.rootDir,
    "node_modules/@shopware-pwa/default-theme"
  );

  const themePages = getAllFiles(path.join(pagesDir, "pages"));
  const projectPages = getAllFiles(
    path.join(moduleObject.options.rootDir, "pages")
  );

  const allPages = themePages
    .map((page) => page.replace(path.normalize(pagesDir + path.sep), ""))
    .map((page) => page.replace(/\\/g, "/"))
    .filter((page) => /.+.(vue|js)$/.test(page))
    .sort();
  const allOverridedPages = projectPages
    .map((page) =>
      page.replace(path.normalize(moduleObject.options.rootDir + path.sep), "")
    )
    .filter((page) => /.+.(vue|js)$/.test(page))
    .sort();
  allOverridedPages.forEach((page) => {
    const p = page.replace(/\\/g, "/");
    if (!allPages.includes(p)) {
      allPages.push(p);
    }
  });
  allPages.sort();

  const createdRoutes = createRoutes({
    files: allPages,
    srcDir: pagesDir,
    pagesDir: "pages",
  });
  overrideRoutes(moduleObject, createdRoutes, allOverridedPages);

  moduleObject.extendRoutes((rootRoutes: any[], resolve: any) => {
    rootRoutes.splice(0, rootRoutes.length, ...createdRoutes);
    sortRoutes(rootRoutes);
  });
}
