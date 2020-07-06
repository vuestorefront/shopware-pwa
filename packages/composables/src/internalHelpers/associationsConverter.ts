const extractSubProperties = (object: any, aggregator: string[]) => {
  const properties = Object.keys(object);
  if (!properties.length) {
    return;
  }

  for (const property of properties) {
    aggregator.push(property);
    extractSubProperties(object[property], aggregator);
  }
};

export const convertAssociationsToGetParams = (associations: any = {}) => {
  let queryParams: any = {};
  for (const apiAlias of Object.keys(associations)) {
    const fields = associations[apiAlias];
    let aggregations: string[] = [];
    extractSubProperties(fields, aggregations);
    const key: string = !aggregations.length
      ? `associations[${apiAlias}]`
      : `associations[${apiAlias}][${aggregations.join("][")}]`;
    queryParams[`${key}[]`] = true;
  }

  return queryParams;
};
