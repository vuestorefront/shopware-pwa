import { getPage } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("PageService - getPage", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return cmsPage for given path", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { cmsPage: { id: "b218f861361042f3a58a2a9d1b3575b5" } },
    });
    const result = await getPage("Sports/Grocery-Garden");
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith("/store-api/v1/pwa/page", {
      path: "Sports/Grocery-Garden",
    });
    expect(result).toHaveProperty("cmsPage");
    expect(result.cmsPage.id).toEqual("b218f861361042f3a58a2a9d1b3575b5");
  });
});
