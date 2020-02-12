jest.mock("vue")
import observable from "vue";
const Vue = jest.requireActual("vue");

import VueCompostionApi, * as vueComp from "@vue/composition-api";

Vue.use(VueCompostionApi);
(vueComp.onMounted as any) = jest.fn(callback => {})

// Mock API client
// import * as shopwareClient from "@shopware-pwa/shopware-6-client";
// jest.mock("@shopware-pwa/shopware-6-client");
// const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;

import { useSalutations } from "@shopware-pwa/composables";

describe("Composables - useSalutations", () => {
  describe("computed", () => {
    describe("getMappedSalutations", () => {
      it("should contain empty array when there aren't any available salutations", () => {
        (observable as any).mockResolvedValueOnce({ salutations: null });
        const { getSalutations } = useSalutations();
        expect(getSalutations.value).toEqual([]);
      });
      it("should contain properly mapped salutations", () => {
        const { getSalutations } = useSalutations();
        (observable as any).mockReturnValueOnce([
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
        ])
        expect(getSalutations.value).toEqual([
          { name: "Mr.", id: "id" },
          { name: "Mrs.", id: "id" }
        ]);
      });
    });
  });
  // describe("methods", () => {
  //   describe("fetchSalutations", () => {
  //     it("should fetch vailable salutations and assign it to salutaitons array", async () => {
  //       mockedApiClient.getAvailableSalutations.mockReturnValueOnce({
  //         data: [
  //           {
  //             displayName: "Mr.",
  //             id: "id",
  //             salutationKey: "salutatonKey",
  //             letterName: "Dear Mr."
  //           },
  //           {
  //             displayName: "Mrs.",
  //             id: "id",
  //             salutationKey: "salutatonKey",
  //             letterName: "Dear Mrs."
  //           }
  //         ]
  //       } as any);

  //       const { fetchSalutations, salutations } = useSalutations();
  //       await fetchSalutations();
  //       expect(salutations.value).toEqual([
  //         {
  //           displayName: "Mr.",
  //           id: "id",
  //           salutationKey: "salutatonKey",
  //           letterName: "Dear Mr."
  //         },
  //         {
  //           displayName: "Mrs.",
  //           id: "id",
  //           salutationKey: "salutatonKey",
  //           letterName: "Dear Mrs."
  //         }
  //       ]);
  //     });
  //     it("should assing error to error message if getAvailableSalutations throws one", async () => {
  //       mockedApiClient.getAvailableSalutations.mockImplementationOnce(() => {
  //         throw new Error("Couldn't fetch available salutations.");
  //       });
  //       const { fetchSalutations, error } = useSalutations();
  //       await fetchSalutations();
  //       expect(error.value.toString()).toBe(
  //         "Error: Couldn't fetch available salutations."
  //       );
  //     });
  //   });
});
