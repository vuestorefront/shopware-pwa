// Mock API client
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

const consoleErrorSpy = jest.spyOn(console, "error");

import { useCustomerOrders } from "../src/hooks/useCustomerOrders";
describe("Composables - useCustomerOrders", () => {
  const rootContextMock: any = {
    $shopwareApiInstance: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();

    mockedComposables.useDefaults.mockImplementation(() => {
      return {
        getDefaults: () => {},
      } as any;
    });

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
        const { orders, loadOrders } = useCustomerOrders(rootContextMock);
        expect(orders.value).toBeNull();
        await loadOrders();
        expect(orders.value).toHaveLength(1);
      });
    });
  });
});
