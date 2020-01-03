import { update, login, logout } from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - CustomerService - logout", () => {
  beforeEach(() => {
    update({ contextToken: "" });
  });

  it("should logout customer", async () => {
    await login({ username: "test.e2e@test.pl", password: "password" });
    const result = await logout();
    expect(result).toMatchSnapshot();
  });

  it("should return error when customer is not logged in", async () => {
    try {
      await logout();
      expect("didn't throw an error").toEqual("should throw an error");
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});
