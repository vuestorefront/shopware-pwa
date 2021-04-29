import { defaultInstance } from "../../../src/apiService";
import { getUserSalutation } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("ContextService - getUserCountry", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });
  it("should return user salutation object", async () => {
    mockedGet.mockResolvedValueOnce({
      data: { elements: [{ displayName: "Mrs." }] },
    });

    const salutationId = "123123123";
    const result = await getUserSalutation(salutationId);
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith("/store-api/salutation", {
      params: { "filter[id]": salutationId },
    });
    expect(result.displayName).toEqual("Mrs.");
  });
  it("should not return user salutation object if the response does not contain any data", async () => {
    mockedGet.mockResolvedValueOnce({
      data: undefined,
    });

    const result = await getUserSalutation("12345");
    expect(result).toBeUndefined();
  });
});
