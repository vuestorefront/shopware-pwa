// Mock Vue Composition API onMounted method
import vueComp, { ref } from "vue-demi";
(vueComp.onMounted as any) = jest.fn();

// Mock API client
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

import { useCountries } from "../src/hooks/useCountries";
import { prepareRootContextMock } from "./contextRunner";

describe("Composables - useCountries", () => {
  const rootContextMock = prepareRootContextMock();
  const stateSharedRef = ref();

  beforeEach(() => {
    jest.resetAllMocks();

    mockedComposables.useSharedState.mockImplementation(() => {
      return {
        sharedRef: () => stateSharedRef,
      } as any;
    });

    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: false,
      isVueScope: true,
    });
    mockedComposables.getApplicationContext.mockReturnValue(rootContextMock);
  });

  describe("refs", () => {});
  describe("computed", () => {
    describe("getMappedCoutries", () => {
      it("should contain empty array when there aren't any available countries", async () => {
        mockedApiClient.getAvailableCountries.mockReturnValueOnce({
          data: null,
        } as any);
        const { getCountries, fetchCountries } = useCountries();
        await fetchCountries();
        expect(getCountries.value).toEqual([]);
      });
      it("should contain properly fetched countries", async () => {
        mockedApiClient.getAvailableCountries.mockReturnValueOnce({
          elements: [
            {
              name: "Norway",
              active: true,
              id: "id",
              iso: "iso",
              createdAt: "date",
            },
            {
              name: "Romania",
              active: true,
              id: "id",
              iso: "iso",
              createdAt: "date",
            },
          ],
        } as any);
        const { fetchCountries, getCountries } = useCountries();
        await fetchCountries();
        expect(getCountries.value).toEqual([
          {
            name: "Norway",
            active: true,
            id: "id",
            iso: "iso",
            createdAt: "date",
          },
          {
            name: "Romania",
            active: true,
            id: "id",
            iso: "iso",
            createdAt: "date",
          },
        ]);
      });
    });
  });
  describe("methods", () => {
    describe("fetchCoutries", () => {
      it("should assing error to error message if getAvailableCountries throws one", async () => {
        mockedApiClient.getAvailableCountries.mockRejectedValueOnce({
          messages: "Couldn't fetch available countries.",
        });
        const { fetchCountries, error } = useCountries();
        await fetchCountries();
        expect(error.value).toEqual("Couldn't fetch available countries.");
      });
    });
    describe("onMounted", () => {
      it("should(call onMounted on useCountries mount", () => {
        useCountries();
        expect(vueComp.onMounted).toBeCalled();
      });
    });
    describe("onMountedCallback", () => {
      it("should call fetch countries on mounted when getCountries is any empty list", async () => {
        mockedApiClient.getAvailableCountries.mockReturnValueOnce({
          data: null,
        } as any);
        const { fetchCountries, mountedCallback, getCountries } =
          useCountries();
        await fetchCountries();
        mockedApiClient.getAvailableCountries.mockReturnValueOnce({
          elements: [
            {
              name: "Norway",
              active: true,
              id: "id",
              iso: "iso",
              createdAt: "date",
            },
            {
              name: "Romania",
              active: true,
              id: "id",
              iso: "iso",
              createdAt: "date",
            },
          ],
        } as any);
        await mountedCallback();
        expect(getCountries.value).toEqual([
          {
            name: "Norway",
            active: true,
            id: "id",
            iso: "iso",
            createdAt: "date",
          },
          {
            name: "Romania",
            active: true,
            id: "id",
            iso: "iso",
            createdAt: "date",
          },
        ]);
      });
    });
    describe("onMountedCallback", () => {
      it("should call fetch countries when getCountries is any empty list", async () => {
        mockedApiClient.getAvailableCountries.mockReturnValueOnce({
          elements: [
            {
              name: "England",
              active: true,
              id: "id",
              iso: "iso",
              createdAt: "date",
            },
            {
              name: "Turkey",
              active: true,
              id: "id",
              iso: "iso",
              createdAt: "date",
            },
          ],
        } as any);
        const { fetchCountries, mountedCallback, getCountries } =
          useCountries();
        await fetchCountries();
        mockedApiClient.getAvailableCountries.mockReturnValueOnce({
          elements: [
            {
              name: "Norway",
              active: true,
              id: "id",
              iso: "iso",
              createdAt: "date",
            },
            {
              name: "Romania",
              active: true,
              id: "id",
              iso: "iso",
              createdAt: "date",
            },
          ],
        } as any);
        await mountedCallback();
        expect(getCountries.value).toEqual([
          {
            name: "England",
            active: true,
            id: "id",
            iso: "iso",
            createdAt: "date",
          },
          {
            name: "Turkey",
            active: true,
            id: "id",
            iso: "iso",
            createdAt: "date",
          },
        ]);
      });
    });
  });
});
