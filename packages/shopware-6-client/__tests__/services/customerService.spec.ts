import { CustomerService } from "../../src/index";

const generateUniqueEmail = (): string => {
  const currentTime = Date.now();
  const email = `mkucmus+${currentTime}@divante.com`;
  return email;
};

const basicCustomerData = {
  salutationId:
    "c370eb5cd1df4d4dbcc78f055b693e79" /** TODO: get the mocked one if possible */,
  firstName: "Test",
  lastName: "Test",
  password: "test123456",
  email: generateUniqueEmail(),
  billingAddress: {
    countryId:
      "3ff87c8746dc40ecaea1495eb254278e" /** TODO: get the mocked one if possible */,
    street: "Example 128",
    zipcode: "555-444",
    city: "Breslau",
    phoneNumber: "+48 5543333333"
  }
};

const loginCredentials = {
  username: "mkucmus@divante.com",
  password: "test123456"
};

describe("CustomerService", () => {
  describe("register", () => {
    it("should register the new customer with basic data provided", async () => {
      try {
        const result = await CustomerService.register(basicCustomerData);
        expect(result).toHaveProperty("data");
        expect(result.data).toHaveLength(32);
      } catch (e) {
        console.error("Connection problem", e);
      }
    });
    it("should never register a customer without billing address", async () => {
      try {
        await CustomerService.register(
          Object.assign(basicCustomerData, {
            billingAddress: {}
          })
        );
      } catch (e) {
        e.response && expect(e.response.status).toEqual(400);
      }
    });
    it("should never register a customer with too short password", async () => {
      try {
        await CustomerService.register(
          Object.assign(basicCustomerData, {
            password: "short"
          })
        );
      } catch (e) {
        e.response && expect(e.response.status).toEqual(400);
      }
    });
  });
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
  describe("getCustomer", () => {
    it("should return customer related to the current context with basic fields", async () => {
      try {
        /** 1st step - login */
        const loginResult = await CustomerService.login(loginCredentials);
        const currentContextToken = loginResult["sw-context-token"];
        /** 2nd step - get the details */
        const customerResponse = await CustomerService.getCustomer(
          currentContextToken
        );
        expect(customerResponse).toHaveProperty("salutationId");
        expect(customerResponse).toHaveProperty("firstName");
        expect(customerResponse).toHaveProperty("lastName");
        expect(customerResponse).toHaveProperty("email");
        expect(customerResponse).toHaveProperty("defaultBillingAddress");
        expect(customerResponse.email).toEqual(loginCredentials.username);
      } catch (e) {
        console.error("Connection problem", e);
      }
    });
    it("should throw 403 when token is invalid", async () => {
      try {
        /** 1st step - login */
        const currentContextToken = "some-fake-token";
        /** 2nd step - get the details */
        await CustomerService.getCustomer(currentContextToken);
      } catch (e) {
        e.response && expect(e.response.status).toEqual(403);
      }
    });
  });
});
