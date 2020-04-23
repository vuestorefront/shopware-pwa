import { parseUrlQuery, exportUrlQuery } from "@shopware-pwa/helpers";
const consoleErrorSpy = jest.spyOn(console, "error");
consoleErrorSpy.mockImplementation(() => {});
describe("Shopware helpers - urlHelpers", () => {
  describe("parseUrlQuery", () => {
    it("should return an empty object for empty query", () => {
      const result = parseUrlQuery(undefined as any);
      expect(result).toEqual({});
    });
    it("should return proper searchCriteria for provided params", () => {
      const queryJson = {
        size: JSON.stringify(["xl", "xxl"]),
      };
      const result = parseUrlQuery(queryJson);
      expect(result).toEqual({
        size: ["xl", "xxl"],
      });
    });

    it("should show an error when there is a problem with parsing param without failing", () => {
      const queryJson = {
        size: JSON.stringify(["xl", "xxl"]),
        currencyId: "qweq",
      };
      const result = parseUrlQuery(queryJson);
      expect(result).toEqual({
        size: ["xl", "xxl"],
      });
      expect(consoleErrorSpy).toBeCalledWith(
        "[helpers][parseUrlQuery] Problem with resolving url param: currencyId"
      );
    });
  });

  describe("exportUrlQuery", () => {
    it("should return an empty object for empty query", () => {
      const result = exportUrlQuery(undefined as any);
      expect(result).toEqual(undefined);
    });

    it("should return stringified", () => {
      const searchCriteria: any = {
        filters: [
          {
            field: "size",
            type: "equals",
            value: "xl",
          },
        ],
      };
      const result = exportUrlQuery(searchCriteria);

      expect(result).toEqual(
        "filters=%5B%7B%22field%22%3A%22size%22%2C%22type%22%3A%22equals%22%2C%22value%22%3A%22xl%22%7D%5D"
      );
    });
  });
});
