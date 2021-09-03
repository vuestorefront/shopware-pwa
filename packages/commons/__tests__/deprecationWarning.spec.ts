import { deprecationWarning } from "@shopware-pwa/commons";
describe("commons", () => {
  const originalWarn = console.warn;
  afterEach(() => (console.warn = originalWarn));
  const OLD_ENV = process.env;

  describe("deprecationWarning", () => {
    beforeEach(() => {
      process.env = { ...OLD_ENV };
    });
    afterAll(() => {
      process.env = OLD_ENV;
    });

    it("should invoke console.warn in NODE_ENV other than production", () => {
      const mockedWarn = jest.fn();
      console.warn = mockedWarn;
      process.env.NODE_ENV = "dev";
      deprecationWarning({
        packageName: "helpers",
        methodName: "oldMethodName",
        newMethodName: "myNewMethod",
      });

      expect(mockedWarn).toBeCalledWith(
        `[DEPRECATED][@shopware-pwa/helpers][oldMethodName] This method has been deprecated. Use "myNewMethod" instead.`
      );
    });
    it("should invoke console.warn in NODE_ENV other than production", () => {
      const mockedWarn = jest.fn();
      console.warn = mockedWarn;
      process.env.NODE_ENV = "production";
      deprecationWarning({
        packageName: "helpers",
        methodName: "oldMethodName",
        newMethodName: "myNewMethod",
      });

      expect(mockedWarn).not.toBeCalled();
    });
  });
});
