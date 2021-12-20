import { CmsBlock, CmsSection } from "@shopware-pwa/commons";

/**
 * @beta
 */
export interface LayoutConfiguration {
  layoutStyles: {
    backgroundColor: string | null;
    backgroundImage: string | null;
    marginBottom?: string | null | undefined;
    marginLeft?: string | null | undefined;
    marginRight?: string | null | undefined;
    marginTop?: string | null | undefined;
  };
  cssClasses: string | null;
}

/**
 * @beta
 */
export function getCmsLayoutConfiguration(
  content: CmsBlock | CmsSection
): LayoutConfiguration {
  if (!content) {
    return {
      cssClasses: null,
      layoutStyles: {},
    } as any;
  }
  return {
    cssClasses: content.cssClass,
    layoutStyles: {
      backgroundColor: content.backgroundColor,
      backgroundImage: content.backgroundMedia
        ? `url(${content.backgroundMedia.url})`
        : null,
      marginBottom: (content as any).marginBottom,
      marginLeft: (content as any).marginLeft,
      marginRight: (content as any).marginRight,
      marginTop: (content as any).marginTop,
    },
  };
}
