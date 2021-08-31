import { PluginTranslation } from "./PluginTranslation";
import { PaymentMethod } from "../../checkout/payment/PaymentMethod";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
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
  translations: PluginTranslation[] | null;
  paymentMethods: PaymentMethod[] | null;
  customFields: CustomField[];
  autoload: [];
}
