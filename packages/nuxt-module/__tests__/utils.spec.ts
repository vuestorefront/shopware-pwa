import { addThemeLayouts, extendComponents } from "@shopware-pwa/nuxt-module/src/utils";

describe("nuxt-module - utils", () => {
  beforeEach(() => {
    // mock vuex store
    jest.resetAllMocks();
  });

  describe("addThemeLayouts", () => {
    it("adds available local layouts", () => {
      jest.mock('./testModule');
      const mockedModuleObject = require('./testModule');
      addThemeLayouts(mockedModuleObject);
      expect(mockedModuleObject.addLayout).toBeCalledWith({"src": __dirname + "/node_modules/@shopware-pwa/default-theme/layouts/test.vue"}, "test")
    })
  })

  describe("extendComponents", () => {
    it("replace files for given aliases", () => {
      jest.mock('./testModule');
      const mockedModuleObject = require('./testModule');
      extendComponents(mockedModuleObject);
      expect(mockedModuleObject.extendBuild).toBeCalledTimes(1)
    })
  })
});