import { getQueryString } from "../../src/helpers/queryParamsBuilder";

describe("queryParamsBuilder - getQueryString", () => {
  it("should return converted parameters if given params is not in a string type", () => {
    const searchCriteria = {
      page: 1,
      sort: "-name",
    };

    const result = getQueryString(searchCriteria);
    expect(result).toStrictEqual("page=1&sort=-name");
  });
  it("should return given string as it is", () => {
    const searchCriteria = "?page=1";

    const result = getQueryString(searchCriteria);
    expect(result).toStrictEqual("?page=1");
  });
});
