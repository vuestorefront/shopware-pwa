import { getApplicationContext } from "../src/appContext";

import vueComp from "vue-demi";
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
    expect(consoleErrorSpy).not.toHaveBeenCalled();
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
    const result = getApplicationContext({ contextName: "test4" });
    expect(result.apiInstance).toBe(rootContextMock.$shopwareApiInstance);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("should not fail on wrong getCurrentScope import", () => {
    mockedCompositionAPI.getCurrentScope = null as any;
    rootContextMock.$shopwareApiInstance = undefined;
    const result = getApplicationContext({ contextName: "test4" });
    expect(result.apiInstance).toBeUndefined();
    expect(consoleErrorSpy).toBeCalledWith("[test4] No Vue instance detected!");
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
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "[test1] No Vue instance detected!"
    );
  });

  it("should show console warning when rootContext is not provided", () => {
    rootContextMock.$shopwareApiInstance = undefined;
    getApplicationContext({ contextName: "test2" });
    expect(consoleWarnSpy).toBeCalledWith(
      "[SECURITY][test2] Trying to access Application context without Vue instance context. See https://shopware-pwa-docs.vuestorefront.io/landing/fundamentals/security.html#context-awareness"
    );
  });

  it("should show console warning if rootContext doesn't contain apiInstance", () => {
    rootContextMock.$shopwareApiInstance = undefined;
    getApplicationContext({ contextName: "test3" });
    expect(consoleWarnSpy).toBeCalledWith(
      "[SECURITY][test3] Trying to access Application context without Vue instance context. See https://shopware-pwa-docs.vuestorefront.io/landing/fundamentals/security.html#context-awareness"
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "[test3] No Vue instance detected!"
    );
  });

  it("should add default key when not provided", () => {
    rootContextMock.$shopwareApiInstance = undefined;
    getApplicationContext();
    expect(consoleWarnSpy).toBeCalledWith(
      "[SECURITY][getApplicationContext] Trying to access Application context without Vue instance context. See https://shopware-pwa-docs.vuestorefront.io/landing/fundamentals/security.html#context-awareness"
    );
  });

  it("should display performance warning when Vuex store is active", () => {
    rootContextMock.$store = {};
    getApplicationContext();
    expect(consoleWarnSpy).toBeCalledWith(
      '[PERFORMANCE][getApplicationContext] Vuex store detected. Remove "store" directory and useSharedState instead.'
    );
  });

  it("should display performance warning when Vuex store is active", () => {
    rootContextMock.store = {};
    getApplicationContext();
    expect(consoleWarnSpy).toBeCalledWith(
      '[PERFORMANCE][getApplicationContext] Vuex store detected. Remove "store" directory and useSharedState instead.'
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
});
