import { overrideRoutes } from "@shopware-pwa/nuxt-module/src/pages";
import path from "path";

describe("nuxt-module - overrideRoutes", () => {
  const moduleObject = {
    options: {
      rootDir: __dirname,
    },
  };

  beforeEach(() => {
    moduleObject.options.rootDir = __dirname;
  });

  it("should not change routes if component routes not match", () => {
    const routes = [
      {
        name: "test",
        component: path.join(
          __dirname,
          `node_modules/@shopware-pwa/default-theme/pages/qwe.vue`
        ),
      },
    ];
    const overrides = ["pages/qweqwe.vue"];
    overrideRoutes(moduleObject, routes, overrides);
    expect(routes[0].component).toEqual(
      path.join(
        __dirname,
        `node_modules/@shopware-pwa/default-theme/pages/qwe.vue`
      )
    );
  });

  it("should change override path", () => {
    const routes = [
      {
        name: "test",
        component: path.join(
          __dirname,
          `node_modules/@shopware-pwa/default-theme/pages/qwe.vue`
        ),
      },
    ];
    const overrides = [path.join("pages", "qwe.vue")];
    overrideRoutes(moduleObject, routes, overrides);
    expect(routes[0].component).toEqual(path.join(__dirname, "pages/qwe.vue"));
  });

  it("should change nested route", () => {
    const routes = [
      {
        name: "test",
        component: path.join(
          __dirname,
          "node_modules/@shopware-pwa/default-theme/pages/test.vue"
        ),
        children: [
          {
            name: "test-child",
            component: path.join(
              __dirname,
              "node_modules/@shopware-pwa/default-theme/pages/test/child.vue"
            ),
          },
        ],
      },
    ];
    const overrides = [path.join("pages", "test", "child.vue")];
    overrideRoutes(moduleObject, routes, overrides);
    expect(routes[0].component).toEqual(
      path.join(
        __dirname,
        "node_modules/@shopware-pwa/default-theme/pages/test.vue"
      )
    );
    expect(routes[0].children[0].component).toEqual(
      path.join(__dirname, "pages/test/child.vue")
    );
  });
});
