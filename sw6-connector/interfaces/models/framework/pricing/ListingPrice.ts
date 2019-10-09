import { Price } from "./Price";
export interface ListingPrice {
    currencyId: number;
    ruleId: string;
    from: Price;
    to: Price;
}
