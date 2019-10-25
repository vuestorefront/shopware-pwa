import { Category } from "../../packages/shopware-6-client/src/interfaces/models/content/category/Category";

/**
 *  extended current category with two fields
 */

export interface CategoryForHeadless extends Category {
  availableSorting: [Sort];
  availableFiltering: [Filter];
}

interface Sort {
  name: string; // field name to sort by
  label: string; // translated label
}

enum FilterType {
  option = "option", // it's default and only one for properties - internally in SW
  range = "range" // additional, does not exist in SW, but could be only marked as the range for price
  // ...
}

interface FilterProperty {
  id: string; // property id
  label: string; // property label
}

interface Filter {
  groupId: string; // id of the group the attribute belongs to
  code: string; // literal code (user friendly insted of using groupId)
  label: string; // translated label, the name of the Field name you can filter by
  // translated : {} or just follow the SW translation standard and use to translated object inside the filter
  type: FilterType;
  properties?: [FilterProperty]; // optional, if type == 'option'
}
