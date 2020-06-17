import { apiService } from "../../../src/apiService";
import { invokePost, invokeGet } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("PluginService - invokePost", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should call contextInstance.invoke.post method with provided payload", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });

    const result = await invokePost({
      address: "/some/post/endpoint",
      payload: {
        some: "payload",
      },
    });
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith("/some/post/endpoint", {
      some: "payload",
    });
    expect(result.data.success).toEqual(true);
  });
});
describe("PluginService - invokeGet", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should call contextInstance.invoke.get method with provided resource", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { success: true } });

    const result = await invokeGet({
      address: "/some/get/endpoint",
    });
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith("/some/get/endpoint");
    expect(result.data.success).toEqual(true);
  });
});
