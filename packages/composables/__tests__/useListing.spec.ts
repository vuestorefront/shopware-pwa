import { ref } from "vue-demi";
import { useListing } from "../src/logic/useListing";

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

import * as ApiClient from "@shopware-pwa/shopware-6-client";
import { prepareRootContextMock } from "./contextRunner";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedApiClient = ApiClient as jest.Mocked<typeof ApiClient>;

import vueComp from "vue-demi";
const mockedCompositionAPI = vueComp as jest.Mocked<typeof vueComp>;

describe("Composables - useListing", () => {
  const rootContextMock = prepareRootContextMock();
  const mockedResourceIdentifier = ref();

  let returnedSearchMethod: any = null;

  beforeEach(() => {
    jest.resetAllMocks();
    returnedSearchMethod = null;
    mockedResourceIdentifier.value = "321";
    mockedComposables.createListingComposable = jest
      .fn()
      .mockImplementation(({ searchMethod }) => {
        returnedSearchMethod = searchMethod;
      });

    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: false,
      isVueScope: true,
    });
    const getDefaultsMock = jest.fn().mockImplementation(() => {
      return { limit: 5 };
    });

    mockedComposables.useDefaults.mockImplementation(() => {
      return {
        getDefaults: getDefaultsMock,
      } as any;
    });
    mockedComposables.useCms.mockImplementation(() => {
      return {
        resourceIdentifier: mockedResourceIdentifier,
      } as any;
    });

    mockedComposables.getApplicationContext.mockReturnValue(rootContextMock);
  });

  it("should use categoryListing by default", () => {
    useListing({ listingType: undefined as any });
    expect(mockedComposables.createListingComposable).toBeCalledWith({
      listingKey: "categoryListing",
      searchDefaults: {
        limit: 5,
      },
      searchMethod: expect.any(Function),
    });
  });

  it("should use categoryListing by default", () => {
    useListing();
    expect(mockedComposables.createListingComposable).toBeCalledWith({
      listingKey: "categoryListing",
      searchDefaults: {
        limit: 5,
      },
      searchMethod: expect.any(Function),
    });
  });

  it("should invoke proper search method for categoryListing", async () => {
    useListing({ listingType: "categoryListing" });
    expect(mockedComposables.createListingComposable).toBeCalled();
    expect(returnedSearchMethod).toBeTruthy();
    await returnedSearchMethod({ limit: 8 });
    expect(mockedApiClient.searchProducts).not.toBeCalled();
    expect(mockedApiClient.getCategoryProducts).toBeCalledWith(
      "321",
      { limit: 8 },
      rootContextMock.apiInstance
    );
  });

  it("should throw an error inside search method, when resourceIdentifier is not provided", async () => {
    mockedResourceIdentifier.value = null;
    useListing({ listingType: "categoryListing" });
    expect(returnedSearchMethod).toBeTruthy();
    await expect(returnedSearchMethod({ limit: 8 })).rejects.toThrow(
      "[useListing][search] Search category id does not exist."
    );
  });

  it("should invoke proper search method for productSearchListing", async () => {
    useListing({ listingType: "productSearchListing" });
    expect(mockedComposables.createListingComposable).toBeCalled();
    expect(returnedSearchMethod).toBeTruthy();
    await returnedSearchMethod({ limit: 8 });
    expect(mockedApiClient.getCategoryProducts).not.toBeCalled();
    expect(mockedApiClient.searchProducts).toBeCalledWith(
      { limit: 8 },
      rootContextMock.apiInstance
    );
  });

  it("should use default useCms resource identifier", async () => {
    mockedCompositionAPI.inject = jest.fn();
    useListing({ listingType: "categoryListing" });
    await returnedSearchMethod({ limit: 8 });
    expect(mockedApiClient.getCategoryProducts).toBeCalledWith(
      "321",
      { limit: 8 },
      rootContextMock.apiInstance
    );
    expect(mockedCompositionAPI.inject).not.toHaveBeenCalled();
  });

  it("should use injected cms page resource identifier in vue component", async () => {
    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: true,
      isVueScope: false,
    });
    mockedCompositionAPI.inject = jest.fn().mockReturnValueOnce(
      ref({
        resourceIdentifier: "injectedIdentifier",
      })
    );
    useListing({ listingType: "categoryListing" });
    await returnedSearchMethod({ limit: 8 });
    expect(mockedCompositionAPI.inject).toHaveBeenCalled();
    expect(mockedApiClient.getCategoryProducts).toBeCalledWith(
      "injectedIdentifier",
      { limit: 8 },
      rootContextMock.apiInstance
    );
  });
});
