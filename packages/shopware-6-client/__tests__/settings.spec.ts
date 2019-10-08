import { config, setup } from "../src/settings";

const DEFAULT_ENDPOINT = "https://jsonplaceholder.typicode.com";

describe("Settings", () => {
  beforeEach(() => {
    setup(); // we need to clean settings to default values before every test
  });

  it("should have default endpoint config", () => {
    expect(config.endpoint).toEqual(DEFAULT_ENDPOINT);
  });

  it("should change default endpoint after setup invocation", () => {
    setup({
      endpoint: "https://my-new-endpoint.com"
    });
    expect(config.endpoint).toEqual("https://my-new-endpoint.com");
  });

  it("should keep default endpoint between tests", () => {
    expect(config.endpoint).toEqual(DEFAULT_ENDPOINT);
  });
});
