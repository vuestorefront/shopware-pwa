const namesMap = {
  "product-box": "CmsSwProductCart",
  default: "SwSection",
  "product-slider": "SwSlots",
  "product-three-column": "SwSlots",
  image: "SwSlots",
  "vimeo-video": "SwSlots"
};

const slotsMap = {
  "product-box": "CmsSwProductCart",
  "product-slider": "SwProductSlider",
  image: "SwImage",
  "vimeo-video": "SwVimeoVideo"
};

export function getComponentBy(content) {
  if (!content) return;
  const isSlot = !!content.slot;
  const componentsMap = isSlot ? slotsMap : namesMap;
  const componentName = componentsMap[content.type] || "SwNoComponent";
  return () => import("./elements/" + componentName);
}
