import { update, login, getCustomer } from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - CustomerService - getCustomer", () => {
  beforeEach(() => {
    update({ contextToken: "" });
  });

  it("should get current customer info", async () => {
    await login({ username: "test.e2e@test.pl", password: "password" });
    const result: any = await getCustomer();
    result.lastLogin = "mockedDate";
    result.updatedAt = "mockedDate";
    expect(result).toMatchSnapshot();
  });

  it("should return null when there is not user logged in", async () => {
    const result = await getCustomer();
    expect(result).toMatchSnapshot();
  });
});
