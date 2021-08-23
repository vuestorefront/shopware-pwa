export interface OrderState {
  name: string;
  technicalName: string;
  _uniqueIdentifier: string;
  versionId: string | null;
  translated: unknown;
  createdAt: Date;
  updatedAt: Date | null;
  extensions: unknown;
  customFields: null | unknown;
  apiAlias: string;
}
