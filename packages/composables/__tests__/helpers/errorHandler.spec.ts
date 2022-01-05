import { broadcastErrors } from "../../src/internalHelpers/errorHandler";
import * as Composables from "@shopware-pwa/composables";
import { EntityError } from "@shopware-pwa/commons";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;
jest.spyOn(console, "error");
describe("composables errorHandler", () => {
  const broadcastMock = jest.fn();

  beforeEach(() => {
    mockedComposables.getApplicationContext.mockImplementation(() => {
      return {} as any;
    });
    mockedComposables.useIntercept.mockImplementation(() => {
      return {
        broadcast: broadcastMock,
      } as any;
    });
  });
  describe("broadcastErrors", () => {
    it("should do nothing if some of arguments does not match the interface", () => {
      const { broadcast } = mockedComposables.useIntercept();
      broadcastErrors(undefined as any, "testMethod", broadcast);
      expect(broadcastMock).toBeCalledTimes(0);
    });
    it("should broadcast errors if any provided", () => {
      const errors: EntityError[] = [
        {
          id: "someId",
          name: "product-stock-reached",
          quantity: 1,
          message: "you reached the available quantity of the product",
          code: 10,
          key: "product-stock-reached-someId",
          level: 0,
          messageKey: "product-stock-reached",
        },
        {
          id: "someId",
          name: "product-stock-reached",
          quantity: 1,
          message: "you reached the available quantity of the product",
          code: 30,
          key: "product-stock-reached-someId",
          level: 10,
          messageKey: "product-stock-reached",
        },
        {
          id: "someId",
          name: "product-stock-reached",
          quantity: 1,
          message: "you reached the available quantity of the product",
          code: 10,
          key: "product-stock-reached-someId",
          level: 20,
          messageKey: "product-stock-reached",
        },
      ];
      const { broadcast } = mockedComposables.useIntercept();
      broadcastErrors(errors, "testMethod", broadcast);
      expect(broadcastMock).toBeCalledTimes(3);
      expect(broadcastMock).toBeCalledWith("notice", {
        inputParams: {},
        methodName: "testMethod",
        notice: {
          code: 10,
          id: "someId",
          key: "product-stock-reached-someId",
          level: 0,
          message: "you reached the available quantity of the product",
          messageKey: "product-stock-reached",
          name: "product-stock-reached",
          quantity: 1,
        },
      });
    });
  });
});
