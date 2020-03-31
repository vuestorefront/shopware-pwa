import { getNavigation } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("NavigationService - getNavigation", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return navigation elements for given depth and rootNode", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        count: 1,
        children: [
          {
            id: "83e555dee2d2425eba42b7c628b65c67",
            path: "/navigation/83e555dee2d2425eba42b7c628b65c67",
            name: "Music",
            children: null,
            count: 9,
            level: 1,
            extensions: [],
          },
        ],
      },
    });
    const result = await getNavigation({
      depth: 1,
      rootNode: "5e0bf3a85da746e1ba2f9672910ea361",
    });
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith("/store-api/v1/pwa/navigation", {
      depth: 1,
      rootNode: "5e0bf3a85da746e1ba2f9672910ea361",
    });
    expect(result).toHaveProperty("count");
    expect(result.children[0].id).toEqual("83e555dee2d2425eba42b7c628b65c67");
  });
});
