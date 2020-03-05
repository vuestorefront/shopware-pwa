import path from "path";
import { getAllFiles } from "./files";
import { sortRoutes, createRoutes } from "@nuxt/utils";
import { NuxtModuleOptions } from "./interfaces";

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
    const pageComponentPath = route.component.replace(pagesDir + "/", "");
    if (overrides.includes(pageComponentPath)) {
      route.component = route.component.replace(
        pagesDir,
        moduleObject.options.rootDir
      );
    }
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

  const allPages = getAllFiles(pagesDir + "/pages")
    .map(page => page.replace(pagesDir + "/", ""))
    .filter(page => /.+.(vue|js)$/.test(page))
    .sort();
  const allOverridedPages = getAllFiles(moduleObject.options.rootDir + "/pages")
    .map(page => page.replace(moduleObject.options.rootDir + "/", ""))
    .filter(page => /.+.(vue|js)$/.test(page))
    .sort();
  allOverridedPages.forEach(page => {
    if (!allPages.includes(page)) {
      allPages.push(page);
    }
  });
  allPages.sort();

  const createdRoutes = createRoutes({
    files: allPages,
    srcDir: pagesDir,
    pagesDir: "pages"
  });
  overrideRoutes(moduleObject, createdRoutes, allOverridedPages);

  moduleObject.extendRoutes((rootRoutes: any[], resolve: any) => {
    rootRoutes.splice(0, rootRoutes.length, ...createdRoutes);
    sortRoutes(rootRoutes);
  });
}
