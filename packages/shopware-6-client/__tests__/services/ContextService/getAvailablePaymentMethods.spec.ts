import { defaultInstance } from "../../../src/apiService";
import { getAvailablePaymentMethods } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("ContextService - getAvailablePaymentMethods", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });
  it("should return array with payment methods", async () => {
    mockedGet.mockResolvedValueOnce({ data: [{ id: 1 }, { id: 2 }] });

    const result = await getAvailablePaymentMethods();
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith("/store-api/v3/payment-method", {
      params: {},
    });
    expect(result).toHaveLength(2);
  });
});
