import { when } from "jest-when";
import { getCustomerAddress } from "../../../src/index";
import { getCustomerAddressEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - getCustomerAddress", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return address object", async () => {
    when(mockedAxios.get)
      .expectCalledWith(
        getCustomerAddressEndpoint("2bbb89dfa4664bc681e80b37eaa80fb7")
      )
      .mockReturnValueOnce({
        data: { data: { id: "2bbb89dfa4664bc681e80b37eaa80fb7" } }
      });
    const result = await getCustomerAddress("2bbb89dfa4664bc681e80b37eaa80fb7");
    expect(result.id).toEqual("2bbb89dfa4664bc681e80b37eaa80fb7");
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      getCustomerAddressEndpoint("2bbb89dfa4664bc681e80b37eaa80fb7"),
      {
        headers: { "sw-context-token": undefined }
      }
    );
  });

  it("rejects the promise if the customerId is incorrect", async () => {
    mockedAxios.get.mockRejectedValueOnce(
      new Error("400 - such addressId does not exist")
    );
    expect(getCustomerAddress("wrong-id")).rejects.toThrow(
      "400 - such addressId does not exist"
    );
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      getCustomerAddressEndpoint("wrong-id"),
      { headers: { "sw-context-token": undefined } }
    );
  });
});
