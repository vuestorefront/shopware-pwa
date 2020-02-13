import Vue from "vue";

import VueCompostionApi, * as vueComp from "@vue/composition-api";

Vue.use(VueCompostionApi);
(vueComp.onMounted as any) = jest.fn()

// Mock API client
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;

import { useSalutations } from "@shopware-pwa/composables";

describe("Composables - useSalutations", () => {
  describe("computed", () => {
    describe("getMappedSalutations", () => {
      it("should contain empty array when there aren't any available salutations", async () => {
        mockedApiClient.getAvailableSalutations.mockReturnValueOnce(null as any);
        const { getSalutations, fetchSalutations } = useSalutations();
        await fetchSalutations();
        expect(getSalutations.value).toEqual([]);
      });
      it("should contain properly fetched salutations", async () => {
        const { getSalutations, fetchSalutations } = useSalutations();
        mockedApiClient.getAvailableSalutations.mockReturnValueOnce({ data: [
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
        ]} as any)
        await fetchSalutations();
        expect(getSalutations.value).toEqual([
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
  describe("methods", () => {
    describe("fetchSalutations", () => {
      it("should assing error to error message if getAvailableSalutations throws one", async () => {
        mockedApiClient.getAvailableSalutations.mockImplementationOnce(() => {
          throw new Error("Couldn't fetch available salutations.");
        });
        const { fetchSalutations, error } = useSalutations();
        await fetchSalutations();
        expect(error.value.toString()).toBe(
          "Error: Couldn't fetch available salutations."
        );
      });
    });
  });
});
