import { iCustomer } from './Customer';

export default interface CustomerCollection {
    [index: number]: iCustomer;
}
