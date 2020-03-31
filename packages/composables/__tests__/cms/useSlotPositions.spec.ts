import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

import { useSlotsPositions } from "@shopware-pwa/composables";

describe("Composables - useImageProps", () => {
  const slots = [
    {
      slot: "right"
    },
    {
      slot: "left"
    },
    {
      slot: "center"
    },
    {
      slot: "center-left"
    },
    {
      slot: "center-right"
    },
    {
      slot: "left-top"
    },
    {
      slot: "left-bottom"
    }
  ];

  const fakeSlots = [
    {
      slot: "this"
    },
    {
      slot: "is"
    },
    {
      slot: "just"
    },
    {
      slot: "a"
    },
    {
      slot: "test"
    }
  ];

  it("should return computed CmsSlot which contains slot hey wit left value", () => {
    const { leftSlot } = useSlotsPositions(slots as any);
    expect(leftSlot.value).toMatchObject({ slot: "left" });
  });

  it("should return computed title string", () => {
    const { rightSlot } = useSlotsPositions(slots as any);
    expect(rightSlot.value).toMatchObject({ slot: "right" });
  });

  it("should return computed alt string", () => {
    const { centerSlot } = useSlotsPositions(slots as any);
    expect(centerSlot.value).toMatchObject({ slot: "center" });
  });
  it("should return computed url string", () => {
    const { centerLeftSlot } = useSlotsPositions(slots as any);
    expect(centerLeftSlot.value).toMatchObject({ slot: "center-left" });
  });

  it("should return computed title string", () => {
    const { centerRightSlot } = useSlotsPositions(slots as any);
    expect(centerRightSlot.value).toMatchObject({ slot: "center-right" });
  });

  it("should return computed alt string", () => {
    const { leftTopSlot } = useSlotsPositions(slots as any);
    expect(leftTopSlot.value).toMatchObject({ slot: "left-top" });
  });
  it("should return computed alt string", () => {
    const { leftBottomSlot } = useSlotsPositions(slots as any);
    expect(leftBottomSlot.value).toMatchObject({ slot: "left-bottom" });
  });
  it("should return empty string", () => {
    const { leftSlot } = useSlotsPositions(fakeSlots as any);
    expect(leftSlot.value).toBe(undefined);
  });

  it("should return empty string", () => {
    const { centerSlot } = useSlotsPositions(fakeSlots as any);
    expect(centerSlot.value).toBe(undefined);
  });

  it("should return empty string", () => {
    const { centerLeftSlot } = useSlotsPositions(fakeSlots as any);
    expect(centerLeftSlot.value).toBe(undefined);
  });
  it("should return empty string", () => {
    const { centerRightSlot } = useSlotsPositions(fakeSlots as any);
    expect(centerRightSlot.value).toBe(undefined);
  });
  it("should return empty string", () => {
    const { leftTopSlot } = useSlotsPositions(fakeSlots as any);
    expect(leftTopSlot.value).toBe(undefined);
  });
  it("should return empty string", () => {
    const { leftBottomSlot } = useSlotsPositions(fakeSlots as any);
    expect(leftBottomSlot.value).toBe(undefined);
  });
});
