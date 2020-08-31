import { UiCategoryFilter, UiCategoryFilterType } from "../ui-interfaces";

/**
 * @alpha
 */
export interface CategoryFilterRangeValues {
  max: string;
  min: string;
}

/**
 * @alpha
 */
export interface CategoryFilterEntityValues {
  [valueId: string]: CategoryFilterEntityValue;
}

/**
 * @alpha
 */
export interface CategoryFilterEntityValue {
  name: string;
  description: string | null;
  customFields: any;
  colorHexCode: null | string;
}

/**
 * @alpha
 */
export interface CategoryFilterTermValue {
  key: string;
  count: number;
  extensions: any;
}

/**
 * @alpha
 */
export interface Filter {
  /**
   * @alpha
   */
  [filterCode: string]: {
    type: UiCategoryFilterType;
    name: string;
    values:
      | CategoryFilterRangeValues
      | CategoryFilterEntityValues
      | CategoryFilterTermValue[];
  };
}

const convertTermFilterValues = (values: CategoryFilterTermValue[]) => {
  return values.map(({ key, count }: { key: string; count: number }) => ({
    value: key,
    label: key,
    count: count,
  }));
};

const convertEntityFilterValues = (
  values: CategoryFilterEntityValues
  //isColor: boolean
) => {
  return !values
    ? []
    : Object.entries(values).map(([valueId, { name, colorHexCode }]) => {
        let filterValue = {
          value: valueId,
          label: name,
        };

        if (colorHexCode) {
          filterValue = Object.assign({}, filterValue, { color: colorHexCode });
        }

        return filterValue;
      });
};

const convertOptionsByType = ({
  type,
  values,
}: {
  type: string;
  values: any;
}) => {
  switch (type) {
    case UiCategoryFilterType.term:
      return convertTermFilterValues(values);
    case UiCategoryFilterType.entity:
      return convertEntityFilterValues(values);
    default:
      return values;
  }
};

/**
 * @alpha
 */
export function getCategoryAvailableFilters({
  filters,
}: { filters?: Filter } = {}): UiCategoryFilter[] {
  if (!filters) {
    return [];
  }
  const filtersTransformed = Object.entries(filters).map(
    ([filterCode, { name, values, type }]) => {
      return {
        name: name || filterCode,
        type: type,
        options: convertOptionsByType({
          type,
          values,
        }),
      };
    }
  );

  return filtersTransformed;
}
