import { ListingFilter } from "./getListingFilters";

/**
 * It creates new selected filters object based on the filter existence
 *
 * @public
 */
export function toggleSearchFilter(currentFilters: any, filter: ListingFilter) {
  let resultFilterValue = undefined;
  if (["range", "max"].includes(filter.type || "")) {
    if (filter.value) resultFilterValue = filter.value;
  } else {
    let filterCopy = currentFilters[filter.code] || [];
    if (!Array.isArray(filterCopy)) filterCopy = [filterCopy];
    const index = filterCopy.findIndex(
      (element: unknown) => element === filter.value
    );
    if (index < 0) {
      filterCopy.push(filter.value);
    } else {
      filterCopy.splice(index, 1);
    }
    if (filterCopy.length) resultFilterValue = filterCopy;
  }
  return Object.assign(
    {},
    {
      ...currentFilters,
      [filter.code]: resultFilterValue,
    }
  );
}
