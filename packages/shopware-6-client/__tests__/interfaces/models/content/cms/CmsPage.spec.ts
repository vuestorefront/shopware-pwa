import {
  CmsSlotType,
  SectionType,
  SizingMode,
  MobileBehavior,
  BackgroundMediaMode,
} from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";

describe("Interfaces - CmsPage", () => {
  it("should contain valid values for CmsSlotType", async () => {
    expect(CmsSlotType.IMAGE).toEqual("image");
    expect(CmsSlotType.PRODUCT_BOX).toEqual("product-box");
    expect(CmsSlotType.PRODUCT_LISTING).toEqual("product-listing");
    expect(CmsSlotType.PRODUCT_SLIDER).toEqual("product-slider");
    expect(CmsSlotType.SLOT).toEqual("slot");
    expect(CmsSlotType.TEXT).toEqual("text");
  });

  it("should contain valid values for SectionType", async () => {
    expect(SectionType.DEFAULT).toEqual("default");
  });

  it("should contain valid values for SizingMode", async () => {
    expect(SizingMode.BOXED).toEqual("boxed");
  });

  it("should contain valid values for MobileBehavior", async () => {
    expect(MobileBehavior.BOXED).toEqual("boxed");
    expect(MobileBehavior.WRAP).toEqual("wrap");
  });

  it("should contain valid values for BackgroundMediaMode", async () => {
    expect(BackgroundMediaMode.COVER).toEqual("cover");
  });
});
