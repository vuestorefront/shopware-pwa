import { PaymentMethod } from "./PaymentMethod";
export interface PaymentMethodTranslation {
    paymentMethodId: string;
    name: string | null;
    description: string | null;
    paymentMethod: PaymentMethod | null;
    customFields: [] | null;
}
