import {
  deleteCustomerAddress,
  login,
  update,
} from "@shopware-pwa/shopware-6-client";
import { address, name } from "faker";
import { createCustomerAddress } from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - CustomerService - createCustomerAddress", () => {
  beforeEach(() => {
    update({ contextToken: "" });
  });

  it("should created new customer address for logged user", async () => {
    await login({ username: "test.e2e@test.pl", password: "password" });
    const result: any = await createCustomerAddress({
      firstName: name.firstName(),
      lastName: name.lastName(),
      salutationId: "c370eb5cd1df4d4dbcc78f055b693e79",
      zipcode: address.zipCode(),
      city: address.city(),
      street: address.streetName(),
      salutation: "Mr",
      countryId: "38245a84c3d5425b8bac97fc845b5ddd",
    });
    await deleteCustomerAddress(result.data);
    result.data = "mockedCustomerAddressId";
    expect(result).toMatchSnapshot();
  });
});
