import { Media } from "../media/Media";
import {
  BackgroundMediaMode,
  CmsSection,
  CmsSlot,
  MobileBehavior,
  SizingMode,
} from "./CmsPage";
/**
 * @public
 */
export interface CmsBlock {
  apiAlias: string;
  createdAt: string;
  customFields: null | unknown;
  extensions: unknown;
  id: string;
  locked: true;
  marginBottom: string | null;
  marginLeft: string | null;
  marginRight: string | null;
  marginTop: string | null;
  name: string;
  position: number;
  section: CmsSection | null;
  sectionId: string;
  sectionPosition: string;
  slots: CmsSlot[];
  translated: unknown;
  type: string;
  updatedAt: Date | null;
  versionId: string | null;
  _uniqueIdentifier: string;
  sizingMode: SizingMode;
  mobileBehavior: MobileBehavior;
  backgroundColor: string | null;
  backgroundMediaId: string | null;
  backgroundMedia: Media | null;
  backgroundMediaMode: BackgroundMediaMode;
  cssClass: string | null;
}
