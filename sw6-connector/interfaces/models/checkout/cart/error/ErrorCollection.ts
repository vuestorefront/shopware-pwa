import { Collection } from "../../../framework/struct/Collection";
import { Error } from "./Error";
export interface ErrorCollection extends Collection {
    [index: number]: Error;
}
