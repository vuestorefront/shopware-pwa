import { update, login, updatePassword } from "@shopware-pwa/shopware-6-client";
import { internet } from "faker";

describe("shopware-6-client - E2E - CustomerService - updatePassword", () => {
  beforeEach(() => {
    update({ contextToken: "" });
  });

  it("should update customer password", async () => {
    await login({ username: "test.e2e@test.pl", password: "password" });
    const result = await updatePassword({
      password: "password",
      newPassword: "password",
      newPasswordConfirm: "password",
    });
    expect(result).toMatchSnapshot();
  });

  it("should return error when current password does not match", async () => {
    try {
      await login({ username: "test.e2e@test.pl", password: "password" });
      await updatePassword({
        password: "shop1",
        newPassword: internet.password(),
        newPasswordConfirm: internet.password(),
      });
      expect("didn't throw an error").toEqual("should throw an error");
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });

  it("should return error when new passwords do not match", async () => {
    try {
      await login({ username: "test.e2e@test.pl", password: "password" });
      await updatePassword({
        password: "password",
        newPassword: "shop",
        newPasswordConfirm: "shop1",
      });
      expect("didn't throw an error").toEqual("should throw an error");
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});
