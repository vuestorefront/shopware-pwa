import Vue from "vue";
import VueCompositionApi, {
  reactive,
  ref,
  computed,
  Ref,
} from "@vue/composition-api";
Vue.use(VueCompositionApi);
import { PageResolverResult } from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";

import { useCms, getDefaultApiParams } from "@shopware-pwa/composables";
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedGetPage = shopwareClient as jest.Mocked<typeof shopwareClient>;

describe("Composables - useCms", () => {
  const statePage: Ref<Object | null> = ref(null);
  const rootContextMock: any = {
    $store: {
      getters: reactive({ getPage: computed(() => statePage.value) }),
      commit: (name: string, value: any) => {
        statePage.value = value;
      },
    },
    $shopwareApiInstance: jest.fn(),
    $shopwareDefaults: getDefaultApiParams(),
  };
  beforeEach(() => {
    jest.resetAllMocks();
    statePage.value = null;
  });
  it("should have value", async () => {
    const { search, page } = useCms(rootContextMock);
    const response: PageResolverResult<any> = {
      breadcrumb: {},
      cmsPage: { name: "super category", type: "product_list" },
      resourceIdentifier: "3f637f17cd9f4891a2d7625d19fb37c9",
      resourceType: "frontend.navigation.page",
      listingConfiguration: {},
      apiAlias: "pwa_page_result",
    } as any;
    mockedGetPage.getCmsPage.mockResolvedValueOnce(response);
    expect(page.value).toEqual(null);
    await search();
    expect(page.value).toBeTruthy();
    expect(page.value.resourceIdentifier).toEqual(
      "3f637f17cd9f4891a2d7625d19fb37c9"
    );
  });

  it("should have failed on bad url settings", async () => {
    const { search, page, error } = useCms(rootContextMock);
    mockedGetPage.getCmsPage.mockRejectedValueOnce({
      message: "Something went wrong...",
    });
    expect(page.value).toEqual(null);
    await search();
    expect(page.value).toEqual(null);
    expect(error.value).toBeTruthy();
    expect(error.value).toStrictEqual({ message: "Something went wrong..." });
  });

  it("should performs search request with no or empty configuration for SearchCriteria", async () => {
    const { search, page, error } = useCms(rootContextMock);
    mockedGetPage.getCmsPage.mockRejectedValueOnce({
      message: "Something went wrong...",
    });
    expect(page.value).toEqual(null);
    await search("", { configuration: { associations: [] } });
    expect(page.value).toEqual(null);
    expect(error.value).toBeTruthy();
    expect(error.value).toStrictEqual({ message: "Something went wrong..." });
  });

  describe("methods", () => {
    describe("search", () => {
      it("should performs search default pagination limit if not provided", async () => {
        const { search, page } = useCms(rootContextMock);
        let invocationCriteria: any = null;
        mockedGetPage.getCmsPage.mockImplementationOnce(
          async (path: string, searchCriteria, apiInstance): Promise<any> => {
            invocationCriteria = searchCriteria;
            return {};
          }
        );
        expect(page.value).toEqual(null);
        await search("");
        expect(mockedGetPage.getCmsPage).toBeCalledWith(
          "",
          expect.any(Object),
          rootContextMock.$shopwareApiInstance
        );
        expect(invocationCriteria?.limit).toEqual(10);
      });

      it("should performs search with pagination if provided", async () => {
        const { search, page } = useCms(rootContextMock);
        let invocationCriteria: any = null;
        mockedGetPage.getCmsPage.mockImplementationOnce(
          async (path: string, searchCriteria, apiInstance): Promise<any> => {
            invocationCriteria = searchCriteria;
            return {};
          }
        );
        expect(page.value).toEqual(null);
        await search("", { limit: 50 });
        expect(mockedGetPage.getCmsPage).toBeCalledWith(
          "",
          expect.any(Object),
          rootContextMock.$shopwareApiInstance
        );
        expect(invocationCriteria?.limit).toEqual(50);
      });

      it("should provide default includes if not provided, but configuration exist", async () => {
        const { search, page } = useCms(rootContextMock);
        let invocationCriteria: any = null;
        mockedGetPage.getCmsPage.mockImplementationOnce(
          async (path: string, searchCriteria, apiInstance): Promise<any> => {
            invocationCriteria = searchCriteria;
            return {};
          }
        );
        expect(page.value).toEqual(null);
        await search("", {
          configuration: {},
        });
        expect(mockedGetPage.getCmsPage).toBeCalledWith(
          "",
          expect.any(Object),
          rootContextMock.$shopwareApiInstance
        );
        expect(invocationCriteria?.includes).not.toBeFalsy();
      });

      it("should invoke search with custom includes", async () => {
        // rootContextMock.$shopwareDefaults = {};
        const { search, page } = useCms(rootContextMock);
        let invocationCriteria: any = null;
        mockedGetPage.getCmsPage.mockImplementationOnce(
          async (path: string, searchCriteria, apiInstance): Promise<any> => {
            invocationCriteria = searchCriteria;
            return {};
          }
        );
        expect(page.value).toEqual(null);
        await search("", {
          includes: { product: ["someCustomField"] },
        });
        expect(mockedGetPage.getCmsPage).toBeCalledWith(
          "",
          expect.any(Object),
          rootContextMock.$shopwareApiInstance
        );
        expect(invocationCriteria?.includes?.product).toContain(
          "someCustomField"
        );
      });
    });
  });

  it("should return activeCategoryId if it's included within the page object", async () => {
    const { categoryId, search } = useCms(rootContextMock);
    const response: PageResolverResult<any> = {
      breadcrumb: {},
      cmsPage: { name: "super category", type: "product_list" },
      resourceIdentifier: "3f637f17cd9f4891a2d7625d19fb37c9",
      resourceType: "frontend.navigation.page",
      listingConfiguration: {},
      apiAlias: "pwa_page_result",
    } as any;
    mockedGetPage.getCmsPage.mockResolvedValueOnce(response);
    expect(categoryId.value).toBeNull();
    await search();
    expect(categoryId.value).toEqual("3f637f17cd9f4891a2d7625d19fb37c9");
  });

  describe("computed", () => {
    describe("getBreadcrumbsObject", () => {
      it("should return page breadcrumbs after search", async () => {
        const { getBreadcrumbsObject, search } = useCms(rootContextMock);
        const response: PageResolverResult<any> = {
          breadcrumb: {
            qwe: {
              name: "Some Category",
              path: "/some/category",
            },
          },
          cmsPage: { name: "super category", type: "product_list" },
          resourceIdentifier: "3f637f17cd9f4891a2d7625d19fb37c9",
          resourceType: "frontend.navigation.page",
          listingConfiguration: {},
          apiAlias: "pwa_page_result",
        } as any;
        mockedGetPage.getCmsPage.mockResolvedValueOnce(response);
        expect(getBreadcrumbsObject.value).toEqual([]);
        await search();
        expect(getBreadcrumbsObject.value).toEqual({
          qwe: {
            name: "Some Category",
            path: "/some/category",
          },
        });
      });
    });
  });
});
