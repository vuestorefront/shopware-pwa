import { getApplicationContext } from "@shopware-pwa/composables";
const consoleWarnSpy = jest.spyOn(console, "warn");

describe("Shopware composables - getAppContext", () => {
  const rootContextMock: any = {
    $store: jest.fn(),
    $shopwareApiInstance: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
    consoleWarnSpy.mockImplementationOnce(() => {});
  });

  it("should return applicationContext with apiInstance", () => {
    const result = getApplicationContext(rootContextMock, "test1");
    expect(result.apiInstance).toBe(rootContextMock.$shopwareApiInstance);
  });

  it("should return alternative shopwareApiInstance from context", () => {
    const rootContextMock: any = {
      shopwareApiInstance: 123,
    };
    const result = getApplicationContext(rootContextMock);
    expect(result.apiInstance).toEqual(123);
  });

  it("should return alternative store from context", () => {
    const rootContextMock: any = {
      $shopwareApiInstance: jest.fn(),
      store: 123,
    };
    const result = getApplicationContext(rootContextMock);
    expect(result.vuexStore).toEqual(123);
  });

  it("should return alternative router from context", () => {
    const rootContextMock: any = {
      $shopwareApiInstance: jest.fn(),
      router: 123,
    };
    const result = getApplicationContext(rootContextMock);
    expect(result.router).toEqual(123);
  });

  it("should return alternative i18n from context", () => {
    const rootContextMock: any = {
      $shopwareApiInstance: jest.fn(),
      i18n: 123,
    };
    const result = getApplicationContext(rootContextMock);
    expect(result.i18n).toEqual(123);
  });

  it("should return alternative cookies from context", () => {
    const rootContextMock: any = {
      $shopwareApiInstance: jest.fn(),
      cookies: 123,
    };
    const result = getApplicationContext(rootContextMock);
    expect(result.cookies).toEqual(123);
  });

  it("should return getCurrentInstance if rootContext is not provided", () => {
    const result = getApplicationContext(null as any, "test1");
    expect(result.apiInstance).toBe(undefined);
  });

  it("should show console warning when rootContext is not provided", () => {
    getApplicationContext(null as any, "test1");
    expect(consoleWarnSpy).toBeCalledWith(
      "[SECURITY][test1] Trying to access Application context without Vue instance context. See https://shopware-pwa-docs.vuestorefront.io/landing/fundamentals/#context-awareness"
    );
  });

  it("should show console warning if rootContext doesn't contain apiInstance", () => {
    getApplicationContext({} as any, "test2");
    expect(consoleWarnSpy).toBeCalledWith(
      "[SECURITY][test2] Trying to access Application context without Vue instance context. See https://shopware-pwa-docs.vuestorefront.io/landing/fundamentals/#context-awareness"
    );
  });

  it("should add default key when not provided", () => {
    getApplicationContext(null as any);
    expect(consoleWarnSpy).toBeCalledWith(
      "[SECURITY][getApplicationContext] Trying to access Application context without Vue instance context. See https://shopware-pwa-docs.vuestorefront.io/landing/fundamentals/#context-awareness"
    );
  });
});
