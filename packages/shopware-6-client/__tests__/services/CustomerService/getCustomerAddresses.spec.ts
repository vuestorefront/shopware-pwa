import { random } from "faker";
import {
  getCustomerAddresses,
  update,
  config,
} from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - register", () => {
  let contextToken: string;
  beforeEach(() => {
    jest.resetAllMocks();
    contextToken = random.uuid();
    update({ contextToken });
  });
  afterEach(() => {
    afterEach(() => {
      expect(config.contextToken).toEqual(contextToken);
    });
  });

  it("should return object of addresses", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { data: {} } });
    const result = await getCustomerAddresses();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      `/sales-channel-api/v1/customer/address`
    );
    expect(result).toMatchObject({});
  });
});
