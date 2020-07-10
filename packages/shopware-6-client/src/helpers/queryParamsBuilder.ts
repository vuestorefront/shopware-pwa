const queryString = require("query-string");

const ARRAY_FORMAT = "separator";
const ARRAY_FORMAT_SEPARATOR = "|";
const SKIP_NULL = true;
const SORT = false;

/**
 * Convert given object into query string
 *
 * TODO: handle the includes and associations specific format after #911 is merged
 *
 * @beta
 */
export const getQueryString = (params: any) =>
  typeof params === "string"
    ? params
    : queryString.stringify(params, {
        arrayFormat: ARRAY_FORMAT,
        arrayFormatSeparator: ARRAY_FORMAT_SEPARATOR,
        skipNull: SKIP_NULL,
        sort: SORT,
      });
