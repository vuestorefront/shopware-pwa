import { getSeoUrl } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("PageService - getSeoUrl", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });
  it("should return seo url entities for given criteria", async () => {
    mockedPost.mockResolvedValueOnce({
      data: { elements: [{ id: "b218f861361042f3a58a2a9d1b3575b5" }] },
    });
    const result = await getSeoUrl({
      limit: 3,
    });
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/store-api/seo-url", {
      limit: 3,
    });
    expect(result).toHaveProperty("elements");
  });
});
