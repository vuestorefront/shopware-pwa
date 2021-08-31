import { ShopwareAssociation } from "@shopware-pwa/commons/interfaces/search/Association";

const extractSubProperties = (associations: any, aggregator: string[]) => {
  if (!Array.isArray(associations)) {
    return;
  }
  for (const association of associations) {
    aggregator.push("associations");
    aggregator.push(association.name);
    extractSubProperties(association.associations, aggregator);
  }
};

export const convertAssociationsToGetParams = (
  associations: ShopwareAssociation[]
) => {
  if (!Array.isArray(associations)) {
    return;
  }

  let queryParams: any = {};
  for (const association of associations) {
    let aggregations: string[] = [];
    association.associations &&
      extractSubProperties(association.associations, aggregations);
    const key: string = !aggregations.length
      ? `associations[${association.name}]`
      : `associations[${association.name}][${aggregations.join("][")}]`;
    queryParams[`${key}[]`] = true;
  }

  return queryParams;
};
