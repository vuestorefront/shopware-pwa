import { OrderCollection } from "../checkout/OrderCollection";
import { NewsletterRecipientCollection } from "../newsletter/NewsletterRecipientCollection";
import { ProductTranslationCollection } from "../product/ProductTranslationCollection";
import { PropertyGroupOptionTranslationCollection } from "../property/PropertyGroupOptionTranslationCollection";
import { SalesChannelDomainCollection } from "../state-machine/SalesChannelDomainCollection";
import { CurrencyTranslationCollection } from "./CurrencyTranslationCollection";
import { ProductManufacturerTranslationCollection } from "../product/ProductManufacturerTranslationCollection";
import { LocaleTranslationCollection } from "./LocaleTranslationCollection";
import { SalesChannelTypeTranslationCollection } from "../sales-channel/SalesChannelTypeTranslationCollection";
import { PaymentMethodTranslationCollection } from "../checkout/PaymentMethodTranslationCollection";
import { SalesChannelTranslationCollection } from "../sales-channel/SalesChannelTranslationCollection";
import { SalesChannelCollection } from "../sales-channel/SalesChannelCollection";
import CustomerCollection from "../customer/CustomerCollection";
import { ProductReviewCollection } from "../product/ProductReviewCollection";
import { UnitTranslationCollection } from "../unit/UnitTranslationCollection";
import { PluginTranslationCollection } from "../plugin/PluginTranslationCollection";
import { LanguageCollection } from "./LanguageCollection";
import { LocaleEntity } from "./LocaleEntity";
import { CategoryTranslationCollection } from "../category/CategoryTranslationCollection";
import { MediaTranslationCollection } from "../media/MediaTranslationCollection";
import { iCustomField } from "../Common";
import { CountryEntity } from "../customer/CountryEntity";
import { OrderAddressEntity } from "../checkout/OrderAddressEntity";
import { CustomerAddressCollection } from "../customer/CustomerAddressCollection";
import { Collection } from "../collection";
import { SalesChannelEntity } from "../sales-channel/SalesChannelEntity";
import { ShippingMethodPriceEntity } from "../price/ShippingMethodPriceEntity";
import { DeliveryTimeEntity } from "../checkout/DeliveryTimeEntity";
import { OrderDeliveryCollection } from "../checkout/OrderDeliveryCollection";
import { RuleEntity } from "../rule/RuleEntity";
import { ShippingMethodPriceCollection } from "../price/ShippingMethodPriceCollection";
import { MediaEntity } from "../media/MediaEntity";
import { TagCollection } from "../Tag";
import { MailTemplateMediaCollection } from "../media/MailTemplateMediaCollection";
import { MailHeaderFooterCollection } from "../mail/MailHeaderFooterCollection"
import { DeliveryTimeCollection } from "../checkout/DeliveryTimeCollection";
import { ProductEntity } from "../product/ProductEntity";
import { Tracing } from "trace_events";
import { PromotionTranslationCollection } from "../discount/PromotionTranslationCollection";


