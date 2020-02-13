import Vue from "vue";
import VueCompostionApi, * as vueComp from "@vue/composition-api";

Vue.use(VueCompostionApi);
(vueComp.onMounted as any) = jest.fn();

// Mock API client
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;

import { useCountries, sharedCountries } from "@shopware-pwa/composables";
(useCountries as any).onMounted = jest.fn()

describe("Composables - useCountries", () => {
  describe("refs", () => {
    
  });
  describe("computed", () => {
    describe("getMappedCoutries", () => {
      it("should contain empty array when there aren't any available countries", async () => {
        mockedApiClient.getAvailableCountries.mockReturnValueOnce(null as any)
        const { getCountries, fetchCountries } = useCountries();
        await fetchCountries();
        expect(getCountries.value).toEqual([]);
      });
      it("should contain properly fetched countries", async () => {
        mockedApiClient.getAvailableCountries.mockReturnValueOnce({
          data: [
            {
              name: "Norway",
              active: true,
              id: "id",
              iso: "iso",
              createdAt: "date"
            },
            {
              name: "Romania",
              active: true,
              id: "id",
              iso: "iso",
              createdAt: "date"
            }
          ]
        } as any);
        const { fetchCountries, getCountries } = useCountries();
        await fetchCountries();
        expect(getCountries.value).toEqual([
          {
            name: "Norway",
            active: true,
            id: "id",
            iso: "iso",
            createdAt: "date"
          },
          {
            name: "Romania",
            active: true,
            id: "id",
            iso: "iso",
            createdAt: "date"
          }
        ]);
      });
    });
  });
  describe("methods", () => {
    describe("fetchCoutries", () => {
      it("should assing error to error message if getAvailableCountries throws one", async () => {
        mockedApiClient.getAvailableCountries.mockImplementationOnce(() => {
          throw new Error("Couldn't fetch available countries.");
        });
        const { fetchCountries, error } = useCountries();
        await fetchCountries();
        expect(error.value.toString()).toBe(
          "Error: Couldn't fetch available countries."
        );
      });
    });
    describe("onMounted", () => {
      it("should(call onMounted on useCountries mount", () => {
        useCountries()
        expect(vueComp.onMounted).toBeCalled();
      });
    });
    describe("onMountedCallback", () => {
      it("should call fetch countries on mounted when getCountries is any empty list", async () => {
        sharedCountries.countries = null;
        mockedApiClient.getAvailableCountries.mockReturnValueOnce({
          data: [
            {
              name: "Norway",
              active: true,
              id: "id",
              iso: "iso",
              createdAt: "date"
            },
            {
              name: "Romania",
              active: true,
              id: "id",
              iso: "iso",
              createdAt: "date"
            }
          ]
        } as any);
        const { mountedCallback, getCountries } = useCountries();
        await mountedCallback();
        expect(getCountries.value).toEqual([
            {
              name: "Norway",
              active: true,
              id: "id",
              iso: "iso",
              createdAt: "date"
            },
            {
              name: "Romania",
              active: true,
              id: "id",
              iso: "iso",
              createdAt: "date"
            }
          ]);
      });
    });
    describe("onMountedCallback", () => {
      it("should call fetch countries when getCountries is any empty list", async () => {
        sharedCountries.countries = [
            {
              name: "England",
              active: true,
              id: "id",
              iso: "iso",
              createdAt: "date"
            },
            {
              name: "Turkey",
              active: true,
              id: "id",
              iso: "iso",
              createdAt: "date"
            }
          ];
        mockedApiClient.getAvailableCountries.mockReturnValueOnce({
          data: [
            {
              name: "Norway",
              active: true,
              id: "id",
              iso: "iso",
              createdAt: "date"
            },
            {
              name: "Romania",
              active: true,
              id: "id",
              iso: "iso",
              createdAt: "date"
            }
          ]
        } as any);
        const { mountedCallback, getCountries } = useCountries();
        await mountedCallback();
        expect(getCountries.value).toEqual([
            {
              name: "England",
              active: true,
              id: "id",
              iso: "iso",
              createdAt: "date"
            },
            {
              name: "Turkey",
              active: true,
              id: "id",
              iso: "iso",
              createdAt: "date"
            }
          ]);
      });
    });
  });
});
