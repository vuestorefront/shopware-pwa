import { login, update, updateProfile } from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - CustomerService - updateProfile", () => {
  beforeEach(() => {
    update({ contextToken: "" });
  });

  it("should update user profile", async () => {
    await login({ username: "test.e2e@test.pl", password: "password" });
    const result = await updateProfile({
      firstName: "test",
      lastName: "e2e",
      salutationId: "c370eb5cd1df4d4dbcc78f055b693e79",
      title: null,
    });
    expect(result).toMatchSnapshot();
  });

  it("should return error when updating user profile without logged user", async () => {
    try {
      await updateProfile({
        firstName: "test",
        lastName: "e2e",
        salutationId: "c370eb5cd1df4d4dbcc78f055b693e79",
        title: null,
      });
      expect("didn't throw an error").toEqual("should throw an error");
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});
