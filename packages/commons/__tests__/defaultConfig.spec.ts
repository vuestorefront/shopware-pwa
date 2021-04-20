import {
  getCurrentSupportedApiVersion,
  getCompatibilityTable,
  CompatibilityTable,
} from "@shopware-pwa/commons";
import compatibilityTable from "../../../compatibility.json";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("defaultConfig", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("getCurrentSupportedApiVersion", () => {
    it("should return proper version", () => {
      expect(getCurrentSupportedApiVersion()).toEqual(
        compatibilityTable.shopwareApiVersion
      );
    });
  });

  describe("getCompatibilityTable", () => {
    it("should return compatibility table from GitHub repo", async () => {
      const mockedCompatibilityResponse: Partial<CompatibilityTable> = {
        shopwareApiVersion: "1.2.3",
      };
      mockedAxios.get.mockResolvedValueOnce({
        data: mockedCompatibilityResponse,
      });
      const result = await getCompatibilityTable();
      expect(result.shopwareApiVersion).toEqual(
        mockedCompatibilityResponse.shopwareApiVersion
      );
    });

    it("should return default compatibility table when cannoct load from github", async () => {
      mockedAxios.get.mockRejectedValueOnce("some error message");
      const result = await getCompatibilityTable();
      expect(result).toEqual(compatibilityTable);
    });
  });
});
