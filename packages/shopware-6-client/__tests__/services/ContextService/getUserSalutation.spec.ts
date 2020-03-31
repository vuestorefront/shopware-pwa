import { apiService } from "../../../src/apiService";
import { getUserSalutation } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ContextService - getUserCountry", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return user salutation object", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { displayName: "Mrs." } });

    const salutationId = "123123123";
    const result = await getUserSalutation(salutationId);
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(`/salutation/${salutationId}`);
    expect(result.displayName).toEqual("Mrs.");
  });
});
