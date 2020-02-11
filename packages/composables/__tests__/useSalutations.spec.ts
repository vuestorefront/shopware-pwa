import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

// Mock API client
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;

import { useContext } from "@shopware-pwa/composables";

describe("Composables - useSalutations", () => {
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
});