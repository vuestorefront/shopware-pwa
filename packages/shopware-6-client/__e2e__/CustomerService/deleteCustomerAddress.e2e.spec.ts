import {
  createCustomerAddress,
  deleteCustomerAddress,
  login,
  update,
} from "@shopware-pwa/shopware-6-client";
import { address, name } from "faker";

describe("shopware-6-client - E2E - CustomerService - deleteCustomerAddress", () => {
  beforeEach(() => {
    update({ contextToken: "" });
  });

  it("should delete customer address with given id", async () => {
    await login({ username: "test.e2e@test.pl", password: "password" });
    const customerAddress: any = await createCustomerAddress({
      firstName: name.firstName(),
      lastName: name.lastName(),
      salutationId: "c370eb5cd1df4d4dbcc78f055b693e79",
      zipcode: address.zipCode(),
      city: address.city(),
      street: address.streetName(),
      countryId: "38245a84c3d5425b8bac97fc845b5ddd",
      salutation: "Mr",
    });
    const result = await deleteCustomerAddress(customerAddress.data);
    expect(result).toMatchSnapshot();
  });

  it("should return error deleting not existing customer address", async () => {
    try {
      await login({ username: "test.e2e@test.pl", password: "password" });
      await deleteCustomerAddress("qwa");
      expect("didn't throw an error").toEqual("should throw an error");
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});
