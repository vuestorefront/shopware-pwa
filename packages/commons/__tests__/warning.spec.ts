import { warning } from "@shopware-pwa/commons";
describe("commons", () => {
  const originalWarn = console.warn;
  afterEach(() => (console.warn = originalWarn));
  const OLD_ENV = process.env;

  describe("warning", () => {
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
      warning({
        packageName: "helpers",
        methodName: "warning",
        notes: "some warning",
      });

      expect(mockedWarn).toBeCalledWith(
        "[WARNING][@shopware-pwa/helpers][warning]: some warning"
      );
    });
    it("should invoke console.warn in NODE_ENV other than production", () => {
      const mockedWarn = jest.fn();
      console.warn = mockedWarn;
      process.env.NODE_ENV = "production";
      warning({
        packageName: "helpers",
        methodName: "warning",
        notes: "some warning",
      });

      expect(mockedWarn).not.toBeCalled();
    });
  });
});
