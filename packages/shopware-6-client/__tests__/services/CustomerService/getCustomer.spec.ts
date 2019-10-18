import { when } from "jest-when";
import { getCustomer } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";
import { getCustomerEndpoint } from "../../../src/endpoints";
jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - getCustomer", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should an current customer's data - using correct token", async () => {
    when(mockedAxios.get)
      .expectCalledWith(getCustomerEndpoint(), {
        headers: { "sw-context-token": "c370eb5cd1df4d4dbcc78f055b693e79" }
      })
      .mockReturnValueOnce({
        data: { data: { id: "c370eb5cd1df4d4dbcc78f055b693e79" } }
      });
    const result = await getCustomer("c370eb5cd1df4d4dbcc78f055b693e79");
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith("/customer", {
      headers: { "sw-context-token": "c370eb5cd1df4d4dbcc78f055b693e79" }
    });
    expect(result).toHaveProperty("id");
    expect(result.id).toEqual("c370eb5cd1df4d4dbcc78f055b693e79");
  });

  it("should an current customer's data - using incorrect token", async () => {
    mockedAxios.get.mockRejectedValue(new Error());
    expect(getCustomer("b370eb5cd1df4d4dbcc78f055b693e79")).rejects.toThrow();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith("/customer", {
      headers: { "sw-context-token": "b370eb5cd1df4d4dbcc78f055b693e79" }
    });
  });
});
