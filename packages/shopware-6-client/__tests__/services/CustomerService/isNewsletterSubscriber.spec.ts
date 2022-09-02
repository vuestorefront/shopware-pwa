import { defaultInstance } from "../../../src/apiService";
import { isNewsletterSubscriber } from "@shopware-pwa/shopware-6-client";
import { getNewsletterRecipientEnpoint } from "../../../src/endpoints";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CustomerService - isNewsletterSubscriber", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });

  it("returns no data if successfully updated", async () => {
    mockedPost.mockResolvedValueOnce({
      status: "undefined",
      apiAlias: "account_newsletter_recipient",
    });
    const result = await isNewsletterSubscriber();

    expect(result).toBeFalsy();
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(getNewsletterRecipientEnpoint());
  });
});
