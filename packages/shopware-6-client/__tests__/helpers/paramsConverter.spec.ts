import { ParamsConverter } from "../../src/helpers/paramsConverter";

describe("ParamsConverter", () => {
  describe("getParams", () => {
    it("should returns null if no params provided", async () => {
      const paramsObject = ParamsConverter.getParams();
      expect(paramsObject).toBeNull();
    });
    it("should returns only pagination if no other params provided", async () => {
      const paramsObjectPage = ParamsConverter.getParams({ page: 1 });
      expect(paramsObjectPage).toHaveProperty("page");

      const paramsObjectLimit = ParamsConverter.getParams({ limit: 1 });
      expect(paramsObjectLimit).toHaveProperty("limit");

      const paramsObjectPageAndLimit = ParamsConverter.getParams({
        page: 1,
        limit: 5
      });
      expect(paramsObjectPageAndLimit).toHaveProperty("page");
      expect(paramsObjectPageAndLimit).toHaveProperty("limit");
    });
    it("should returns only sorting if no other params provided", async () => {
      const paramsObject = ParamsConverter.getParams(null, { sort: "-name" });
      expect(paramsObject).toHaveProperty("sort");
      expect(paramsObject).not.toBeNull();
      if (paramsObject) {
        expect(paramsObject.sort).toEqual("-name");
      } else {
        console.error(`there is no sort property included`);
      }
    });
    it("should returns filter property if any provided", async () => {
      const paramsObject = ParamsConverter.getParams(null, null, {
        filter: {}
      });
      expect(paramsObject).toHaveProperty("filter");
    });
    it("should returns all types of params if all provided", async () => {
      const paramsObject = ParamsConverter.getParams(
        { page: 1 },
        { sort: "name" },
        { filter: {} }
      );
      expect(paramsObject).toHaveProperty("page");
      expect(paramsObject).toHaveProperty("sort");
      expect(paramsObject).toHaveProperty("filter");
    });
  });
});
