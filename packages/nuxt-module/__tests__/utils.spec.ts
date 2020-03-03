import { addThemeLayouts } from "@shopware-pwa/nuxt-module/src/utils";

describe("nuxt-module - utils", () => {
    describe("addThemeLayouts", () => {
      it("adds available local layouts", () => {
        jest.mock('./testModule');
        const mockedModuleObject = require('./testModule');
        addThemeLayouts(mockedModuleObject);
        expect(mockedModuleObject.addLayout).toBeCalledWith({"src": __dirname + "/node_modules/@shopware-pwa/default-theme/layouts/test.vue"}, "test")
      })
    })
});