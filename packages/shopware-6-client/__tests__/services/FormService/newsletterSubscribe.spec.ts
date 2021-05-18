import { newsletterSubscribe } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("FormService - newsletterSubscribe", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });

  it("should invoke correct API endpoint with given parameters", async () => {
    await newsletterSubscribe({
      email: "john@doe.com",
      option: "subscribe",
      storefrontUrl: "https://shopware6-demo.vuestorefront.io",
    });
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/store-api/newsletter/subscribe", {
      email: "john@doe.com",
      option: "subscribe",
      storefrontUrl: "https://shopware6-demo.vuestorefront.io",
    });
  });

  it("should throw an error when data is incorrect", async () => {
    mockedPost.mockRejectedValueOnce(new Error("400"));
    expect(newsletterSubscribe({} as any)).rejects.toThrowError("400");
    expect(mockedPost).toBeCalledWith("/store-api/newsletter/subscribe", {
      option: "subscribe",
    });
  });
});
