import { Includes } from "@shopware-pwa/commons/interfaces";

/**
 * translate Includes interface into query GET params
 *
 * @beta
 */
export const convertIncludesToGetParams = (includes: Includes): any => {
  let queryParams: any = {};
  if (!includes) {
    return queryParams;
  }

  for (const apiAlias of Object.keys(includes)) {
    const fields = includes[apiAlias];
    for (const field of fields) {
      queryParams[`includes[${apiAlias}][${field}]`] = field;
    }
  }

  return queryParams;
};
