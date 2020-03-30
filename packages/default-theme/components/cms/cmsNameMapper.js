const slotsMap = {
  'product-box': 'CmsSwProductCart',
  'product-slider': 'SwProductSlider',
  image: 'SwImage',
  text: 'SwTextSlot',
  'vimeo-video': 'SwVimeoVideo',
  'youtube-video': 'SwYoutubeVideo',
  'product-listing': 'SwProductListingSlot',
  'category-navigation': 'SwCategoryNavigationSlot', // waiting for navigation hydration, and domething wrong with accordion
  'sidebar-filter': 'SwCategorySidebarFilter'
}

const blocksMap = {
  'image-bubble-row': 'SwImageBubbleRow',
  'image-two-column': 'SwImageTwoColumn'
}

export function getComponentBy(content) {
  if (!content) return
  const isSlot = !!content.blockId
  const isBlock = !!content.sectionId

  let componentName
  if (isBlock) {
    componentName = blocksMap[content.type]
  }
  if (!componentName) {
    componentName = isSlot ? slotsMap[content.type] : 'SwSlots'
  }
  if (!componentName) componentName = 'SwNoComponent'

  const isBlockFolder =
    isBlock && componentName !== 'SwSlots' && componentName !== 'SwNoComponent'
  return () =>
    import(
      `@shopware-pwa/default-theme/components/cms/${
        isBlockFolder ? 'blocks' : 'elements'
      }/${componentName}`
    )
}
