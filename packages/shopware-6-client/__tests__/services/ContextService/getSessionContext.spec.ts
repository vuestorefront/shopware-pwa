import { apiService } from "../../../src/apiService";
import { getSessionContext } from "@shopware-pwa/shopware-6-client";
import { SessionContext } from "@shopware-pwa/commons/interfaces/response/SessionContext";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ContextService - getSessionContext", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return sessionContext", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { token: "qwerty" } });

    const result: SessionContext = await getSessionContext();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith("/store-api/v1/context");
    expect(result.token).toEqual("qwerty");
  });
});
