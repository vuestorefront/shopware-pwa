import { getParams } from "../../src/helpers/paramsConverter";

describe("ParamsConverter", () => {
  describe("getParams", () => {
    it("should returns empty object if no params provided", async () => {
      const paramsObject = getParams();
      expect(paramsObject).toEqual({});
    });
    it("should returns only pagination if no other params provided", async () => {
      const paramsObjectPage = getParams({ pagination: { page: 1 } });
      expect(paramsObjectPage).toHaveProperty("page");

      const paramsObjectLimit = getParams({ pagination: { limit: 1 } });
      expect(paramsObjectLimit).toHaveProperty("limit");

      const paramsObjectPageAndLimit = getParams({
        pagination: {
          page: 1,
          limit: 5
        }
      });
      expect(paramsObjectPageAndLimit).toHaveProperty("page");
      expect(paramsObjectPageAndLimit).toHaveProperty("limit");
    });
    // it("should returns only sorting if no other params provided", async () => {
    //   const paramsObject = getParams(null, { sort: "-name" });
    //   expect(paramsObject).toHaveProperty("sort");
    //   expect(paramsObject).not.toBeNull();
    //   if (paramsObject) {
    //     expect(paramsObject.sort).toEqual("-name");
    //   } else {
    //     console.error(`there is no sort property included`);
    //   }
    // });
    it("should returns filter property if any provided", async () => {
      const paramsObject = getParams({
        filters: []
      });
      expect(paramsObject).toEqual({});
    });
    it("should returns all types of params if all provided", async () => {
      const paramsObject = getParams({
        pagination: { page: 1 },
        // { sort: "name" },
        filters: []
      });
      expect(paramsObject).toHaveProperty("page");
      // expect(paramsObject).toHaveProperty("sort");
      // expect(paramsObject).toHaveProperty("filter");
    });
  });
});
