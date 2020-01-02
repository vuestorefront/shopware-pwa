import {
  createCustomerAddress,
  deleteCustomerAddress,
  login,
  setDefaultCustomerShippingAddress,
  update
} from "@shopware-pwa/shopware-6-client";
import {address, name} from "faker";

describe("shopware-6-client - E2E - CustomerService - setDefaultCustomerShippingAddress", () => {
  beforeEach(() => {
    update({ contextToken: "" })
  });

  it("should set provided address as default shipping address", async () => {
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
    const result: any = await setDefaultCustomerShippingAddress(customerAddress.data);
    await setDefaultCustomerShippingAddress("c03217761a5847c19ea3d9801dd2bb7d");
    await deleteCustomerAddress(customerAddress.data);
    result.data = "mockedCustomerAddressId";
    expect(result).toMatchSnapshot();
  });

  it("should return error when deleting not existing shipping address", async () => {
    try {
      await login({ username: "test.e2e@test.pl", password: "password" });
      await setDefaultCustomerShippingAddress("qwa");
      expect("didn't throw an error").toEqual("should throw an error");
    } catch(e) {
      expect(e).toMatchSnapshot();
    }
  });
});