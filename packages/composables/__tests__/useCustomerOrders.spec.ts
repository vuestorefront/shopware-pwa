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
import { EntityResult, Order } from "@shopware-pwa/commons";
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
        const ordersResponse = {
          elements: [
            {
              id: "12345",
              orderNumber: "100123",
            },
          ]
        };
        mockedApiClient.getCustomerOrders.mockResolvedValueOnce(
          ordersResponse as any
        );
        const { orders, loadOrders } = useCustomerOrders();
        expect(orders.value).toStrictEqual([]);
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

    describe("getTotal", () => {
      it("should return 0 as default", () => {
        const { getTotal } = useCustomerOrders();
        expect(getTotal.value).toEqual(0);
      });

      it("should return 0 when there is no orders", () => {
        const ordersResponse = {
          elements: []
        };
        mockedApiClient.getCustomerOrders.mockResolvedValueOnce(
          ordersResponse as any
        );
        const { getTotal } = useCustomerOrders();

        expect(getTotal.value).toEqual(0);
      });
  
      it("should return total same value with count field", async () => {
        const ordersResponse = {
          aggregations: {
            'count-id': {
              count: 20
            }
          },
          elements: Array(20).fill({
            id: "11111",
            orderNumber: "100120",
          })
        };
        mockedApiClient.getCustomerOrders.mockResolvedValueOnce(
          ordersResponse as any
        );
        
        const { getTotal, loadOrders } = useCustomerOrders();
        await loadOrders();
        expect(getTotal.value).toEqual(20);
      });
    });
  
    describe("getLimit", () => {
      it("should return 10 when there is no configuration set", async () => {
        const ordersResponse = {
          elements: [
            {
              id: "12345",
              orderNumber: "100123",
            },
          ],
        };
        mockedApiClient.getCustomerOrders.mockResolvedValueOnce(
          ordersResponse as any
        );
        const { getLimit, loadOrders } = useCustomerOrders();
        expect(getLimit.value).toEqual(10);
        await loadOrders();
        expect(getLimit.value).toEqual(10);
      });
  
      it("should return limit from current orders", async () => {
        const ordersResponse = {
          elements: [
            {
              id: "12345",
              orderNumber: "100123",
            },
          ],
          limit: 11
        };
        mockedApiClient.getCustomerOrders.mockResolvedValueOnce(
          ordersResponse as any
        );
        const { getLimit, loadOrders } = useCustomerOrders();
        await loadOrders();
        expect(getLimit.value).toEqual(11);
      });
    });
  
    describe("getTotalPagesCount", () => {
      it("should return 0 when there is no currentListing", async () => {
        const ordersResponse = {
          aggregations: {
            'count-id': {
              count: 0
            }
          },
          elements: []
        };
        mockedApiClient.getCustomerOrders.mockResolvedValueOnce(
          ordersResponse as any
        );
        
        const { getTotalPagesCount, loadOrders } = useCustomerOrders();
        await loadOrders();
        expect(getTotalPagesCount.value).toEqual(0);
      });
  
      it("should return ceiled pages count from current listing", async () => {
        const ordersResponse = {
          aggregations: {
            'count-id': {
              count: 22
            }
          },
          elements: Array(22).fill({
            id: "11111",
            orderNumber: "100120",
          })
        };
        mockedApiClient.getCustomerOrders.mockResolvedValueOnce(
          ordersResponse as any
        );
        
        const { getTotalPagesCount, loadOrders } = useCustomerOrders();
        await loadOrders();
        expect(getTotalPagesCount.value).toEqual(3);
      });
    });

    describe("getCurrentPage", () => {
      it("should return 1 as default", async () => {
        const { getCurrentPage } = useCustomerOrders();
        expect(getCurrentPage.value).toEqual(1);
      });

      it("should return 1 when there is no orders", async () => {
        const ordersResponse = {
          aggregations: {
            'count-id': {
              count: 0
            }
          },
          elements: []
        };
        mockedApiClient.getCustomerOrders.mockResolvedValueOnce(
          ordersResponse as any
        );
        
        const { getCurrentPage, loadOrders } = useCustomerOrders();
        await loadOrders();
        expect(getCurrentPage.value).toEqual(1);
      });
  
      it("should return page number from current listing", async () => {
        const ordersResponse = {
          aggregations: {
            'count-id': {
              count: 3
            }
          },
          page: 3,
          limit: 1,
          elements: [
            {
              id: "12345",
              orderNumber: "100123",
            },
            {
              id: "12346",
              orderNumber: "100123",
            }
          ]
        };
        mockedApiClient.getCustomerOrders.mockResolvedValueOnce(
          ordersResponse as any
        );
        
        const { getCurrentPage, loadOrders } = useCustomerOrders();
        await loadOrders();
        expect(getCurrentPage.value).toEqual(3);
      });
    });
  
    describe("changeCurrentPage", () => {
      it("should invoke search with changed page number", async () => {
        const ordersResponse = (page: number) : EntityResult<"order", Order[]> => ({
          aggregations: [],
          page,
          limit: 10,
          entity: 'order',
          total: 10,
          apiAlias: '',
          elements: []
        });
        mockedApiClient.getCustomerOrders.mockImplementationOnce(async (params) => Promise.resolve(ordersResponse(params?.page || 1)));
        
        const { changeCurrentPage, getCurrentPage } = useCustomerOrders();
        await changeCurrentPage(3);
        expect(getCurrentPage.value).toEqual(3);
      });
    });
  });
});
