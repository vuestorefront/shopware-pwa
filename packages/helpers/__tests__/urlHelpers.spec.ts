import { _parseUrlQuery, exportUrlQuery } from "@shopware-pwa/helpers";
const consoleErrorSpy = jest.spyOn(console, "error");
consoleErrorSpy.mockImplementation(() => {});
describe("Shopware helpers - urlHelpers", () => {
  describe("parseUrlQuery", () => {
    it("should return an empty object for empty query", () => {
      const result = _parseUrlQuery(undefined as any);
      expect(result).toEqual({});
    });
    it("should return proper searchCriteria for provided params", () => {
      const queryJson = {
        size: JSON.stringify(["xl", "xxl"]),
      };
      const result = _parseUrlQuery(queryJson);
      expect(result).toEqual({
        size: ["xl", "xxl"],
      });
    });

    it("should parse element if it's an array", () => {
      const queryJson = {
        size: JSON.stringify(["xl", "xxl"]),
      };
      const result = _parseUrlQuery(queryJson);
      expect(result).toEqual({
        size: ["xl", "xxl"],
      });
    });

    it("should parse element if it's an object", () => {
      const queryJson = {
        size: JSON.stringify({ xl: "qwe" }),
      };
      const result = _parseUrlQuery(queryJson);
      expect(result).toEqual({
        size: { xl: "qwe" },
      });
    });

    it("should not try to parse element if it's not JSON string and add it to output", () => {
      const queryJson = {
        currencyId: "qweq",
      };
      const result = _parseUrlQuery(queryJson);
      expect(result).toEqual({
        currencyId: "qweq",
      });
    });

    it("should not try to parse element if it's not a string and add it to output", () => {
      const queryJson = {
        someId: 123,
      };
      const result = _parseUrlQuery(queryJson);
      expect(result).toEqual({
        someId: 123,
      });
    });

    it("should show an error if element is not a valid JSON", () => {
      const queryJson = {
        size: "['xl', 'xxl']",
      };
      const result = _parseUrlQuery(queryJson);
      expect(result).toEqual({});
      expect(consoleErrorSpy).toBeCalledWith(
        "[helpers][parseUrlQuery] Problem with resolving url param: size"
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
