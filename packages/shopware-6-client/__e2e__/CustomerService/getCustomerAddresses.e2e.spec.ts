import { update, login, getCustomerAddresses } from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - CustomerService - getCustomerAddresses", () => {
  beforeEach(() => {
    update({ contextToken: "" })
  });

  it("should fetch customer addresses", async () => {
    await login({ username: "test.e2e@test.pl", password: "password" });
    const result = await getCustomerAddresses();
    expect(result).toMatchSnapshot();
  });

  it("should return error when fetching customer addresses without logged user", async () => {
    try {
      await getCustomerAddresses();
      expect("didn't throw an error").toEqual("should throw an error");
    } catch(e) {
      expect(e).toMatchSnapshot();
    }
  });
});