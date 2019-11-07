const namesMap = {
  "product-box": "CmsSwProductCart",
  default: "SwSection",
  "product-slider": "SwSlots",
  "product-three-column": "SwSlots",
  image: "SwSlots",
  text: "SwSlots",
  "text-teaser": "SwSlots",
  "text-two-column": "SwSlots",
  "text-three-column": "SwSlots",
  "text-teaser-section": "SwSlots",
  "vimeo-video": "SwSlots",
  "youtube-video": "SwSlots",
  "product-listing": "SwSlots"
};

const slotsMap = {
  "product-box": "CmsSwProductCart",
  "product-slider": "SwProductSlider",
  image: "SwImage",
  text: "SwTextSlot",
  "vimeo-video": "SwVimeoVideo",
  "youtube-video": "SwYoutubeVideo",
  "product-listing": "SwProductListingSlot"
};

export function getComponentBy(content) {
  if (!content) return;
  const isSlot = !!content.slot;
  const componentsMap = isSlot ? slotsMap : namesMap;
  const componentName = componentsMap[content.type] || "SwNoComponent";
  return () => import("./elements/" + componentName);
}
