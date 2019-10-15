import { CategoryService } from "../src/index";
import { apiService } from "../src/apiService";

jest.mock("../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CategoryService", () => {
  describe("getCategories", () => {
    it("should return array with categories", async () => {
      mockedAxios.get.mockResolvedValue({ data: { total: 22 } });

      const result = await CategoryService.getCategories();
      expect(result.total).toEqual(22);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });
  });
});
