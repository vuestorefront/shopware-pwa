import { Pagination } from "./Pagination";
import { SearchFilter } from "./SearchFilter";
import { Association } from "./Association";
import { Aggregation } from "./Aggregation";
import { TotalCountMode } from "./TotalCountMode";

export interface SearchCriteria {
  filters?: SearchFilter[];
  pagination?: Pagination;
  // sort?: Sort[];
  // term?: Term;
  configuration?: {
    association?: Association[];
    aggregation?: Aggregation[];
    totalCountMode?: TotalCountMode;
  };
}

// examples
// {{shopware-domain}}/sales-channel-api/v1/category?associations[products][]&associations[tags][]&sort=level&sort=-name&limit=10&page=1&filter[name]=Shoes
