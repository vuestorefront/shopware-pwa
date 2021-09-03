import { getPage } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("PageService - getPage", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });
  it("should return cmsPage for given path", async () => {
    mockedPost.mockResolvedValueOnce({
      data: { cmsPage: { id: "b218f861361042f3a58a2a9d1b3575b5" } },
    });
    const result = await getPage("Sports/Grocery-Garden");
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/store-api/pwa/page", {
      path: "Sports/Grocery-Garden",
    });
    expect(result).toHaveProperty("cmsPage");
    expect(result.cmsPage.id).toEqual("b218f861361042f3a58a2a9d1b3575b5");
  });
});
