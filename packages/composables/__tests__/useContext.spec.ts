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
      it("should return salutations array", () => {
        mockedApiClient.getAvailableSalutations.mockReturnValueOnce([
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
        ] as any);
        const { salutations, fetchSalutations } = useContext();
      });
    });
    //describe("countries", () => {});
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
  //describe("methods", () => {
  //describe("fetchSalutations", () => {});
  //describe("fetchCoutries", () => {});
  //});
});
