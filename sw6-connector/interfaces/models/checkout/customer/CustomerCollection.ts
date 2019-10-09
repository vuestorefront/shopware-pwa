import { Customer } from './Customer';

export default interface CustomerCollection {
    [index: number]: Customer;
}
