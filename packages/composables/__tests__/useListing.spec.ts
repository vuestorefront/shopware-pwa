import Vue from "vue";
import VueCompositionApi, { ref } from "@vue/composition-api";
Vue.use(VueCompositionApi);

import { useListing } from "../src/logic/useListing";

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;
import * as ApiClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedApiClient = ApiClient as jest.Mocked<typeof ApiClient>;

describe("Composables - useListing", () => {
  const rootContextMock: any = {
    $shopwareApiInstance: jest.fn(),
  };

  let returnedSearchMethod: any = null;
  const apiInstanceMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    returnedSearchMethod = null;
    mockedComposables.createListingComposable = jest
      .fn()
      .mockImplementation(({ searchMethod }) => {
        returnedSearchMethod = searchMethod;
      });
    const getDefaultsMock = jest.fn().mockImplementation(() => {
      return { limit: 5 };
    });

    mockedComposables.useDefaults.mockImplementation(() => {
      return {
        getDefaults: getDefaultsMock,
      } as any;
    });
    mockedComposables.getApplicationContext.mockImplementation(() => {
      return {
        apiInstance: apiInstanceMock,
      } as any;
    });
    mockedComposables.useCms.mockImplementation(() => {
      return {
        categoryId: ref("321"),
      } as any;
    });
  });

  it("should use categoryListing by default", () => {
    useListing(rootContextMock, undefined as any);
    expect(mockedComposables.createListingComposable).toBeCalledWith({
      listingKey: "categoryListing",
      rootContext: rootContextMock,
      searchDefaults: {
        limit: 5,
      },
      searchMethod: expect.any(Function),
    });
  });

  it("should invoke proper search method for categoryListing", async () => {
    useListing(rootContextMock, "categoryListing");
    expect(mockedComposables.createListingComposable).toBeCalled();
    expect(returnedSearchMethod).toBeTruthy();
    await returnedSearchMethod({ limit: 8 });
    expect(mockedApiClient.searchProducts).not.toBeCalled();
    expect(mockedApiClient.getCategoryProducts).toBeCalledWith(
      "321",
      { limit: 8 },
      apiInstanceMock
    );
  });

  it("should invoke proper search method for productSearchListing", async () => {
    useListing(rootContextMock, "productSearchListing");
    expect(mockedComposables.createListingComposable).toBeCalled();
    expect(returnedSearchMethod).toBeTruthy();
    await returnedSearchMethod({ limit: 8 });
    expect(mockedApiClient.getCategoryProducts).not.toBeCalled();
    expect(mockedApiClient.searchProducts).toBeCalledWith(
      { limit: 8 },
      apiInstanceMock
    );
  });
});
