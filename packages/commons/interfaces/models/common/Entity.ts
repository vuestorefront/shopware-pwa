/**
 * Parent interface of all the interfaces for Shopware model entities.
 *
 * It provides the following fields: _uniqueIdentifier:string, versionId:string, translated[], createdAt:Date|null, updatedat:Date|null.
 */
/**
 * @alpha
 */
export interface Entity {
  _uniqueIdentifier: string;
  versionId: string;
  translated: [];
  createdAt: Date | null;
  updatedAt: Date | null;
}
