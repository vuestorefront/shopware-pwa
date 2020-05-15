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

  it("should return current customer's data - using correct token", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { id: "c370eb5cd1df4d4dbcc78f055b693e79" },
    });
    const result: any = await getCustomer();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      `${getCustomerEndpoint()}?associations[salutation][]`
    );
    expect(result).not.toBeNull();
    expect(result.id).toEqual("c370eb5cd1df4d4dbcc78f055b693e79");
  });

  it("should return null when user not logged in", async () => {
    mockedAxios.get.mockRejectedValueOnce({
      statusCode: 403,
    });
    const result = await getCustomer();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      `${getCustomerEndpoint()}?associations[salutation][]`
    );
    expect(result).toBeNull();
  });

  it("should throw an error on status code different than 403", async () => {
    mockedAxios.get.mockRejectedValueOnce({
      response: {
        status: 401,
      },
    });
    await expect(getCustomer()).rejects.toThrowError(
      "Unexpected getCustomerResponse."
    );
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      `${getCustomerEndpoint()}?associations[salutation][]`
    );
  });
});
