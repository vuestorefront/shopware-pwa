import { config } from "@shopware-pwa/shopware-6-client";
import { responseInterceptor, errorInterceptor } from "../src/apiInterceptors";
import { random } from "faker";

describe("apiInterceptors", () => {
  describe("responseInterceptor", () => {
    it("should update contextToken after any request", async () => {
      const contextToken = random.uuid();
      const resp = responseInterceptor({
        data: { data: { id: "044a190a54ab4f06803909c3ee8063ef" } },
        headers: { "sw-context-token": contextToken },
        status: 200,
        statusText: "OK",
        config: {}
      });
      expect(resp.data).toEqual({
        data: { id: "044a190a54ab4f06803909c3ee8063ef" }
      });
      expect(config.contextToken).toEqual(contextToken);
    });
  });

  describe("errorInterceptor", () => {
    it("should throw an error from parameters", async () => {
      try {
        await errorInterceptor({ status: 404 });
        // Fail test if above expression doesn't throw anything.
        expect("didn't throw an error").toEqual("should throw an error");
      } catch (e) {
        expect(e.status).toEqual(404);
      }
    });
  });
});