export interface LanguageEntity {
    parentId: string | null;
    localeId: string;
    translationCodeId: string | null;
    translationCode: LocaleEntity | null;
    name: string;
    locale: LocaleEntity | null;
    parent: LanguageEntity | null;
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

interface ProductSearchKeywordCollection {
    [index: number]: ProductSearchKeyword;
}

interface ProductSearchKeyword {
    languageId: string;
    productId: string;
    keyword: string;
    ranking: number;
    product: ProductEntity|null;
    language: LanguageEntity|null;
}

interface DocumentTypeTranslationCollection { 
    [index: number]: DocumentTypeTranslation;
}

interface ProductKeywordDictionaryCollection {
    [index: number]: ProductKeywordDictionary;
}

interface ProductKeywordDictionary {
    id: string;
    languageId: string;
    keyword: string;
    reserved: string;
    language: LanguageEntity|null;
}

interface DocumentTypeTranslation { 
    documentTypeId: string;
    documentType: DocumentType|null;
    name: string|null;
    customFields: iCustomField;
}

interface ProductStreamTranslationCollection {
    [index: number]: ProductStreamTranslation;
}

interface ProductStreamTranslation {
    productStreamId: string;
    name: string|null;
    description: string|null;
    productStream: ProductStream|null;
    customFields: iCustomField;    
}

interface ProductStream {
    name: string;
    description: string|null;
    apiFilter: []|null;
    filters: ProductStreamFilterCollection|null;
    invalid: boolean;
    translations: ProductStreamTranslationCollection|null;
    customFields: iCustomField|null;
}

interface ProductStreamFilter {
    type: string;
    field: string|null;
    operator: string|null;
    value: string|null;
    productStreamId: string;
    parentId: string|null;
    productStream: ProductStream|null;
    queries: ProductStreamFilterCollection|null; 
    parent: ProductStreamFilter|null;
    position: number;
    parameters: []|null;
    customFields: []|null;
}

interface ProductStreamFilterCollection {
    [index: number]: ProductStreamFilter;
}

interface MailTemplateCollection {
    [index: number]: MailTemplate;
}

interface MailTemplate {
    mailTemplateTypeId: string|null;
    mailTemplateType: MailTemplateType|null;
    systemDefault: boolean; 
    senderName: string|null;
    description: string|null;
    subject: string|null;
    contentHtml: string|null;
    contentPlain: string|null;
    salesChannels: MailTemplateSalesChannelCollection|null;  
    translations: MailTemplateTranslationCollection|null;  
    media: MailTemplateMediaCollection|null;
}

interface MailTemplateTranslation {
    mailTemplateId: string;
    senderName: string|null;
    description: string|null;
    subject: string|null;
    contentHtml: string|null;
    contentPlain: string|null;
    mailTemplate: MailTemplate|null;
}

interface MailTemplateTranslationCollection {
    [index: number]: MailTemplateTranslation;
}

interface MailTemplateType {
    name: string;
    technicalName: string;
    availableEntities: []|null;
    translations: MailTemplateTypeTranslationCollection|null;
    mailTemplates: MailTemplateTypeCollection|null;
    customFields: iCustomField|null;
    salesChannels: MailTemplateSalesChannelCollection|null;
    createdAt: Date;
    updatedAt: Date;
}

interface MailTemplateTypeTranslationCollection {
    [index: number]: MailTemplateTypeTranslation;
}

interface MailTemplateTypeTranslation {
    mailTemplateTypeId: string;
    mailTemplateType: MailTemplateType|null;
    name: string|null;
}

interface MailTemplateSalesChannelCollection {
    [index: number]: MailTemplateSalesChannel;
}

interface MailTemplateSalesChannel {
    mailTemplateId: string;
    salesChannelId: string|null;
    mailTemplateTypeId: string;
    mailTemplateType: MailTemplateType|null;
    mailTemplate: MailTemplateSalesChannel|null;
    salesChannel: SalesChannelEntity|null;
}

interface MailTemplateTypeCollection {
    [index: number]: MailTemplateType;
}

interface SalutationTranslationCollection {
    [index: number]: SalutationTranslation;
}

interface ShippingMethodEntity {
    name: string|null;
    active: boolean;
    description: string|null;
    deliveryTimeId: string;
    deliveryTime: DeliveryTimeEntity|null;
    translations: ShippingMethodTranslationCollection|null;
    orderDeliveries: OrderDeliveryCollection|null;
    salesChannelDefaultAssignments: SalesChannelCollection|null;
    salesChannels: SalesChannelCollection|null;
    customFields: iCustomField|null;
    availabilityRule: RuleEntity|null;
    availabilityRuleId: string;
    prices: ShippingMethodPriceCollection;
    mediaId: string|null;
    media: MediaEntity|null;
    tags: TagCollection|null;
}

interface SalutationTranslation {
    shippingMethodId: string;
    name: string|null;
    description: string|null;
    shippingMethod: ShippingMethodEntity|null;
}

interface PropertyGroupTranslationCollection {
    [index: number]: PropertyGroupTranslation;
}

interface PropertyGroupTranslation {
    shippingMethodId: string;
    name: string|null;
    description: string|null;
    shippingMethod: ShippingMethodEntity|null;
    customFields: iCustomField|null;
}

interface ShippingMethodTranslationCollection {
    [index: number]: ShippingMethodTranslation;
}

interface ShippingMethodTranslation {
    shippingMethodId: string;
    name: string|null;
    description: string|null;
    shippingMethod: ShippingMethodEntity|null;
    customFields: iCustomField|null;   
}

interface CustomerGroupTranslationCollection {
    [index: number]: CustomerGroupTranslation;
}

interface CustomerGroupTranslation {
    customerGroupId: string;
    name: string|null;
    customerGroup: CustomerGroup|null;
    customFields: iCustomField|null;

}

interface CountryStateTranslationCollection {
    [index: number]: CountryStateTranslation;
}

interface CountryStateTranslation {
    countryStateId: string;
    name: string|null;
    countryState: CountryState|null;
    customFields: iCustomField;
}

interface CountryState {
    countryId: string;
    shortCode: string;
    name: string|null;
    position: number;
    active: boolean;
    country: CountryEntity|null;
    translations: CountryStateTranslationCollection|null;
    customerAddresses: CustomerAddressCollection|null;
    orderAddressCollection: OrderAddressEntity|null;
    customFields: iCustomField;
}

interface NumberRangeTranslation {
    numberRangeId: string;
    name: string|null;
    description: string|null;
    numberRange: NumberRange|null;
    customFields: iCustomField|null;
}

interface NumberRangeTranslationCollection {
    [index: number]: NumberRangeTranslation;
}

interface NumberRange {
    typeId: string|null;
    global: boolean;
    name: string|null;
    description: string|null;
    pattern: string|null;
    start: number|null;
    type: NumberRangeType|null;
    numberRangeSalesChannels: NumberRangeSalesChannelCollection|null;
    state: NumberRangeState|null; 
    customFields: iCustomField|null; 
    translations: NumberRangeTranslationCollection|null;
}

interface NumberRangeCollection {
    [index: number]: NumberRange;
}

interface NumberRangeType {
    typeName: string;
    technicalName: string;
    global: boolean;
    numberRanges: NumberRangeCollection|null;
    numberRangeSalesChannels: NumberRangeSalesChannel|null;
    customFields: iCustomField|null;
    translations: NumberRangeTypeTranslationCollection|null;
}

interface NumberRangeTypeTranslation {
    numberRangeTypeId: string;
    typeName: string|null;
    numberRangeType: NumberRangeType|null;
    customFields: iCustomField|null;
}

interface NumberRangeTypeTranslationCollection {
    [index: number]: NumberRangeType;
}

interface NumberRangeState {
    numberRangeId: string;
    lastValue: number;
    numberRange: NumberRange|null;
}

interface NumberRangeSalesChannel {
    numberRangeId: string;
    salesChannelId: string;
    numberRange: NumberRange|null;
    salesChannel: SalesChannelEntity|null;
    numberRangeType: NumberRangeType|null;
}

interface NumberRangeSalesChannelCollection {
    [index: number]: NumberRangeSalesChannel;
}