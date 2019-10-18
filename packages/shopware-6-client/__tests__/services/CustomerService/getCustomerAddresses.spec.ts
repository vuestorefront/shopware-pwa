import { random } from "faker";
import { when } from "jest-when";
import { getCustomerAddresses } from "../../../src/index";
import { getCustomerEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - register", () => {
  const customerToken = random.uuid();
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return object of addresses", async () => {
    when(mockedAxios.get)
      .expectCalledWith(`${getCustomerEndpoint()}/address`)
      .mockReturnValueOnce({ data: { data: {} } });
    const result = await getCustomerAddresses(customerToken);
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(`${getCustomerEndpoint()}/address`, {
      headers: { "sw-context-token": customerToken }
    });
    expect(result).toMatchObject({});
  });
});
