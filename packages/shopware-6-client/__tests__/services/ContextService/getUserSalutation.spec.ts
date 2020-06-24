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
    mockedGet.mockResolvedValueOnce({ data: { displayName: "Mrs." } });

    const salutationId = "123123123";
    const result = await getUserSalutation(salutationId);
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith(
      `/store-api/v1/salutation/${salutationId}`
    );
    expect(result.displayName).toEqual("Mrs.");
  });
});
