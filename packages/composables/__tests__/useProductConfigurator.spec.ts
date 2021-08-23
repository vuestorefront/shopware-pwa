import * as shopwareClient from "@shopware-pwa/shopware-6-client";

jest.mock("@shopware-pwa/shopware-6-client");
const mockedAxios = shopwareClient as jest.Mocked<typeof shopwareClient>;

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

import { useProductConfigurator } from "../src/logic/useProductConfigurator";
import { Ref, ref } from "vue-demi";

describe("Composables - useProductConfigurator", () => {
  const statePage: Ref<Object | null> = ref(null);
  const rootContextMock: any = {
    apiInstance: {
      defaults: {
        headers: {},
      },
      invokePost: jest.fn(),
    },
  };
  beforeEach(() => {
    jest.resetAllMocks();

    mockedComposables.useCms.mockImplementation(() => {
      return {
        page: statePage,
      } as any;
    });

    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: false,
      isVueScope: true,
    });
    mockedComposables.getApplicationContext.mockReturnValue(rootContextMock);
  });
  describe("on init", () => {
    it("should have selected options extracted from optionIds and given configurator object", () => {
      statePage.value = {
        configurator: [
          {
            translated: {
              name: "color",
            },
            options: [
              {
                id: "12345",
              },
            ],
          },
        ],
      };
      const { getSelectedOptions } = useProductConfigurator(rootContextMock, {
        optionIds: ["12345"],
      } as any);
      expect(getSelectedOptions.value).toStrictEqual({
        color: "12345",
      });
    });
    it("should not have selected options extracted from optionIds and given configurator object if some values dont match", () => {
      statePage.value = {
        configurator: [
          {
            translated: {
              name: "color",
            },
            options: [
              {
                id: "54321",
              },
            ],
          },
        ],
      };
      const { getSelectedOptions } = useProductConfigurator(rootContextMock, {
        optionIds: ["12345"],
      } as any);
      expect(getSelectedOptions.value).toStrictEqual({});
    });
    it("should not have selected options if there is no configurator object", () => {
      const { getSelectedOptions } = useProductConfigurator(
        rootContextMock,
        {} as any
      );
      expect(getSelectedOptions.value).toStrictEqual({});
    });
    it("should not have selected options extracted from passed product if there are no required values", () => {
      const { getSelectedOptions } = useProductConfigurator(rootContextMock, {
        options: [
          {
            id: "12345",
            group: {
              translated: undefined,
            },
          },
        ],
      } as any);
      expect(getSelectedOptions.value).toStrictEqual({});
    });
  });
  describe("methods", () => {
    describe("handleChange", () => {
      it("should assign new selected option for given group", () => {
        const { handleChange, getSelectedOptions } = useProductConfigurator(
          rootContextMock,
          {} as any
        );
        handleChange("color", "blue");
        expect(getSelectedOptions.value).toStrictEqual({ color: "blue" });
      });

      it("should invoke onChangeHandled callback after handling a change", () => {
        const { handleChange } = useProductConfigurator(
          rootContextMock,
          {} as any
        );
        const onChangeHandledCallback = jest.fn();
        handleChange("color", "blue", onChangeHandledCallback);
        expect(onChangeHandledCallback).toBeCalledTimes(1);
      });
    });

    describe("findVariantForSelectedOptions", () => {
      const consoleErrorSpy = jest.spyOn(console, "error");
      consoleErrorSpy.mockImplementation(() => {});
      it("should log error in console.error output", async () => {
        mockedAxios.invokePost.mockRejectedValueOnce("Something went wrong");
        const { findVariantForSelectedOptions, handleChange } =
          useProductConfigurator(rootContextMock, {
            parentId: "some-parent-id",
          } as any);

        handleChange("color", "blue");
        await findVariantForSelectedOptions();
        expect(consoleErrorSpy).toBeCalledWith(
          "SwProductDetails:findVariantForSelectedOptions",
          "Something went wrong"
        );
      });

      it("should return undefined if the response does not match expected format", async () => {
        mockedAxios.invokePost.mockResolvedValue({
          data: {
            data: undefined,
          },
        });
        const { findVariantForSelectedOptions } = useProductConfigurator(
          rootContextMock,
          {
            parentId: "some-parent-id",
          } as any
        );

        const variantFound = await findVariantForSelectedOptions();
        expect(variantFound).toBeUndefined();
      });

      it("should return undefined if the response does not match expected format", async () => {
        mockedAxios.invokePost.mockResolvedValue({
          data: undefined,
        });
        const { findVariantForSelectedOptions } = useProductConfigurator(
          rootContextMock,
          {
            parentId: "some-parent-id",
          } as any
        );

        const variantFound = await findVariantForSelectedOptions();
        expect(variantFound).toBeUndefined();
      });

      it("should return undefined if the response does not match expected format", async () => {
        mockedAxios.invokePost.mockResolvedValue(undefined);
        const { findVariantForSelectedOptions } = useProductConfigurator(
          rootContextMock,
          {
            parentId: "some-parent-id",
          } as any
        );

        const variantFound = await findVariantForSelectedOptions();
        expect(variantFound).toBeUndefined();
      });

      it("should invoke invokePost method once on variant found", async () => {
        mockedAxios.invokePost.mockResolvedValue({
          data: {
            elements: [
              {
                id: "variant-id",
              },
            ],
          },
        });
        const { findVariantForSelectedOptions, handleChange } =
          useProductConfigurator(rootContextMock, {
            parentId: "some-parent-id",
          } as any);

        handleChange("color", "blue");

        const variantFound = await findVariantForSelectedOptions();
        expect(variantFound).toStrictEqual({ id: "variant-id" });
        expect(mockedAxios.invokePost).toBeCalledTimes(1);
        expect(mockedAxios.invokePost).toBeCalledWith(
          {
            address: undefined,
            payload: {
              associations: {
                seoUrls: {},
              },
              filter: [
                {
                  field: "parentId",
                  type: "equals",
                  value: "some-parent-id",
                },
                {
                  field: "optionIds",
                  type: "equals",
                  value: "blue",
                },
              ],
              includes: {
                product: ["id", "translated", "productNumber", "seoUrls"],
                seo_url: ["seoPathInfo"],
              },
              limit: 1,
            },
          },
          {
            defaults: { headers: { "sw-include-seo-urls": true } },
            invokePost: expect.anything(),
          }
        );
      });
    });
  });

  describe("computed", () => {
    describe("isLoadingOptions", () => {
      it("should start with true if there are options for given product", () => {
        const { isLoadingOptions } = useProductConfigurator(rootContextMock, {
          options: [
            {
              id: "optionId",
            },
          ],
        } as any);
        expect(isLoadingOptions.value).toBe(true);
      });
    });
    it("should start with false if there are no options for given product", () => {
      const { isLoadingOptions } = useProductConfigurator(rootContextMock, {
        options: [],
      } as any);
      expect(isLoadingOptions.value).toBe(false);
    });

    describe("getOptionGroups", () => {
      it("should have options from page's configurator ", () => {
        statePage.value = {
          configurator: [
            {
              id: "group_1",
            },
            {
              id: "group_2",
            },
          ],
        };

        const { getOptionGroups } = useProductConfigurator(
          rootContextMock,
          {} as any
        );
        expect(getOptionGroups.value).toStrictEqual([
          { id: "group_1" },
          { id: "group_2" },
        ]);
      });

      it("should contain empty array if the page's configurator value is empty or falsy", () => {
        statePage.value = {
          configurator: undefined,
        };

        const { getOptionGroups } = useProductConfigurator(
          rootContextMock,
          {} as any
        );
        expect(getOptionGroups.value).toStrictEqual([]);
      });

      it("should contain empty array if the page value is empty", () => {
        statePage.value = null;

        const { getOptionGroups } = useProductConfigurator(
          rootContextMock,
          {} as any
        );
        expect(getOptionGroups.value).toStrictEqual([]);
      });
    });
  });
});
