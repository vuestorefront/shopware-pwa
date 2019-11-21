const slotsMap = {
  "product-box": "CmsSwProductCart",
  "product-slider": "SwProductSlider",
  image: "SwImage",
  text: "SwTextSlot",
  "vimeo-video": "SwVimeoVideo",
  "youtube-video": "SwYoutubeVideo",
  "product-listing": "SwProductListingSlot",
  // "category-navigation": "SwCategoryNavigationSlot", // waiting for navigation hydration, and domething wrong with accordion
  "sidebar-filter": "SwCategorySidebarFilter"
};

export function getComponentBy(content) {
  if (!content) return;
  const isSlot = !!content.slot;
  let componentName = isSlot ? slotsMap[content.type] : "SwSlots";
  if (!componentName) componentName = "SwNoComponent";
  return () => import(`./elements/${componentName}`);
}
