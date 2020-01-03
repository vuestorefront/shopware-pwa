import { getStore, setStore } from "@shopware-pwa/composables";

describe("Shopware composables - storeRef", () => {
  it("should return empty store instance when not set", async () => {
    const store = getStore();
    expect(store).toBeUndefined();
  });

  it("should return setted store instance", () => {
    const mockedStoreInstance = "STORE";
    setStore(mockedStoreInstance);
    const store = getStore();
    expect(store).toEqual(mockedStoreInstance);
  });
});
