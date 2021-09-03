import { getStoreNavigation } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("NavigationService - getStoreNavigation", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });
  it("should return navigation elements for given navigation ids", async () => {
    mockedPost.mockResolvedValueOnce({
      data: [
        {
          id: "footer-navigation",
        },
      ],
    });
    const result = await getStoreNavigation({
      requestActiveId: "footer-navigation",
      requestRootId: "footer-navigation",
      depth: 5,
      buildTree: false,
    });
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(
      "/store-api/navigation/footer-navigation/footer-navigation",
      { buildTree: false, depth: 5 }
    );
    expect(result).toStrictEqual([{ id: "footer-navigation" }]);
  });
});
