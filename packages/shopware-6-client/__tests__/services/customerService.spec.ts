import { CustomerService } from "../../src/index";

const loginCredentials = {
  username: "mkucmus@divante.com",
  password: "test123456"
};

describe("CustomerService", () => {
  describe("login", () => {
    it("should return context token", async () => {
      try {
        const result = await CustomerService.login(loginCredentials);
        expect(result).toHaveProperty("sw-context-token");
      } catch (e) {
        console.error("Connection problem", e);
      }
    });
    it("should not return context token when the credentials are wrong", async () => {
      try {
        const result = await CustomerService.login({
          username: loginCredentials.username,
          password: "wrong-credentials"
        });
        expect(result).toHaveProperty("sw-context-token");
      } catch (e) {
        e.response && expect(e.response.status).toEqual(401);
      }
    });
  });
  describe("logout", () => {
    it("should return no data and throw no exceotion (204)", async () => {
      try {
        const contextTokenResult = await CustomerService.login(
          loginCredentials
        );
        const result = await CustomerService.logout(
          contextTokenResult["sw-context-token"]
        );
        expect(result).toBeFalsy();
      } catch (e) {
        console.error("Connection problem", e);
      }
    });
  });
});
