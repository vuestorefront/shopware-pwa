import { apiService } from "../../../src/apiService";
import { pluginPost, pluginGet } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("PluginService - pluginPost", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should call apiService.post method with provided payload", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });

    const result = await pluginPost({
      code: "paypal",
      resource: "client-id",
      payload: {
        some: "payload",
      },
    });
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith("/pwa/plugin/paypal/client-id", {
      some: "payload",
    });
    expect(result.data.success).toEqual(true);
  });
});
describe("PluginService - pluginGet", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should call apiService.get method with provided resource", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { success: true } });

    const result = await pluginGet({
      code: "paypal",
      resource: "client-id",
    });
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith("/pwa/plugin/paypal/client-id");
    expect(result.data.success).toEqual(true);
  });
});
