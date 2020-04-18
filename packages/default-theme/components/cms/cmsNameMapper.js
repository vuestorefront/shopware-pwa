const slotsMap = {
  'product-box': 'CmsSlotProductCard',
  'product-slider': 'CmsSlotProductSlider',
  image: 'CmsSlotImage',
  text: 'CmsSlotText',
  'vimeo-video': 'CmsSlotVideoVimeo',
  'youtube-video': 'CmsSlotVideoYoutube',
  'product-listing': 'CmsSlotProductListing',
  'category-navigation': 'CmsSlotCategoryNavigation',
  'sidebar-filter': 'CmsSlotCategorySidebarFilter',
}

const blocksMap = {
  'text-on-image': 'CmsBlockTextOnImage',
  'sidebar-filter': 'CmsBlockDefault',
  'product-listing': 'CmsBlockDefault',
  'image-text': 'CmsBlockTextOnImage',
  image: 'CmsBlockDefault',
  'image-cover': 'CmsBlockImageCover',
  'category-navigation': 'CmsBlockCategoryNavigation',
  'image-bubble-row': 'CmsBlockImageBubbleRow',
}

const sectionsMap = {
  default: 'CmsSectionDefault',
  sidebar: 'CmsSectionSidebar',
}

export function getComponentBy(content) {
  if (!content) return
  let componentName = null
  const isSection = !!content.pageId
  if (isSection) {
    componentName = sectionsMap[content.type]
    if (componentName)
      return () =>
        import(
          '@shopware-pwa/default-theme/components/cms/sections/' + componentName
        )
  }
  const isBlock = !!content.sectionId
  if (isBlock) {
    componentName = blocksMap[content.type]
    if (componentName)
      return () =>
        import(
          '@shopware-pwa/default-theme/components/cms/blocks/' + componentName
        )
  }

  const isSlot = !!content.blockId
  if (isSlot) {
    componentName = slotsMap[content.type]
    if (componentName)
      return () =>
        import(
          '@shopware-pwa/default-theme/components/cms/slots/' + componentName
        )
  }

  return () =>
    import(`@shopware-pwa/default-theme/components/cms/CmsNoComponent`)
}
