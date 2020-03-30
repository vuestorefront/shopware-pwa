import { login, update } from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - CustomerService - login", () => {
  beforeEach(() => {
    update({ contextToken: "" });
  });

  it("should log in user with provided credentials", async () => {
    const result = await login({
      username: "test.e2e@test.pl",
      password: "password",
    });
    result.contextToken = "mockedToken";
    expect(result).toMatchSnapshot();
  });

  it("should return error response when login is incorrect", async () => {
    try {
      await login({ username: "test.unit@test.pl", password: "password" });
      expect("didn't throw an error").toEqual("should throw an error");
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });

  it("should return error response when password is incorrect", async () => {
    try {
      await login({ username: "test.e2e@test.pl", password: "magento" });
      expect("didn't throw an error").toEqual("should throw an error");
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});
