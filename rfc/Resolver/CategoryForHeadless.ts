import { CmsPage } from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/cms/CmsPage";

export interface CategoryForHeadless {
  availableSorting: Sort; // sample below within avaiableSortingResponseExample
  availableFiltering: Array<OptionFilter | RangeFilter | BooleanFilter>; // sample below within avaiableFiltersResponseExample
  cmsPage: CmsPage | null;
}

// <SORTING>
interface Sort {
  value: string; // field name to sort by
  label: string; // translated label
  default: string;
  properties: SortProperty[];
}

interface SortProperty {
  label: string;
  value: string;
}

// Example of sorting response
//
// /category/Sports (default)
// /category/Sports?sort=-price
const avaiableSortingResponseExample = {
  label: "Sort by",
  default: "-price",
  properties: [
    {
      label: "Price asc",
      value: "price"
    },
    {
      label: "Price desc",
      value: "-price"
    },
    {
      label: "Name asc",
      value: "name"
    },
    {
      label: "Name desc",
      value: "-name"
    }
  ]
};
// </SORTING>

// <FILTERING>

// BASE TYPES
enum FilterType {
  option = "option", // it's default and only one for properties - internally in SW
  range = "range", // additional, does not exist in SW, but could be only marked as the range for price
  boolean = "boolean"
  // ...
}

interface BaseFilter {
  code: string; // literal code (user friendly insted of using groupId) 43434343434343223 -> color
  label: string; // translated label, the name of the Field name you can filter by
  type: FilterType;
}

// SPECIFIC TYPES

// 1. Type == option
interface OptionFilter extends BaseFilter {
  properties: [OptionFilterProperty];
}

interface OptionFilterProperty {
  id: string; // property id
  label: string; // property label,
  value: string;
  foundInCollection: number;
}

// 2. Type == range
interface RangeFilter extends BaseFilter {}

// 2. Type == boolean
interface BooleanFilter extends BaseFilter {
  foundInCollection: number;
}

// Example of all types of filter in one response
const avaiableFiltersResponseExample = [
  {
    code: "color",
    label: "Color",
    type: "option", // single-select, multi-select?
    properties: [
      // only if type == option
      {
        // specific ids/labels should be sorted in a way, that storefront should display them
        id: "43231c2e5de1434a8bda2ddd0cd3239c",
        label: "Dark", // is it possible to get counts of products for each filter?
        value: "#ccc",
        foundInCollection: 22
      },
      {
        id: "c8c382b1e90748d2bb5719f456dc2cb9",
        label: "white",
        value: "#fff",
        foundInCollection: 0
      },
      {
        id: "a8c382b1e90748d2bb5719f456dc2cb3",
        label: "Light blue sea",
        value: "#ff0",
        foundInCollection: 19
      }
    ]
  },
  {
    // /category/Sports?sort=-name&min-price=200&max-price=250
    code: "price",
    label: "Price",
    type: "range"
  },
  {
    // /category/Sports?sort=-name&filters[isNew]=1
    code: "isNew",
    label: "New",
    type: "boolean",
    foundInCollection: 22
  }
];

// </FILTERING>
