import { PluginTranslationCollection } from "./PluginTranslationCollection";
import { PaymentMethodCollection } from "../../checkout/payment/PaymentMethodCollection";
export interface Plugin {
    baseClass: string;
    name: string;
    composerName: string | null;
    active: boolean;
    managedByComposer: boolean;
    path: string | null;
    author: string | null;
    copyright: string | null;
    license: string | null;
    version: string;
    upgradeVersion: string | null;
    installedAt: Date;
    upgradedAt: Date;
    iconRaw: string | null;
    icon: string | null;
    label: string;
    description: string | null;
    manufacturerLink: string | null;
    supportLink: string | null;
    changelog: [] | null;
    translations: PluginTranslationCollection | null;
    paymentMethods: PaymentMethodCollection | null;
    customFields: [] | null;
    autoload: [];
}
