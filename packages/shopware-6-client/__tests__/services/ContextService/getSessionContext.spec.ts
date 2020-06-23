import { defaultInstance } from "../../../src/apiService";
import { getSessionContext } from "@shopware-pwa/shopware-6-client";
import { SessionContext } from "@shopware-pwa/commons/interfaces/response/SessionContext";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("ContextService - getSessionContext", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });
  it("should return sessionContext", async () => {
    mockedGet.mockResolvedValueOnce({ data: { token: "qwerty" } });

    const result: SessionContext = await getSessionContext();
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith("/store-api/v1/context");
    expect(result.token).toEqual("qwerty");
  });
});
