import { UiCategorySorting } from "../ui-interfaces";

/**
 * @alpha
 */
export interface Sorting {
  [sortingCode: string]: {
    key: string;
    active: boolean;
  };
}

/**
 * @alpha
 */
export function getCategoryAvailableSorting({
  sorting,
}: { sorting?: Sorting } = {}): UiCategorySorting[] {
  if (!sorting) {
    return [];
  }

  const sortingTransformed = Object.entries(sorting).map(
    ([sortingCode, { active }]) => ({
      name: sortingCode,
      active: active,
      field: sortingCode.split("-")[0],
      order: sortingCode.split("-")[1],
    })
  );

  return sortingTransformed;
}
