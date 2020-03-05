import { addThemeLayouts } from "../src/layouts";
import * as files from "../src/files";
import { NuxtModuleOptions } from "../src/interfaces";
import jetpack from "fs-jetpack";

jest.mock("../src/files");
const mockedFiles = files as jest.Mocked<typeof files>;
const { getAllFiles } = mockedFiles;

jest.mock("fs-jetpack");
const mockedJetpack = jetpack as jest.Mocked<typeof jetpack>;

describe("nuxt-module - addThemeLayouts", () => {
  const moduleObject: NuxtModuleOptions = {
    options: {
      rootDir: __dirname
    },
    addLayout: jest.fn(),
    addPlugin: jest.fn(),
    extendBuild: jest.fn(),
    extendRoutes: jest.fn(),
    nuxt: jest.fn()
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should not add layouts if there are none of them", () => {
    getAllFiles.mockImplementationOnce(() => []);
    addThemeLayouts(moduleObject);
    expect(moduleObject.addLayout).not.toBeCalled();
  });

  it("should add layout if override does not exist", () => {
    getAllFiles.mockImplementationOnce(() => [
      `${__dirname}/node_modules/@shopware-pwa/default-theme/layouts/SomeTest.vue`
    ]);
    addThemeLayouts(moduleObject);
    expect(moduleObject.addLayout).toBeCalledWith(
      {
        src: `${__dirname}/node_modules/@shopware-pwa/default-theme/layouts/SomeTest.vue`
      },
      "SomeTest"
    );
  });

  it("should not override layout if override exist", () => {
    getAllFiles.mockImplementationOnce(() => [
      `${__dirname}/node_modules/@shopware-pwa/default-theme/layouts/SomeTest.vue`
    ]);
    mockedJetpack.exists.mockReturnValueOnce("file");
    addThemeLayouts(moduleObject);
    expect(mockedJetpack.exists).toBeCalledWith(
      `${__dirname}/layouts/SomeTest.vue`
    );
    expect(moduleObject.addLayout).not.toBeCalled();
  });

  it("should not add layout if templateName could not be resolved", () => {
    getAllFiles.mockImplementationOnce(() => [
      `${__dirname}/node_modules/@shopware-pwa/default-theme/FAKEEEEE/SomeTest.vue`
    ]);
    mockedJetpack.exists.mockReturnValueOnce("file");
    addThemeLayouts(moduleObject);
    expect(mockedJetpack.exists).toBeCalled();
    expect(moduleObject.addLayout).not.toBeCalled();
  });
});
