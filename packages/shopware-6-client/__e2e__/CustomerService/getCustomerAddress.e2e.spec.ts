import {
  update,
  login,
  getCustomerAddress,
  createCustomerAddress,
  deleteCustomerAddress
} from "@shopware-pwa/shopware-6-client";
import {address, name} from "faker";

describe("shopware-6-client - E2E - CustomerService - getCustomerAddress", () => {
  beforeEach(() => {
    update({ contextToken: "" })
  });

  it("should fetch customer address for given address id", async () => {
    await login({username: "test.e2e@test.pl", password: "password"});
    const customerAddress: any = await createCustomerAddress({
      firstName: name.firstName(),
      lastName: name.lastName(),
      salutationId: "c370eb5cd1df4d4dbcc78f055b693e79",
      zipcode: address.zipCode(),
      city: address.city(),
      street: address.streetName(),
      salutation: "Mr",
      countryId: "38245a84c3d5425b8bac97fc845b5ddd",
    });
    const result: any = await getCustomerAddress(customerAddress.data);
    await deleteCustomerAddress(customerAddress.data);
    result._uniqueIdentifier = "mockedUniqueIdentifier";
    result.city = "mockedCity";
    result.createdAt = "mockedCreatedAt";
    result.zipcode = "mockedZipcode";
    result.street = "mockedStreet";
    result.firstName = "mockedFirstName";
    result.lastName = "mockedLastName";
    result.id = "mockedId";
    expect(result).toMatchSnapshot();
  });

  it("should return error for address id that not matches any address", async () => {
    try {
      await login({ username: "test.e2e@test.pl", password: "password" });
      await getCustomerAddress('qwa');
      expect("didn't throw an error").toEqual("should throw an error");
    } catch(e) {
      expect(e).toMatchSnapshot();
    }
  });

  it("should not fetch address for unlogged user", async () => {
    try {
      await getCustomerAddress('ed9e8daeae9a46cf84abf4141fc5d106');
      expect("didn't throw an error").toEqual("should throw an error");
    } catch(e) {
      expect(e).toMatchSnapshot();
    }
  });
});