import { getApplicationContext } from "../src/appContext";

import vueComp, { reactive } from "vue-demi";
const mockedCompositionAPI = vueComp as jest.Mocked<typeof vueComp>;

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

const consoleWarnSpy = jest.spyOn(console, "warn");
const consoleErrorSpy = jest.spyOn(console, "error");

describe("Shopware composables - getAppContext", () => {
  let rootContextMock: any;

  beforeEach(() => {
    jest.resetAllMocks();

    rootContextMock = {
      $shopwareApiInstance: jest.fn(),
    };

    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: false,
      isVueScope: true,
    });

    mockedCompositionAPI.getCurrentInstance = jest.fn().mockReturnValue({
      proxy: rootContextMock,
    });
  });

  it("should return applicationContext with apiInstance", () => {
    const result = getApplicationContext({ contextName: "test3" });
    expect(result.apiInstance).toBe(rootContextMock.$shopwareApiInstance);
    expect(consoleErrorSpy).toBeCalledWith(
      "[Vue warn]: inject() can only be used inside setup() or functional components."
    );
  });

  it("should return alternative shopwareApiInstance from context", () => {
    rootContextMock.$shopwareApiInstance = 123;
    const result = getApplicationContext();
    expect(result.apiInstance).toEqual(123);
  });

  it("should return applicationContext with apiInstance", () => {
    mockedCompositionAPI.getCurrentScope = jest.fn().mockReturnValue({
      vm: rootContextMock,
    });
    mockedCompositionAPI.getCurrentInstance = jest.fn().mockReturnValue(null);
    const result = getApplicationContext({ contextName: "test4" });
    expect(result.apiInstance).toBe(rootContextMock.$shopwareApiInstance);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("should not fail on wrong getCurrentScope import", () => {
    mockedCompositionAPI.getCurrentScope = null as any;
    rootContextMock.$shopwareApiInstance = undefined;
    const result = getApplicationContext({ contextName: "test4" });
    expect(result.apiInstance).toBeUndefined();
    expect(consoleWarnSpy).toBeCalledWith(
      "[test4] Use createShopware method to setup composables."
    );
  });

  it("should return alternative router from context", () => {
    rootContextMock.router = 123;
    const result = getApplicationContext();
    expect(result.router).toEqual(123);
  });

  it("should return alternative i18n from context", () => {
    rootContextMock.i18n = 123;
    const result = getApplicationContext();
    expect(result.i18n).toEqual(123);
  });

  it("should return alternative cookies from context", () => {
    rootContextMock.cookies = 123;
    const result = getApplicationContext();
    expect(result.cookies).toEqual(123);
  });

  it("should return getCurrentInstance if rootContext is not provided", () => {
    rootContextMock.$shopwareApiInstance = undefined;
    mockedCompositionAPI.getCurrentInstance.mockReturnValue(null);
    const result = getApplicationContext({ contextName: "test1" });
    expect(result.apiInstance).toBe(undefined);
    expect(consoleWarnSpy).toBeCalledWith(
      "[test1] Use createShopware method to setup composables."
    );
  });

  it("should warn about not using createShopware method", () => {
    mockedCompositionAPI.getCurrentInstance.mockReturnValue(null);
    getApplicationContext();
    expect(consoleWarnSpy).toBeCalledWith(
      "[getApplicationContext] Use createShopware method to setup composables."
    );
  });

  it("should show console warning when rootContext is not provided", () => {
    rootContextMock.$shopwareApiInstance = undefined;
    getApplicationContext({ contextName: "test2" });
    expect(consoleWarnSpy).toBeCalledWith(
      "[test2] Use createShopware method to setup composables."
    );
  });

  it("should show console warning if rootContext doesn't contain apiInstance", () => {
    rootContextMock.$shopwareApiInstance = undefined;
    getApplicationContext({ contextName: "test3" });
    expect(consoleWarnSpy).toBeCalledWith(
      "[test3] Use createShopware method to setup composables."
    );
  });

  it("should add default key when not provided", () => {
    rootContextMock.$shopwareApiInstance = undefined;
    getApplicationContext();
    expect(consoleWarnSpy).toBeCalledWith(
      "[getApplicationContext] Use createShopware method to setup composables."
    );
  });

  it("should by default display isServer flag as false", () => {
    const { isServer } = getApplicationContext();
    expect(isServer).toEqual(false);
  });

  it("should show isServer as true when injected in context", () => {
    rootContextMock.isServer = true;
    const { isServer } = getApplicationContext();
    expect(isServer).toEqual(true);
  });

  it("should show isServer as true when process.server exist", () => {
    (process as any).server = true;
    const { isServer } = getApplicationContext();
    expect(isServer).toEqual(true);
  });

  describe("$shopware context", () => {
    it("should return apiInstance from $shopware context", () => {
      rootContextMock.$shopware = {
        apiInstance: "myInstance",
        state: reactive({}),
      };
      const { apiInstance } = getApplicationContext();
      expect(consoleWarnSpy).not.toBeCalled();
      expect(apiInstance).toEqual("myInstance");
    });

    it("should return shopwareDefaults from $shopware context", () => {
      rootContextMock.$shopware = {
        state: reactive({
          shopwareDefaults: "mockedValue",
        }),
      };
      const { shopwareDefaults } = getApplicationContext();
      expect(consoleWarnSpy).not.toBeCalled();
      expect(shopwareDefaults).toEqual("mockedValue");
    });

    it("should return interceptors from $shopware context", () => {
      rootContextMock.$shopware = {
        state: reactive({
          interceptors: "mockedValue",
        }),
      };
      const { interceptors } = getApplicationContext();
      expect(consoleWarnSpy).not.toBeCalled();
      expect(interceptors).toEqual("mockedValue");
    });

    it("should return sharedStore from $shopware context", () => {
      rootContextMock.$shopware = {
        state: reactive({
          sharedStore: "mockedValue",
        }),
      };
      const { sharedStore } = getApplicationContext();
      expect(consoleWarnSpy).not.toBeCalled();
      expect(sharedStore).toEqual("mockedValue");
    });

    it("should return devtools from $shopware context", () => {
      rootContextMock.$shopware = {
        state: reactive({}),
        devtools: "mockedValue",
      };
      const { devtools } = getApplicationContext();
      expect(consoleWarnSpy).not.toBeCalled();
      expect(devtools).toEqual("mockedValue");
    });
  });
});
