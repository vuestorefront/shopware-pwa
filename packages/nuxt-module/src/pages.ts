import path from "path";

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
