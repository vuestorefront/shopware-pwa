import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

// Mock API client
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;

import { useContext } from "@shopware-pwa/composables";

describe("Composables - useContext", () => {
  describe("refs", () => {
    describe("salutations", () => {
      it("should return null value when fetchSalutations is not called", async () => {
        const { salutations } = useContext();
        expect(salutations.value).toBe(null);
      });
      it("should return salutations array", async () => {
        mockedApiClient.getAvailableSalutations.mockReturnValueOnce({
          data: [
            {
              displayName: "Mr.",
              id: "id",
              salutationKey: "salutatonKey",
              letterName: "Dear Mr."
            },
            {
              displayName: "Mrs.",
              id: "id",
              salutationKey: "salutatonKey",
              letterName: "Dear Mrs."
            }
          ]
        } as any);
        const { salutations, fetchSalutations } = useContext();
        await fetchSalutations();
        expect(salutations.value).toEqual([
          {
            displayName: "Mr.",
            id: "id",
            salutationKey: "salutatonKey",
            letterName: "Dear Mr."
          },
          {
            displayName: "Mrs.",
            id: "id",
            salutationKey: "salutatonKey",
            letterName: "Dear Mrs."
          }
        ]);
      });
    });
    describe("countries", () => {
      it("should return salutations array", async () => {
        mockedApiClient.getAvailableCountries.mockReturnValueOnce({
          data: [
            {
              displayName: "Mr.",
              id: "id",
              salutationKey: "salutatonKey",
              letterName: "Dear Mr."
            },
            {
              displayName: "Mrs.",
              id: "id",
              salutationKey: "salutatonKey",
              letterName: "Dear Mrs."
            }
          ]
        } as any);
        const { countries, fetchCountries } = useContext();
        await fetchCountries();
        expect(countries.value).toEqual([
          {
            displayName: "Mr.",
            id: "id",
            salutationKey: "salutatonKey",
            letterName: "Dear Mr."
          },
          {
            displayName: "Mrs.",
            id: "id",
            salutationKey: "salutatonKey",
            letterName: "Dear Mrs."
          }
        ]);
      });
    });
  });
  describe("computed", () => {
    describe("getMappedSalutations", () => {
      it("should contain empty array when there aren't any available salutations", () => {
        const { getMappedSalutations } = useContext();
        expect(getMappedSalutations.value).toEqual([]);
      });
      it("should contain properly mapped salutations", () => {
        const { salutations, getMappedSalutations } = useContext();
        salutations.value = [
          {
            displayName: "Mr.",
            id: "id",
            salutationKey: "salutatonKey",
            letterName: "Dear Mr."
          },
          {
            displayName: "Mrs.",
            id: "id",
            salutationKey: "salutatonKey",
            letterName: "Dear Mrs."
          }
        ] as any;
        expect(getMappedSalutations.value).toEqual([
          { name: "Mr.", id: "id" },
          { name: "Mrs.", id: "id" }
        ]);
      });
    });
    describe("getMappedCoutries", () => {
      it("should contain empty array when there aren't any available countries", () => {
        const { getMappedCountries } = useContext();
        expect(getMappedCountries.value).toEqual([]);
      });
      it("should contain properly mapped countries", () => {
        const { countries, getMappedCountries } = useContext();
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
    describe("fetchSalutations", () => {
      it("should fetch vailable salutations and assign it to salutaitons array", async () => {
        mockedApiClient.getAvailableSalutations.mockReturnValueOnce({
          data: [
            {
              displayName: "Mr.",
              id: "id",
              salutationKey: "salutatonKey",
              letterName: "Dear Mr."
            },
            {
              displayName: "Mrs.",
              id: "id",
              salutationKey: "salutatonKey",
              letterName: "Dear Mrs."
            }
          ]
        } as any);

        const { fetchSalutations, salutations } = useContext();
        await fetchSalutations();
        expect(salutations.value).toEqual([
          {
            displayName: "Mr.",
            id: "id",
            salutationKey: "salutatonKey",
            letterName: "Dear Mr."
          },
          {
            displayName: "Mrs.",
            id: "id",
            salutationKey: "salutatonKey",
            letterName: "Dear Mrs."
          }
        ]);
        expect(shopwareClient.getAvailableCountries).toHaveBeenCalledTimes(1);
      });
      it("should assing error to error message if getAvailableSalutations throws one", async () => {
        mockedApiClient.getAvailableSalutations.mockImplementationOnce(() => {
          throw new Error("Couldn't fetch available salutations.");
        });
        const { fetchSalutations, error } = useContext();
        await fetchSalutations();
        expect(error.value.toString()).toBe(
          "Error: Couldn't fetch available salutations."
        );
      });
    });
  });
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
      const { fetchCountries, countries } = useContext();
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
      expect(mockedApiClient.getAvailableCountries).toBeCalledTimes(2);
    });
    it("should assing error to error message if getAvailableSalutations throws one", async () => {
      mockedApiClient.getAvailableCountries.mockImplementationOnce(() => {
        throw new Error("Couldn't fetch available countries.");
      });
      const { fetchCountries, error } = useContext();
      await fetchCountries();
      expect(error.value.toString()).toBe(
        "Error: Couldn't fetch available countries."
      );
    });
  });
});
