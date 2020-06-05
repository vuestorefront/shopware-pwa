/**
 * @beta
 */
export interface AggregationFilterEntity {
  name: string;
  displayType: string;
  sortingType: string;
  description: string | null;
  position: number;
  options: AggregationFilterEntityOption[];
}

/**
 * @beta
 */
export interface AggregationFilterEntityOption {
  groupId: string;
  name: string;
  position: number;
  colorHexCode: string | null;
  mediaId: string | null;
  group: string;
  translations: any | null;
  productConfiguratorSettings: any | null;
  productProperties: any | null;
  productOptions: any | null;
  media: any | null;
  customFields: any | null;
  _uniqueIdentifier: string;
  versionId: null;
  translated: {
    name: string;
    position: number;
    customFields: [];
  };
  createdAt: Date;
  updatedAt: null;
  extensions: {
    foreignKeys: {
      apiAlias: string;
    };
  };
  id: string;
  apiAlias: string;
}

/**
 * @beta
 */
export interface Aggregations {
  manufacturer: {
    entities: AggregationFilterEntity[];
  };
  price: {
    min: number;
    max: number;
    avg: number;
    sum: number;
    apiAlias: string;
  };
  "shipping-free": {
    max: number;
    apiAlias: string;
  };
  rating: {
    max: number;
    apiAlias: string;
  };
  properties: {
    entities: AggregationFilterEntity[];
  };
}
