import { getApplicationContext } from "@shopware-pwa/composables";
const consoleWarnSpy = jest.spyOn(console, "warn");

describe("Shopware composables - getAppContext", () => {
  const rootContextMock = {
    $store: jest.fn(),
    $shopwareApiInstance: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
    consoleWarnSpy.mockImplementationOnce(() => {});
  });

  it("should return applicationContext with apiInstance", () => {
    const result = getApplicationContext("test1", rootContextMock);
    expect(result.apiInstance).toBe(rootContextMock.$shopwareApiInstance);
  });

  it("should return getCurrentInstance if rootContext is not provided", () => {
    const result = getApplicationContext("test1", null);
    expect(result.apiInstance).toBe(undefined);
  });

  it("should show console warning when rootContext is not provided", () => {
    getApplicationContext("test1", null);
    expect(consoleWarnSpy).toBeCalledWith(
      "[SECURITY][test1] Trying to access Application context without Vue instance context."
    );
  });

  it("should show console warning if rootContext doesn't contain apiInstance", () => {
    getApplicationContext("test2", {});
    expect(consoleWarnSpy).toBeCalledWith(
      "[SECURITY][test2] Trying to access Application context without Vue instance context."
    );
  });
});
