import { PaymentMethodEntity } from "./PaymentMethodEntity";
export interface PaymentMethodTranslationEntity {
    paymentMethodId: string;
    name: string | null;
    description: string | null;
    paymentMethod: PaymentMethodEntity | null;
    customFields: [] | null;
}
