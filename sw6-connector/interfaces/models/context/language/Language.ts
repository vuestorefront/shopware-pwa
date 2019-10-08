import { Locale } from "../locale/Locale";

import { LanguageCollection } from "./LanguageCollection";

import { SalesChannelCollection } from "../../sales-channel/SalesChannelCollection";

import CustomerCollection from "../../customer/CustomerCollection";

import { CategoryTranslationCollection } from "../../category/CategoryTranslationCollection";

import { CountryStateTranslationCollection } from "../../customer/CountryStateTranslationCollection";

import { CurrencyTranslationCollection } from "../currency/CurrencyTranslationCollection";

import { CustomerGroupTranslationCollection } from "../../customer/CustomerGroupTranslationCollection";

import { LocaleTranslationCollection } from "../locale/LocaleTranslationCollection";

import { MediaTranslationCollection } from "../../media/MediaTranslationCollection";

import { PaymentMethodTranslationCollection } from "../../checkout/PaymentMethodTranslationCollection";

import { ProductManufacturerTranslationCollection } from "../../product/ProductManufacturerTranslationCollection";

import { ProductTranslationCollection } from "../../product/ProductTranslationCollection";

import { ShippingMethodTranslationCollection } from "../../shipping/ShippingMethodTranslationCollection";

import { UnitTranslationCollection } from "../../unit/UnitTranslationCollection";

import { PropertyGroupTranslationCollection } from "../../property/PropertyGroupTranslationCollection";

import { PropertyGroupOptionTranslationCollection } from "../../property/PropertyGroupOptionTranslationCollection";

import { SalesChannelTranslationCollection } from "../../sales-channel/SalesChannelTranslationCollection";

import { SalesChannelTypeTranslationCollection } from "../../sales-channel/SalesChannelTypeTranslationCollection";

import { SalutationTranslationCollection } from "../salutation/SalutationTranslationCollection";

import { SalesChannelDomainCollection } from "../../state-machine/SalesChannelDomainCollection";

import { PluginTranslationCollection } from "../../plugin/PluginTranslationCollection";

import { ProductStreamTranslationCollection } from "../../product/ProductStreamTranslationCollection";

import { Collection } from "../../collection";

import { MailTemplateCollection } from "../../mail/MailTemplateCollection";

import { MailHeaderFooterCollection } from "../../mail/MailHeaderFooterCollection";

import { DocumentTypeTranslationCollection } from "../document-type/DocumentTypeTranslationCollection";

import { DeliveryTimeCollection } from "../../checkout/DeliveryTimeCollection";

import { NewsletterRecipientCollection } from "../../newsletter/NewsletterRecipientCollection";

import { OrderCollection } from "../../checkout/OrderCollection";

import { NumberRangeTypeTranslationCollection } from "../../number-range/NumberRangeTypeTranslationCollection";

import { ProductSearchKeywordCollection } from "../../product/ProductSearchKeywordCollection";

import { ProductKeywordDictionaryCollection } from "../../product/ProductKeywordDictionaryCollection";

import { MailTemplateTypeTranslationCollection } from "../../mail/MailTemplateTypeTranslationCollection";

import { PromotionTranslationCollection } from "../../discount/PromotionTranslationCollection";

import { NumberRangeTranslationCollection } from "../../number-range/NumberRangeTranslationCollection";

import { ProductReviewCollection } from "../../product/ProductReviewCollection";

export interface Language {
    parentId: string | null;
    localeId: string;
    translationCodeId: string | null;
    translationCode: Locale | null;
    name: string;
    locale: Locale | null;
    parent: Language | null;
    children: LanguageCollection | null;
    salesChannels: SalesChannelCollection | null;
    customers: CustomerCollection | null;
    salesChannelDefaultAssignments: SalesChannelCollection | null;
    customFields: [] | null;
    categoryTranslations: CategoryTranslationCollection | null;
    countryStateTranslations: CountryStateTranslationCollection | null;
    countryTranslations: CategoryTranslationCollection | null;
    currencyTranslations: CurrencyTranslationCollection | null;
    customerGroupTranslations: CustomerGroupTranslationCollection | null;
    localeTranslations: LocaleTranslationCollection | null;
    mediaTranslations: MediaTranslationCollection | null;
    paymentMethodTranslations: PaymentMethodTranslationCollection | null;
    productManufacturerTranslations: ProductManufacturerTranslationCollection | null;
    productTranslations: ProductTranslationCollection | null;
    shippingMethodTranslations: ShippingMethodTranslationCollection | null;
    unitTranslations: UnitTranslationCollection | null;
    propertyGroupTranslations: PropertyGroupTranslationCollection | null;
    propertyGroupOptionTranslations: PropertyGroupOptionTranslationCollection | null;
    salesChannelTranslations: SalesChannelTranslationCollection | null;
    salesChannelTypeTranslations: SalesChannelTypeTranslationCollection | null;
    salutationTranslations: SalutationTranslationCollection | null;
    salesChannelDomains: SalesChannelDomainCollection | null;
    pluginTranslations: PluginTranslationCollection | null;
    productStreamTranslations: ProductStreamTranslationCollection | null;
    stateMachineTranslations: Collection | null;
    stateMachineStateTranslations: Collection | null;
    cmsPageTranslation: Collection | null;
    cmsSlotTranslations: Collection | null;
    mailTemplateTranslations: MailTemplateCollection | null;
    mailHeaderFooterTranslation: MailHeaderFooterCollection | null;
    documentTypeTranslations: DocumentTypeTranslationCollection | null;
    deliveryTimeTranslations: DeliveryTimeCollection | null;
    newsletterRecipients: NewsletterRecipientCollection | null;
    orders: OrderCollection | null;
    numberRangeTypeTranslations: NumberRangeTypeTranslationCollection | null;
    productSearchKeywords: ProductSearchKeywordCollection | null;
    productKeywordDictionaries: ProductKeywordDictionaryCollection | null;
    mailTemplateTypeTranslations: MailTemplateTypeTranslationCollection | null;
    promotionTranslations: PromotionTranslationCollection | null;
    numberRangeTranslations: NumberRangeTranslationCollection | null;
    productReviews: ProductReviewCollection | null;
}

