import { when } from "jest-when";
import { address, name, random } from "faker";
import { createCustomerAddress } from "../../../src/index";
import { getCustomerAddressEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - createCustomerAddress", () => {
  const newAddressData = {
    countryId: random.uuid(),
    salutationId: random.uuid(),
    firstName: name.firstName(),
    lastName: name.lastName(),
    zipcode: address.zipCode(),
    city: address.city(),
    street: address.streetName()
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return created address id", async () => {
    when(mockedAxios.post)
      .expectCalledWith(getCustomerAddressEndpoint(), newAddressData)
      .mockReturnValueOnce({ data: "2bbb89dfa4664bc581e80b37eaa80fb7" });
    const result = await createCustomerAddress(newAddressData);
    expect(result).toEqual("2bbb89dfa4664bc581e80b37eaa80fb7");
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(
      getCustomerAddressEndpoint(),
      newAddressData,
      {
        headers: { "sw-context-token": undefined }
      }
    );
  });
});
