import { getNavigation } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("NavigationService - getNavigation", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });
  it("should return navigation elements for given depth and rootNode", async () => {
    mockedPost.mockResolvedValueOnce({
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
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/store-api/v3/pwa/navigation", {
      depth: 1,
      rootNode: "5e0bf3a85da746e1ba2f9672910ea361",
    });
    expect(result).toHaveProperty("count");
    expect(result.children[0].id).toEqual("83e555dee2d2425eba42b7c628b65c67");
  });
});
