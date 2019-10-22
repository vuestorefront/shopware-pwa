import { getCustomer, update, config } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";
import { getCustomerEndpoint } from "../../../src/endpoints";
import { random } from "faker";
jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - getCustomer", () => {
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

  it("should an current customer's data - using correct token", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { data: { id: "c370eb5cd1df4d4dbcc78f055b693e79" } }
    });
    const result = await getCustomer();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(getCustomerEndpoint());
    expect(result.id).toEqual("c370eb5cd1df4d4dbcc78f055b693e79");
  });

  it("should an current customer's data - using incorrect token", async () => {
    mockedAxios.get.mockRejectedValue(new Error());
    expect(getCustomer()).rejects.toThrow();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(getCustomerEndpoint());
  });
});
