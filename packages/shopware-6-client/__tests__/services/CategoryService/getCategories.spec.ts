import { getCategories } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CategoryService - getCategories", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return array with categories", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { total: 22 } });

    const result = await getCategories();
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(
      "/sales-channel-api/v1/category",
      {}
    );
    expect(result.total).toEqual(22);
  });
});
