import { register } from "@shopware-pwa/shopware-6-client";
import { name, address, internet } from 'faker';

describe("shopware-6-client - E2E - CustomerService - register", () => {
  it("should register new customer", async() => {
    const result: any = await register({
      firstName: name.firstName(),
      lastName: name.lastName(),
      password: internet.password(),
      salutationId: "c370eb5cd1df4d4dbcc78f055b693e79",
      email: internet.email(),
      billingAddress: {
        firstName: name.firstName(),
        lastName: name.lastName(),
        salutationId: "c370eb5cd1df4d4dbcc78f055b693e79",
        countryId: "38245a84c3d5425b8bac97fc845b5ddd",
        zipcode: address.zipCode(),
        city: address.city(),
        street: address.streetName(),
        salutation: "Mr",
      }
    });
    result.data = "mockedCustomerId";
    expect(result).toMatchSnapshot();
  });
});
