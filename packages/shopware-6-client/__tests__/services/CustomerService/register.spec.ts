import { name, address, random, phone, internet } from "faker";
import { register } from "@shopware-pwa/shopware-6-client";
import { getCustomerEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";
import { CustomerRegistrationParams } from "@shopware-pwa/commons/interfaces/request/CustomerRegistrationParams";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

let customerData: CustomerRegistrationParams;

describe("CustomerService - register", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    customerData = {
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
  });

  it("should register the new customer with basic data provided", async () => {
    const customerId = random.uuid();
    mockedAxios.post.mockResolvedValueOnce({ data: customerId });
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

    mockedAxios.post.mockRejectedValueOnce(new Error("400"));

    expect(register(customerData)).rejects.toThrowError("400");
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(
      getCustomerEndpoint(),
      customerData
    );
  });
});
