import Vue from "vue";

// Mock Vue Composition API onMounted method
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

import { useCountry } from "@shopware-pwa/composables";
import { ref } from "@vue/composition-api";

const countryMock = {
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

describe("Composables - useCountry", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("refs", () => {});
  describe("computed", () => {
    describe("currentCountry", () => {
      it("should return current country by id", async () => {
        const countryId = ref("123456789");
        const countries = ref([{ ...countryMock }]);
        const { currentCountry } = useCountry(countryId, countries);
        expect(currentCountry.value).toEqual(countryMock);
      });
      it("should return null when no countryId specified", async () => {
        const countryId = ref("");
        const countries = ref([{ ...countryMock }]);
        const { currentCountry } = useCountry(countryId, countries);
        expect(currentCountry.value).toBeNull();
      });
    });
    describe("forceState", () => {
      it("should return false when forceStateInRegistration is false", async () => {
        const countryId = ref("123456789");
        const mockCountry = {
          ...countryMock,
          forceStateInRegistration: false,
        };
        const countries = ref([mockCountry]);
        const { forceState } = useCountry(countryId, countries);
        expect(forceState.value).toEqual(false);
      });
      it("should return false when currentCountry is not set", async () => {
        const countryId = ref("123");
        const mockCountry = { ...countryMock };
        const countries = ref([mockCountry]);
        const { forceState } = useCountry(countryId, countries);
        expect(forceState.value).toEqual(false);
      });
    });
    describe("displayState", () => {
      it("should return false when forceStateInRegistration is false", async () => {
        const countryId = ref("123456789");
        const mockCountry = {
          ...countryMock,
          forceStateInRegistration: false,
        };
        const countries = ref([mockCountry]);
        const { displayState } = useCountry(countryId, countries);
        expect(displayState.value).toEqual(false);
      });
      it("should return false when currentCountry is not set", async () => {
        const countryId = ref("123");
        const mockCountry = { ...countryMock };
        const countries = ref([mockCountry]);
        const { displayState } = useCountry(countryId, countries);
        expect(displayState.value).toEqual(false);
      });
    });
  });
});
