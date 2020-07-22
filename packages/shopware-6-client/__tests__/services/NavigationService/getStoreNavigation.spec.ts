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
    });
    expect(mockedPost).toBeCalledTimes(1);
    expect(
      mockedPost
    ).toBeCalledWith(
      "/store-api/v1/navigation/footer-navigation/footer-navigation",
      { limit: 10 }
    );
    expect(result).toStrictEqual([{ id: "footer-navigation" }]);
  });
});
