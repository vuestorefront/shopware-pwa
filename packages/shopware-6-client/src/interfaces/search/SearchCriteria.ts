import { Pagination } from "./Pagination";
import { SearchFilter } from "./SearchFilter";
import { Association } from "./Association";
import { Aggregation } from "./Aggregation";
import { TotalCountMode } from "./TotalCountMode";

interface Sort {
  field: string;
  desc?: boolean;
}
export interface SearchCriteria {
  filters?: SearchFilter[];
  pagination?: Pagination;
  sort?: Sort;
  term?: string;
  configuration?: {
    associations?: Association[];
    aggregations?: Aggregation[];
    totalCountMode?: TotalCountMode;
  };
}
