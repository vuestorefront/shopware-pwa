import { defaultInstance } from "../../../src/apiService";
import { invokePost, invokeGet } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("PluginService - invokePost", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });
  it("should call contextInstance.invoke.post method with provided payload", async () => {
    mockedPost.mockResolvedValueOnce({ data: { success: true } });

    const result = await invokePost({
      address: "/some/post/endpoint",
      payload: {
        some: "payload",
      },
    });
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/some/post/endpoint", {
      some: "payload",
    });
    expect(result.data.success).toEqual(true);
  });
});
describe("PluginService - invokeGet", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });
  it("should call contextInstance.invoke.get method with provided resource", async () => {
    mockedGet.mockResolvedValueOnce({ data: { success: true } });

    const result = await invokeGet({
      address: "/some/get/endpoint",
    });
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith("/some/get/endpoint");
    expect(result.data.success).toEqual(true);
  });
});
