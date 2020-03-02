import { overrideRoutes } from "@shopware-pwa/nuxt-module/src/pages";

describe("nuxt-module - overrideRoutes", () => {
  const moduleObject = {
    options: {
      rootDir: __dirname
    }
  };

  it("should not change routes if component routes not match", () => {
    const routes = [
      {
        name: "test",
        component: `${__dirname}/node_modules/@shopware-pwa/default-theme/pages/qwe.vue`
      }
    ];
    const overrides = ["pages/qweqwe.vue"];
    overrideRoutes(moduleObject, routes, overrides);
    expect(routes[0].component).toEqual(
      `${__dirname}/node_modules/@shopware-pwa/default-theme/pages/qwe.vue`
    );
  });

  it("should change override path", () => {
    const routes = [
      {
        name: "test",
        component: `${__dirname}/node_modules/@shopware-pwa/default-theme/pages/qwe.vue`
      }
    ];
    const overrides = ["pages/qwe.vue"];
    overrideRoutes(moduleObject, routes, overrides);
    expect(routes[0].component).toEqual(`${__dirname}/pages/qwe.vue`);
  });

  it("should change nested route", () => {
    const routes = [
      {
        name: "test",
        component: `${__dirname}/node_modules/@shopware-pwa/default-theme/pages/test.vue`,
        children: [
          {
            name: "test-child",
            component: `${__dirname}/node_modules/@shopware-pwa/default-theme/pages/test/child.vue`
          }
        ]
      }
    ];
    const overrides = ["pages/test/child.vue"];
    overrideRoutes(moduleObject, routes, overrides);
    expect(routes[0].component).toEqual(
      `${__dirname}/node_modules/@shopware-pwa/default-theme/pages/test.vue`
    );
    expect(routes[0].children[0].component).toEqual(
      `${__dirname}/pages/test/child.vue`
    );
  });
});
