import { ref, Ref } from "vue-demi";
import { CmsPageResponse } from "@shopware-pwa/commons";

import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedGetPage = shopwareClient as jest.Mocked<typeof shopwareClient>;

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

import * as Helpers from "@shopware-pwa/helpers";
jest.mock("@shopware-pwa/helpers");
const mockedHelpers = Helpers as jest.Mocked<typeof Helpers>;
mockedHelpers;

import vueComp from "vue-demi";
const mockedCompositionAPI = vueComp as jest.Mocked<typeof vueComp>;

import { useCms } from "../src/hooks/useCms";
import { prepareRootContextMock } from "./contextRunner";
describe("Composables - useCms", () => {
  const statePage: Ref<Object | null> = ref(null);
  const stateLoading: Ref<boolean | null> = ref(false);
  const stateError: Ref<Object | null> = ref(null);
  const stateSearchPath: Ref<string | null> = ref(null);
  const rootContextMock = prepareRootContextMock();
  let cmsContextName = "";

  const setBreadcrumbsMock = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    statePage.value = null;
    stateLoading.value = null;
    stateError.value = null;
    stateSearchPath.value = null;

    const getDefaultsMock = jest.fn().mockImplementation(() => {
      return { limit: 10, includes: ["name"] };
    });
    mockedComposables.useDefaults.mockImplementation(() => {
      return {
        getDefaults: getDefaultsMock,
      } as any;
    });

    mockedComposables.useBreadcrumbs.mockImplementation(() => {
      return {
        setBreadcrumbs: setBreadcrumbsMock,
      } as any;
    });

    mockedComposables.useSharedState.mockImplementation(() => {
      return {
        sharedRef: (contextName: string) => {
          const contextIndex = contextName.lastIndexOf("-");
          cmsContextName = contextName.substring(0, contextIndex);
          if (contextName === "useCms-cmsError") return stateError;
          if (contextName === "useCms-cmsLoading") return stateLoading;
          if (contextName === "useCms-searchPath") return stateSearchPath;
          return statePage;
        },
      } as any;
    });
    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: false,
      isVueScope: true,
    });
    mockedComposables.getApplicationContext.mockReturnValue(rootContextMock);
  });
  it("should have value", async () => {
    const { search, page } = useCms();
    const response: CmsPageResponse = {
      breadcrumb: {},
      cmsPage: { name: "super category", type: "product_list" },
      resourceIdentifier: "3f637f17cd9f4891a2d7625d19fb37c9",
      resourceType: "frontend.navigation.page",
      listingConfiguration: {},
      apiAlias: "pwa_page_result",
    } as any;
    mockedGetPage.getCmsPage.mockResolvedValueOnce(response);
    expect(page.value).toEqual(null);
    await search(undefined as any);
    expect(page.value).toBeTruthy();
    expect(page.value?.resourceIdentifier).toEqual(
      "3f637f17cd9f4891a2d7625d19fb37c9"
    );
  });

  it("should have failed on bad url settings", async () => {
    const { search, page, error } = useCms();
    mockedGetPage.getCmsPage.mockRejectedValueOnce({
      message: "Something went wrong...",
    });
    expect(page.value).toEqual(null);
    await search(undefined as any);
    expect(page.value).toEqual(null);
    expect(error.value).toBeTruthy();
    expect(error.value).toStrictEqual({ message: "Something went wrong..." });
  });

  it("should performs search request with no or empty configuration for SearchCriteria", async () => {
    const { search, page, error } = useCms();
    mockedGetPage.getCmsPage.mockRejectedValueOnce({
      message: "Something went wrong...",
    });
    expect(page.value).toEqual(null);
    await search("", { configuration: { associations: [] } });
    expect(page.value).toEqual(null);
    expect(error.value).toBeTruthy();
    expect(error.value).toStrictEqual({ message: "Something went wrong..." });
  });

  it("should use default cmsContext", () => {
    useCms();
    expect(cmsContextName).toEqual("useCms");
  });

  it("should use defined cmsContext", () => {
    useCms({ cmsContextName: "myContext" });
    expect(cmsContextName).toEqual("useCms(cms-myContext)");
  });

  it("should not invoke provide/inject with CMS context if it is not the component instance", () => {
    mockedCompositionAPI.provide = jest.fn();
    mockedCompositionAPI.inject = jest.fn();
    useCms({ cmsContextName: "myContext" });
    expect(mockedCompositionAPI.provide).not.toHaveBeenCalled();
    expect(mockedCompositionAPI.inject).not.toHaveBeenCalled();
  });

  it("should invoke provide with CMS context if it is the component instance", () => {
    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: true,
      isVueScope: true,
    });
    mockedCompositionAPI.provide = jest.fn();
    mockedCompositionAPI.inject = jest.fn();
    useCms({ cmsContextName: "myContext" });
    expect(mockedCompositionAPI.provide).toHaveBeenCalledWith(
      "swCmsContext",
      "myContext"
    );
    expect(mockedCompositionAPI.inject).not.toHaveBeenCalled();
  });

  it("should invoke inject with CMS context in vue component", () => {
    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: true,
      isVueScope: true,
    });
    mockedCompositionAPI.provide = jest.fn();
    mockedCompositionAPI.inject = jest.fn();
    useCms();
    expect(mockedCompositionAPI.inject).toBeCalledWith("swCmsContext", null);
  });

  describe("methods", () => {
    describe("search", () => {
      it("should performs search default pagination limit if not provided", async () => {
        const { search, page } = useCms();
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
          rootContextMock.apiInstance
        );
        expect(invocationCriteria?.limit).toEqual(10);
      });

      it("should performs search with pagination if provided", async () => {
        const { search, page } = useCms();
        let invocationCriteria: any = null;
        const mockedParams = {
          limit: 50,
        };
        mockedHelpers._parseUrlQuery.mockReturnValueOnce(mockedParams as any);
        mockedGetPage.getCmsPage.mockImplementationOnce(
          async (path: string, searchCriteria, apiInstance): Promise<any> => {
            invocationCriteria = searchCriteria;
            return {};
          }
        );
        expect(page.value).toEqual(null);
        await search("", mockedParams);
        expect(mockedGetPage.getCmsPage).toBeCalledWith(
          "",
          expect.any(Object),
          rootContextMock.apiInstance
        );
        expect(invocationCriteria?.limit).toEqual(50);
      });

      it("should provide default includes if not provided, but configuration exist", async () => {
        const { search, page } = useCms();
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
          rootContextMock.apiInstance
        );
        expect(invocationCriteria?.includes).not.toBeFalsy();
      });

      it("should invoke search with custom includes", async () => {
        // rootContextMock.$shopwareDefaults = {};
        const { search, page } = useCms();
        let invocationCriteria: any = null;
        mockedGetPage.getCmsPage.mockImplementationOnce(
          async (path: string, searchCriteria, apiInstance): Promise<any> => {
            invocationCriteria = searchCriteria;
            return {};
          }
        );
        const searchParams = {
          includes: { product: ["someCustomField"] },
        };
        mockedHelpers._parseUrlQuery.mockReturnValueOnce(searchParams as any);
        expect(page.value).toEqual(null);
        await search("", searchParams);
        expect(mockedGetPage.getCmsPage).toBeCalledWith(
          "",
          expect.any(Object),
          rootContextMock.apiInstance
        );
        expect(invocationCriteria?.includes?.product).toContain(
          "someCustomField"
        );
      });
    });

    it("should set currentSearchPathKey on search invocation", async () => {
      const { search, currentSearchPathKey } = useCms();
      expect(currentSearchPathKey.value).toBeNull();
      await search("/some/path");
      expect(currentSearchPathKey.value).toEqual("/some/path");
    });
  });

  it("should return resourceIdentifier if it's included within the page object", async () => {
    const { resourceIdentifier, search } = useCms();
    const response: CmsPageResponse = {
      breadcrumb: {},
      cmsPage: { name: "super category", type: "product_list" },
      resourceIdentifier: "3f637f17cd9f4891a2d7625d19fb37c9",
      resourceType: "frontend.navigation.page",
      listingConfiguration: {},
      apiAlias: "pwa_page_result",
    } as any;
    mockedGetPage.getCmsPage.mockResolvedValueOnce(response);
    expect(resourceIdentifier.value).toBeNull();
    await search(undefined as any);
    expect(resourceIdentifier.value).toEqual(
      "3f637f17cd9f4891a2d7625d19fb37c9"
    );
  });

  it("should return resourceType from the page object", async () => {
    const { resourceType, search } = useCms();
    const response: CmsPageResponse = {
      breadcrumb: {},
      cmsPage: { name: "super category", type: "product_list" },
      resourceIdentifier: "3f637f17cd9f4891a2d7625d19fb37c9",
      resourceType: "frontend.navigation.page",
      listingConfiguration: {},
      apiAlias: "pwa_page_result",
    } as any;
    mockedGetPage.getCmsPage.mockResolvedValueOnce(response);
    expect(resourceType.value).toBeNull();
    await search(undefined as any);
    expect(resourceType.value).toEqual("frontend.navigation.page");
  });

  it("should return resourceType as null if page object does not exist", async () => {
    const { resourceType } = useCms();
    expect(resourceType.value).toBeNull();
  });

  describe("computed", () => {
    describe("getEntityObject", () => {
      it("should invoke getCmsEntityByType helper in order to get meta data - giving undefined if resourceType is unrecognized", () => {
        mockedGetPage.getCmsPage.mockResolvedValueOnce({
          resourceType: "someType",
        } as any);
        const { metaTitle } = useCms();

        expect(metaTitle.value).toBeUndefined();
        expect(mockedHelpers.getCmsEntityByType).toBeCalledWith(null);
      });

      it("should return the right object depends on resourceType", () => {
        mockedHelpers.getCmsEntityByType.mockReturnValue({
          id: "product-id",
          translated: {
            name: "Great Product!",
          },
        } as any);

        const { pageTitle } = useCms();
        expect(pageTitle.value).not.toBeUndefined();
      });
    });
    describe("pageTitle", () => {
      it("should return pageTitle extracted from product object", () => {
        mockedHelpers.getCmsEntityByType.mockReturnValue({
          translated: {
            name: "Great Product!",
          },
        } as any);

        const { pageTitle } = useCms();
        expect(pageTitle.value).toBe("Great Product!");
      });
      it("should return undefined if there is no translated value", () => {
        mockedHelpers.getCmsEntityByType.mockReturnValue({} as any);

        const { pageTitle } = useCms();
        expect(pageTitle.value).toBeUndefined();
      });
    });
    describe("metaTitle", () => {
      it("should return metaTitle extracted from product object", () => {
        mockedHelpers.getCmsEntityByType.mockReturnValue({
          translated: {
            metaTitle: "Great Product!",
          },
        } as any);

        const { metaTitle } = useCms();
        expect(metaTitle.value).toBe("Great Product!");
      });
    });
    describe("metaDescription", () => {
      it("should return metaDescription extracted from product object", () => {
        mockedHelpers.getCmsEntityByType.mockReturnValue({
          translated: {
            metaDescription: "Great Description!",
          },
        } as any);

        const { metaDescription } = useCms();
        expect(metaDescription.value).toBe("Great Description!");
      });
      it("should return undefined if source object has no value", () => {
        mockedHelpers.getCmsEntityByType.mockReturnValue({} as any);

        const { metaDescription } = useCms();
        expect(metaDescription.value).toBeUndefined();
      });
    });
    describe("metaKeywords", () => {
      it("should return metaKeywords extracted from product object", () => {
        mockedHelpers.getCmsEntityByType.mockReturnValue({
          translated: {
            keywords: "Great Keywords!",
          },
        } as any);

        const { metaKeywords } = useCms();
        expect(metaKeywords.value).toBe("Great Keywords!");
      });

      it("should return undefined in case of missing value", () => {
        mockedHelpers.getCmsEntityByType.mockReturnValueOnce({} as any);

        const { metaKeywords } = useCms();
        expect(metaKeywords.value).toBeUndefined();
      });
    });
    describe("loading", () => {
      it("should show default loading state", () => {
        const { loading } = useCms();
        expect(loading.value).toEqual(false);
      });

      it("should show default loading state", () => {
        const { loading } = useCms();
        stateLoading.value = true;
        expect(loading.value).toEqual(true);
      });
    });
  });
});
