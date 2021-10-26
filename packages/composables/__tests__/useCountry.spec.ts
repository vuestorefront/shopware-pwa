import { computed, ComputedRef, ref } from "vue-demi";
import { useCountry } from "../src/hooks/useCountry";

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

describe("Composables - useCountry", () => {
  let countryMock: any = ref();
  beforeEach(() => {
    jest.resetAllMocks();
    countryMock.value = {
      active: true,
      createdAt: "",
      customFields: null,
      name: "Germany",
      iso: null,
      translated: null,
      updatedAt: null,
      versionId: null,
      id: "123456789",
      position: 1,
      taxFree: false,
      shippingAvailable: true,
      iso3: null,
      displayStateInRegistration: true,
      forceStateInRegistration: true,
      states: null,
      translations: null,
      orderAddresses: null,
      customerAddress: null,
      salesChannelDefaultAssignments: null,
      salesChannels: null,
    };

    mockedComposables.useCountries.mockImplementation(() => {
      return {
        getCountries: computed(() => [countryMock.value]),
      } as any;
    });
  });

  describe("refs", () => {});
  describe("computed", () => {
    describe("currentCountry", () => {
      it("should return current country by id", async () => {
        const countryId = ref("123456789");
        const { currentCountry } = useCountry({
          countryId: countryId as ComputedRef,
        });
        expect(currentCountry.value).toEqual(countryMock.value);
      });
      it("should return null when no countryId specified", async () => {
        const countryId = ref("");
        const { currentCountry } = useCountry({
          countryId: countryId as ComputedRef,
        });
        expect(currentCountry.value).toBeNull();
      });
    });
    describe("forceState", () => {
      it("should return false when forceStateInRegistration is false", async () => {
        const countryId = ref("123456789");
        countryMock.value.forceStateInRegistration = false;
        const { forceState } = useCountry({
          countryId: countryId as ComputedRef,
        });
        expect(forceState.value).toEqual(false);
      });
      it("should return false when currentCountry is not set", async () => {
        const countryId = ref("123");
        const { forceState } = useCountry({
          countryId: countryId as ComputedRef,
        });
        expect(forceState.value).toEqual(false);
      });
    });
    describe("displayState", () => {
      it("should return false when forceStateInRegistration is false", async () => {
        const countryId = ref("123456789");
        countryMock.value.forceStateInRegistration = false;
        const { displayState } = useCountry({
          countryId: countryId as ComputedRef,
        });
        expect(displayState.value).toEqual(false);
      });
      it("should return false when currentCountry is not set", async () => {
        const countryId = ref("123");
        const { displayState } = useCountry({
          countryId: countryId as ComputedRef,
        });
        expect(displayState.value).toEqual(false);
      });
    });
  });
});
