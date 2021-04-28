import { defaultInstance } from "../../../src/apiService";
import { getShippingMethodDetails } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("ContextService - getShippingMethodDetails", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });
  it("should return an object of specific shipping method details", async () => {
    mockedGet.mockResolvedValueOnce({
      data: {
        elements: [
          {
            id: "dhl",
          },
        ],
      },
    });

    const result = await getShippingMethodDetails("dhl");
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith("/store-api/shipping-method", {
      params: { "filter[id]": "dhl" },
    });
    expect(result).toHaveProperty("id");
    expect(result.id).toBe("dhl");
  });
  it("should return undefined if the response does not contain specific data", async () => {
    mockedGet.mockResolvedValueOnce({
      data: undefined,
    });

    const result = await getShippingMethodDetails("dhl");
    expect(result).toBeUndefined();
  });
});
