import { Ref, ref } from "vue-demi";
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";

// Mock API client
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

const consoleErrorSpy = jest.spyOn(console, "error");

import { useCustomerAddresses } from "../src/hooks/useCustomerAddresses";
describe("Composables - useCustomerAddresses", () => {
  const stateUser: Ref<Object | null> = ref(null);
  const rootContextMock: any = {
    $shopwareApiInstance: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
    stateUser.value = null;
    mockedComposables.useDefaults.mockImplementation(() => {
      return {
        getDefaults: () => {},
      } as any;
    });
    mockedComposables.useSharedState.mockImplementation(() => {
      return {
        sharedRef: () => stateUser,
      } as any;
    });

    mockedComposables.useUser.mockImplementation(() => {
      return {
        refreshUser: () => {},
      } as any;
    });

    consoleErrorSpy.mockImplementationOnce(() => {});
  });

  describe("methods", () => {
    describe("updateAddress", () => {
      it("should invoke an endpoint to update an address and return true on success", async () => {
        mockedApiClient.updateCustomerAddress.mockResolvedValueOnce({
          id: "updated-id",
        } as any);
        const { updateAddress } = useCustomerAddresses(rootContextMock);
        const response = await updateAddress({
          id: "some-address-id",
          city: "Wrocław",
        });
        expect(mockedApiClient.updateCustomerAddress).toBeCalledTimes(1);
        expect(response).toBe("updated-id");
      });
      it("should invoke an endpoint to update an address and return false on fail", async () => {
        mockedApiClient.updateCustomerAddress.mockRejectedValueOnce(
          new Error("not ok")
        );
        const { updateAddress } = useCustomerAddresses(rootContextMock);
        const response = await updateAddress({
          id: "some-address-id",
          city: "Wrocław",
        });
        expect(mockedApiClient.updateCustomerAddress).toBeCalledTimes(1);
        expect(response).toBeUndefined();
      });
    });
    describe("addAddress", () => {
      it("should add address", async () => {
        mockedApiClient.createCustomerAddress.mockResolvedValueOnce({
          id: "added-id",
        } as any);
        const { addAddress } = useCustomerAddresses(rootContextMock);
        const response = await addAddress({ city: "Wrocław" });
        expect(mockedApiClient.createCustomerAddress).toBeCalledTimes(1);
        expect(response).toBe("added-id");
      });
      it("should not add empty address", async () => {
        mockedApiClient.createCustomerAddress.mockRejectedValueOnce({
          messages: [{ detail: "There is no address provided" }],
        } as ClientApiError);
        const { addAddress, errors } = useCustomerAddresses(rootContextMock);
        const response = await addAddress(null as any);
        expect(mockedApiClient.createCustomerAddress).toBeCalledTimes(1);
        expect(response).toBeUndefined();
        expect(errors.addAddress).toEqual([
          { detail: "There is no address provided" },
        ]);
      });
    });

    describe("deleteAddress", () => {
      it("should invoke client deleteCustomerAddress method and return true on success", async () => {
        mockedApiClient.deleteCustomerAddress.mockResolvedValueOnce();
        const { deleteAddress } = useCustomerAddresses(rootContextMock);
        const response = await deleteAddress("address-1234");
        expect(mockedApiClient.deleteCustomerAddress).toBeCalledTimes(1);
        expect(response).toBe(true);
      });
      it("should invoke client deleteCustomerAddress method and return false on failure", async () => {
        mockedApiClient.deleteCustomerAddress.mockRejectedValueOnce(
          "Cannot delete the provided address"
        );
        const { deleteAddress } = useCustomerAddresses(rootContextMock);
        const response = await deleteAddress("address-unknown");
        expect(mockedApiClient.deleteCustomerAddress).toBeCalledTimes(1);
        expect(response).toBe(false);
      });
    });

    describe("loadAddresses", () => {
      it("should invoke client getCustomerAddresses method and assign given array to addresses ref", async () => {
        mockedApiClient.getCustomerAddresses.mockResolvedValue({
          elements: [
            {
              id: "addressId-12345",
            },
          ],
        } as any);
        const { addresses, loadAddresses, errors } =
          useCustomerAddresses(rootContextMock);
        await loadAddresses();
        expect(mockedApiClient.getCustomerAddresses).toBeCalledTimes(1);
        expect(errors.loadAddresses).toHaveLength(0);
        expect(addresses.value).toStrictEqual([
          {
            id: "addressId-12345",
          },
        ]);
      });

      it("should invoke client getCustomerAddresses method and assign undefined on falsy response", async () => {
        mockedApiClient.getCustomerAddresses.mockResolvedValue(
          undefined as any
        );
        const { addresses, loadAddresses, errors } =
          useCustomerAddresses(rootContextMock);
        await loadAddresses();
        expect(mockedApiClient.getCustomerAddresses).toBeCalledTimes(1);
        expect(errors.loadAddresses).toStrictEqual([]);
        expect(addresses.value).toBeUndefined();
      });

      it("should invoke client getCustomerAddresses method and assign error message if client request is rejected", async () => {
        mockedApiClient.getCustomerAddresses.mockRejectedValueOnce({
          messages: [{ detail: "Something went wrong..." }],
        });
        const { loadAddresses, errors } = useCustomerAddresses(rootContextMock);
        await loadAddresses();
        expect(mockedApiClient.getCustomerAddresses).toBeCalledTimes(1);
        expect(errors.loadAddresses).toStrictEqual([
          { detail: "Something went wrong..." },
        ]);
      });
    });
    describe("markAddressAsDefault", () => {
      it("should invoke client setDefaultCustomerBillingAddress method and return true on success", async () => {
        mockedApiClient.setDefaultCustomerBillingAddress.mockResolvedValue(
          "address-1234"
        );
        const { markAddressAsDefault } = useCustomerAddresses(rootContextMock);
        const response = await markAddressAsDefault({
          addressId: "address-1234",
          type: "billing",
        } as any);
        expect(
          mockedApiClient.setDefaultCustomerBillingAddress
        ).toBeCalledTimes(1);
        expect(response).toBe(true);
      });

      it("should invoke client setDefaultCustomerShippingAddress method and return true on success", async () => {
        mockedApiClient.setDefaultCustomerShippingAddress.mockResolvedValue(
          "address-1234"
        );
        const { markAddressAsDefault } = useCustomerAddresses(rootContextMock);
        const response = await markAddressAsDefault({
          addressId: "address-1234",
          type: "shipping",
        } as any);
        expect(
          mockedApiClient.setDefaultCustomerShippingAddress
        ).toBeCalledTimes(1);
        expect(response).toBe(true);
      });

      it("should return false when no argument is provided", async () => {
        const { markAddressAsDefault } = useCustomerAddresses(rootContextMock);
        const response = await markAddressAsDefault({} as any);
        expect(response).toBe(false);
      });

      it("should return false when address type is unknown", async () => {
        const { markAddressAsDefault } = useCustomerAddresses(rootContextMock);
        const response = await markAddressAsDefault({
          type: "unknown",
          addressId: "someId",
        } as any);
        expect(response).toBe(false);
      });

      it("should return false and set the error.value on api-client rejection", async () => {
        mockedApiClient.setDefaultCustomerShippingAddress.mockRejectedValueOnce(
          {
            messages: [{ detail: "Error occured" }],
          }
        );
        const { markAddressAsDefault, errors } =
          useCustomerAddresses(rootContextMock);
        const response = await markAddressAsDefault({
          type: "shipping",
          addressId: "someId",
        } as any);
        expect(
          mockedApiClient.setDefaultCustomerShippingAddress
        ).toBeCalledTimes(1);

        expect(response).toBe(false);
        expect(errors.markAddressAsDefault).toStrictEqual([
          { detail: "Error occured" },
        ]);
      });
    });
  });
});
