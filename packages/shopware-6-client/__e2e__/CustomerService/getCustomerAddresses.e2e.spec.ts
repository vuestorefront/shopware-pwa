import {
  update,
  login,
  getCustomerAddresses
} from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - CustomerService - getCustomerAddresses", () => {
  beforeEach(() => {
    update({ contextToken: "" });
  });

  it("should fetch customer addresses but test only one from array", async () => {
    await login({ username: "test.e2e@test.pl", password: "password" });
    const result = await getCustomerAddresses();
    const fakedResult = result
      .map((address: any) => {
        address._uniqueIdentifier = "mockedUniqueIdentifier";
        address.city = "mockedCity";
        address.createdAt = "mockedCreatedAt";
        address.zipcode = "mockedZipcode";
        address.street = "mockedStreet";
        address.firstName = "mockedFirstName";
        address.lastName = "mockedLastName";
        address.id = "mockedId";
        return address;
      })
      .shift();
    expect(fakedResult).toMatchSnapshot();
  });

  it("should return error when fetching customer addresses without logged user", async () => {
    try {
      await getCustomerAddresses();
      expect("didn't throw an error").toEqual("should throw an error");
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});
