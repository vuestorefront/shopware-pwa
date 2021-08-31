// Mock API client
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

const consoleErrorSpy = jest.spyOn(console, "error");

import { useCustomerOrders } from "../src/hooks/useCustomerOrders";
import { prepareRootContextMock } from "./contextRunner";
describe("Composables - useCustomerOrders", () => {
  const rootContextMock = prepareRootContextMock();

  beforeEach(() => {
    jest.resetAllMocks();

    mockedComposables.useDefaults.mockImplementation(() => {
      return {
        getDefaults: () => {},
      } as any;
    });

    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: false,
      isVueScope: true,
    });
    mockedComposables.getApplicationContext.mockReturnValue(rootContextMock);

    consoleErrorSpy.mockImplementationOnce(() => {});
  });

  describe("methods", () => {
    describe("loadOrders", () => {
      it("should load customer's orders from different endpoint", async () => {
        const ordersResponse = [
          {
            id: "12345",
            orderNumber: "100123",
          },
        ];
        mockedApiClient.getCustomerOrders.mockResolvedValueOnce(
          ordersResponse as any
        );
        const { orders, loadOrders } = useCustomerOrders();
        expect(orders.value).toBeNull();
        await loadOrders();
        expect(orders.value).toHaveLength(1);
      });
    });

    describe("getOrderDetails", () => {
      it("should return order details for given orderId", async () => {
        const orderResponse = {
          id: "12345",
          orderNumber: "100123",
        };
        mockedApiClient.getOrderDetails.mockResolvedValueOnce(
          orderResponse as any
        );
        const { getOrderDetails } = useCustomerOrders();
        const orderDetails = await getOrderDetails("12345");
        expect(orderDetails).toBe(orderResponse);
      });
    });
  });
});
