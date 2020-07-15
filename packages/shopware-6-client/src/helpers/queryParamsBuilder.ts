import queryString from "query-string";

const ARRAY_FORMAT = "separator";
const ARRAY_FORMAT_SEPARATOR = "|";
const SKIP_NULL = true;
const SORT = false;

export const getQueryString = (params: any) =>
  typeof params === "string"
    ? params
    : queryString.stringify(params, {
        arrayFormat: ARRAY_FORMAT,
        arrayFormatSeparator: ARRAY_FORMAT_SEPARATOR,
        skipNull: SKIP_NULL,
        sort: SORT,
      });
