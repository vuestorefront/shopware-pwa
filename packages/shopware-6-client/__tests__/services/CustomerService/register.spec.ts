import { name, address, random, phone, internet } from "faker";
import { when } from "jest-when";
import { register } from "../../../src/index";
import { getCustomerEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

const customerData = {
  salutationId: random.uuid(),
  firstName: name.firstName(),
  lastName: name.lastName(),
  password: internet.password(8),
  email: internet.email(),
  billingAddress: {
    countryId: random.uuid(),
    street: address.streetName(),
    zipcode: address.zipCode(),
    city: address.city(),
    phoneNumber: phone.phoneNumber()
  }
};

describe("CustomerService - register", () => {
  const customerId = random.uuid();
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should register the new customer with basic data provided", async () => {
    when(mockedAxios.post)
      .expectCalledWith(getCustomerEndpoint(), customerData)
      .mockReturnValueOnce({ data: customerId });
    const result = await register(customerData);
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(
      getCustomerEndpoint(),
      customerData
    );
    expect(result).toBe(customerId);
  });

  it("should never register a customer without billing address", async () => {
    delete customerData.billingAddress;

    when(mockedAxios.post.mockRejectedValue(new Error("400"))).expectCalledWith(
      getCustomerEndpoint(),
      customerData
    );

    expect(register(customerData)).rejects.toThrowError("400");
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(
      getCustomerEndpoint(),
      customerData
    );
  });
});
