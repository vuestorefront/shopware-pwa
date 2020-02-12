import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

// Mock API client
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;

import { useCountries } from "@shopware-pwa/composables";
(useCountries as any).onMounted = jest.fn()

describe("Composables - useCountries", () => {
  describe("refs", () => {
    describe("countries", () => {
      it("should return countries array", async () => {
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
        const { countries, fetchCountries } = useCountries();
        await fetchCountries();
        expect(countries.value).toEqual([
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
  describe("computed", () => {
    describe("getMappedCoutries", () => {
      it("should contain empty array when there aren't any available countries", () => {
        const { getMappedCountries } = useCountries();
        expect(getMappedCountries.value).toEqual([]);
      });
      it("should contain properly mapped countries", () => {
        const { countries, getMappedCountries } = useCountries();
        countries.value = [
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
        ] as any;
        expect(getMappedCountries.value).toEqual([
          { name: "Norway", id: "id" },
          { name: "Romania", id: "id" }
        ]);
      });
    });
  });
  describe("methods", () => {
    describe("fetchCoutries", () => {
      it("should fetch available countries and assign it to countries array", async () => {
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
        const { fetchCountries, countries } = useCountries();
        await fetchCountries();
        expect(countries.value).toEqual([
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
  });
});
