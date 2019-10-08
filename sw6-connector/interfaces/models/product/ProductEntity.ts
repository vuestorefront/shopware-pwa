import { CategoryCollection } from ".,/category/CategoryCollection";
import { TagCollection } from "../Tag"
import { MediaEntity } from "../media/MediaEntity";
import { ShippingMethodCollection } from "../context/Context";
import { PaymentMethodCollection } from "../context/Context";
import { EntityCollection } from "../Entity";
import { OrderCollection, OrderEntity } from '../checkout/Order';
import { CategoryEntity } from '../category/CategoryEntity';
import { NewsletterRecipientCollection } from '../newsletter/Newsletter';

export interface ProductManufacturers {

}

export interface ProductMedia {
    productId: string;
    mediaId: string;
    position: number;
    media: MediaEntity;
    product: Product;
    customFields: []|null;
}

interface ProductMediaCollection {
    [index: number]: ProductMedia;
}

export interface ProductCollection {
    [index: number]: Product;
}

interface ProductManufacturerTranslationCollection {
    [index: number]: ProductManufacturerTranslationEntity;
}

interface ProductManufacturerTranslationEntity {     
    productManufacturerId: number;
    name: string|null;
    description: string|null;
    productManufacturer: ProductManufacturerEntity|null;
    customFields: []|null;
}

interface ProductPriceCollection {
    [index: number]: ProductPriceEntity;
}

interface RuleConditionEntity {
    type: string;
    ruleId: string;
    parentId: string|null;
    value: []|null;
    rule: RuleEntity|null;
    children: RuleConditionCollection|null;
    parent: RuleConditionEntity|null;
    position: number;
    customFields: [];

}

interface RuleConditionCollection {
    [index: number]: RuleConditionEntity;
}

interface CurrencyTranslationEntity {
    currencyId: string;
    shortName: string|null;
    name: string|null;
    currency: CurrencyEntity|null;
    customFields: []|null;
}

interface CurrencyTranslationCollection {
    [index: number]: CurrencyTranslationEntity;
}

interface SnippetSetEntity {
    name: string;
    baseFile: string;
    iso: string;
    snippets: SnippetCollection|null;
    salesChannelDomains: SalesChannelDomainCollection|null;
    customFields: []|null;
}

interface SnippetCollection {
    [index: number]: SnippetEntity;
}

interface SnippetEntity {
    setId: string;
    translationKey: string;
    value: string;
    author: string;
    set: SnippetSetEntity|null;
    customFields: []|null;
}

interface SnippetSetCollection {
    [index: number]: SnippetSetEntity;
}

interface SalesChannelDomainEntity {
    url: string;
    currencyId: string|null;
    currency: CurrencyEntity|null;
    snippetSetId: string|null;
    snippetSet: SnippetSetEntity|null;
    salesChannelId: string;
    salesChannel: SalesChannelEntity|null;
    languageId: string;
    language: LanguageEntity|null;
    customFields: []|null;
}

interface SalesChannelDomainCollection {
    [index: number]: SalesChannelDomainEntity;
}

interface PromotionSalesChannelEntity {
    promotionId: string;
    salesChannelId: string;
    priority: number;
    promotion: PromotionEntity|null;
    salesChannel: SalesChannelEntity|null;
}

interface PromotionSalesChannelCollection {
    [index: number]: PromotionSalesChannelEntity;
}

interface PromotionIndividualCodeEntity {
    promotionId: string;
    code: string;
    promotion: PromotionEntity|null;
    payload: []|null;
}

interface PromotionIndividualCodeCollection {
    [index: number]: PromotionIndividualCodeEntity;
}

interface RuleCollection {
    [index: number]: RuleCollection;
}

interface Rule {
    name: string;
}

interface RuleCollection {
    name: string;
    description: string|null;
    priority: number;
    payload: string|Rule|null;
    moduleTypes: []|null;
    productPrices: ProductPriceCollection|null;
    shippingMethods: ShippingMethodCollection|null;
    paymentMethods: PaymentMethodCollection|null;
    conditions: RuleConditionCollection|null;
    invalid: boolean;
    customFields: []|null;
    shippingMethodPrices: ShippingMethodPriceCollection|null;
    promotionDiscounts: PromotionDiscountCollection|null;
    promotionSetGroups: PromotionSetGroupCollection|null; 
    shippingMethodPriceCalculations: ShippingMethodPriceCollection|null;
    personaPromotions: PromotionCollection|null;
    orderPromotions: PromotionCollection|null;
    cartPromotions: PromotionCollection|null;
}

interface Customer {

}

interface CustomerCollection {
    [index: number]: Customer; 
}

interface PromotionTranslationEntity {
    promotionId: string;
    name: string|null;
}

interface PromotionTranslationCollection {
    [index: number]: PromotionTranslationEntity;
}

interface PromotionEntity {
    name: string|null;
    active: boolean;
    validFrom: Date;
    validUntil: Date;
    maxRedemptionsGlobal: number;
    maxRedemptionsPerCustomer: number;
    exclusive: boolean;
    useCodes: boolean;
    useSetGroups: boolean;
    customerRestriction: boolean;
    useIndividualCodes: boolean;
    individualCodePattern: string;
    salesChannels: PromotionSalesChannelCollection|null;
    code: string|null;
    discounts: PromotionDiscountCollection|null;
    individualCodes: PromotionIndividualCodeCollection|null;
    setgroups: PromotionSetGroupCollection|null;
    orderRules: RuleCollection|null;
    personaRules: RuleCollection|null;
    personaCustomers: CustomerCollection|null;
    cartRules: TaxRuleCollection; 
    translations: PromotionTranslationCollection|null;
    orderCount: number;
    ordersPerCustomerCount: []|null;
    exclusionIds: [];
}

interface PromotionDiscountEntity {
    promotionId: string;
    scope: string;
    type: string;
    value: number;
    promotion: PromotionEntity|null;
    discountRules: RuleCollection|null;
    considerAdvancedRules: boolean;
    maxValue: number|null;
    promotionDiscountPrices: number|null;    
}

interface PromotionDiscountPriceEntity {
    currencyId: string;
    discountId: string;
    price: number;
    promotionDiscount: PromotionDiscountEntity;
    currency: CurrencyEntity;
}

interface PromotionDiscountPriceCollection {
    [index: number]: PromotionDiscountPriceEntity;
}

interface CurrencyEntity {
    isoCode: string;
    factor: number;
    symbol: string;
    shortName: string|null;
    name: string|null;
    position: number;
    decimalPrecision: number;
    translations: CurrencyTranslationCollection|null;
    orders: OrderCollection|null;
    salesChannels: SalesChannelCollection|null;
    salesChannelDefaultAssignments: SalesChannelCollection|null;
    salesChannelDomains: SalesChannelDomainCollection|null;
    customFields: []|null;
    shippingMethodPrices: ShippingMethodPriceCollection|null;
    promotionDiscountPrices: PromotionDiscountPriceCollection;
    isSystemDefault: boolean|null;
}

interface LocaleTranslationEntity {
    localeId: string;
    name: string|null;
    territory: string|null;
    locale: LocaleEntity|null;
    customFields: []|null;
}

interface LocaleTranslationCollection {
    [index: number]: LocaleTranslationEntity;
}


interface LocaleEntity {
    code: string;
    name: string|null;
    territory: string|null;
    translations: LocaleTranslationCollection|null;
    users: UserCollection|null;
    languages: LanguageCollection|null;
    customFields: []|null;
}

interface LanguageEntity {
    parentId: string|null;
    localeId: string;
    translationCodeId: string|null;
    translationCode: LocaleEntity|null;
    name: string;
    locale: LocaleEntity|null;
    parent: LanguageEntity|null;
    children: LanguageCollection|null;
    salesChannels: SalesChannelCollection|null;
    customers: CustomerCollection|null;
    salesChannelDefaultAssignments: SalesChannelCollection|null;
    customFields: []|null;
    categoryTranslations: CategoryTranslationCollection|null;
    countryStateTranslations: CountryStateTranslationCollection|null;
    countryTranslations: CategoryTranslationCollection|null;
    currencyTranslations: CurrencyTranslationCollection|null;
    customerGroupTranslations: CustomerGroupTranslationCollection|null;
    localeTranslations: LocaleTranslationCollection|null;
    mediaTranslations: MediaTranslationCollection|null;
    paymentMethodTranslations: PaymentMethodTranslationCollection|null;
    productManufacturerTranslations: ProductManufacturerTranslationCollection|null;
    productTranslations: ProductTranslationCollection|null;
    shippingMethodTranslations: ShippingMethodTranslationCollection|null;
    unitTranslations: UnitTranslationCollection| null;
    propertyGroupTranslations: PropertyGroupTranslationCollection|null;
    propertyGroupOptionTranslations: PropertyGroupOptionTranslationCollection|null;
    salesChannelTranslations: SalesChannelTranslationCollection|null;
    salesChannelTypeTranslations: SalesChannelTypeTranslationCollection|null;
    salutationTranslations: SalutationTranslationCollection|null;
    salesChannelDomains: SalesChannelDomainCollection|null;
    pluginTranslations: PluginTranslationCollection|null;
    productStreamTranslations: ProductStreamTranslationCollection|null;
    stateMachineTranslations: Collection|null;
    stateMachineStateTranslations: Collection|null;
    cmsPageTranslation: Collection|null;
    cmsSlotTranslations: Collection|null;
    mailTemplateTranslations: MailTemplateCollection|null;
    mailHeaderFooterTranslation: MailHeaderFooterCollection|null;
    documentTypeTranslations: DocumentTypeTranslationCollection|null;
    deliveryTimeTranslations: DeliveryTimeCollection|null;
    newsletterRecipients: NewsletterRecipientCollection|null;
    orders: OrderCollection|null;
    numberRangeTypeTranslations: NumberRangeTypeTranslationCollection|null;
    productSearchKeywords: ProductSearchKeywordCollection|null;
    productKeywordDictionaries: ProductKeywordDictionaryCollection|null;
    mailTemplateTypeTranslations: MailTemplateTypeDefinition|null;
    promotionTranslations: PromotionTranslationsCollection|null;
    numberRangeTranslations: NumberRangeTranslationCollection|null;
    productReviews: ProductReviewCollection|null;


}

interface SalesChannelCollection {
    [index: number]: SalesChannelEntity;
}

interface LanguageCollection {
    [index: number]: LanguageEntity;
}

interface SalesChannelTypeTranslationEntity {
    salesChannelTypeId: string;
    name: string|null;
    manufacturer: string|null;
    description: string|null;
    descriptionLong: string|null;
    salesChannelType: SalesChannelTypeEntity|null;
    customFields: []|null;
}

interface SalesChannelTypeTranslationCollection {
    [index: number]: SalesChannelTypeTranslationEntity;
}

interface SalesChannelTypeEntity {
    name: string|null;
    manufacturer: string|null;
    description: string|null;
    descriptionLong: string|null;
    coverUrl: string|null;
    iconName: string|null;
    screenshotUrls: []|null;
    salesChannels: SalesChannelCollection|null;
    translations: SalesChannelTypeTranslationCollection|null;
    customFields: []|null;
}

interface PaymentMethodTranslationEntity {
    paymentMethodId: string;
    name: string|null;
    description: string|null;
    paymentMethod: PaymentMethodEntity|null;
    customFields: []|null;
}

interface PaymentMethodTranslationCollection {
    [index: number]: PaymentMethodTranslationEntity;
}

interface StateMachineTransitionEntity {
    actionName: string;
    stateMachineId: string;
    stateMachine: StateMachineStateEntity|null;
    fromStateId: string;
    fromStateMachineState: StateMachineStateEntity|null;
    toStateId: string;
    toStateMachineState: StateMachineStateEntity|null;
    customFields: []|null;
}

interface StateMachineTransitionCollection {
    [index: number]: StateMachineTransitionEntity;
}

interface StateMachineStateCollection {
    [index: number]: StateMachineStateEntity;
}


interface StateMachineTranslationCollection {
    [index: number]: StateMachineStateTranslationEntity;
}

interface StateMachineHistoryEntity {
    stateMachineId: string;
    stateMachine: StateMachineEntity|null;
    entityName: string;
    entityId: [];
    fromStateId: string;
    fromStateMachineState: StateMachineStateEntity|null;
    toStateId: string;
    toStateMachineState: StateMachineStateEntity|null;    
    userId: string;
    user: UserEntity|null;
}

interface StateMachineHistoryCollection {
    [index: number]: StateMachineHistoryEntity;
}

interface StateMachineEntity {
    technicalName: string;
    name: string;
    transitions: StateMachineTransitionCollection|null;
    states: StateMachineStateCollection|null;
    initialStateId: string|null;
    translations: StateMachineTranslationCollection;
    historiEntries: StateMachineHistoryCollection|null;
    customFields: []|null;    
}

interface StateMachineStateTranslationEntity {
    name: string|null;
    stateMachineStateId: string;
    stateMachineState: StateMachineStateEntity|null;
    customFields: []|null;    
}

interface StateMachineStateTranslationCollection {
    [index: number]: StateMachineStateTranslationEntity;
}

interface OrderDeliveryEntity {
    orderId: string;
    shippingOrderAddressId: string;
    shippingMethodId: string;
    trackingCode: string|null;
    shippingDateEarliest: Date;
    shippingDateLatest: Date;
    shippingCosts: CalculatedPrice;
    shippingOrderAddress: OrderAddressEntity|null;
    stateId: string;
    stateMachineState: StateMachineStateEntity|null;
    shippingMethod: ShippingMethodPriceEntity|null;
    order: OrderEntity|null;
    positions: OrderDeliveryPositionCollection|null;
}

interface OrderDeliveryCollection {
    [index: number]: OrderDeliveryEntity;
}

interface StateMachineStateEntity {
    name: string;
    technicalName: string;
    stateMachine: StateMachineEntity|null;
    fromStateMachineTransitions: StateMachineTransitionCollection|null;
    toStateMachineTransitions: StateMachineTransitionCollection|null;
    translations: StateMachineStateTranslationCollection;
    orders: OrderCollection|null;
    orderTransactions: OrderTransactionCollection|null;
    orderDeliveries: OrderDeliveryCollection|null;
    fromStateMachineHistoryEntries: StateMachineHistoryCollection|null;
    toStateMachineHistoryEntries: StateMachineHistoryCollection|null;
    customFields: []|null;
}

interface OrderTransactionEntity {
    orderId: string;
    paymentMethodId: string;
    amount: CalculatedPrice;
    paymentMethod: PaymentMethodEntity|null;
    order: OrderEntity|null;
    stateMachineState: StateMachineStateEntity|null;
    stateId: string;
    customFields: []|null;
}

interface OrderTransactionCollection {
    [index: number]: OrderTransactionEntity;
}

interface PluginTranslationEntity {
    pluginId: string;
    label: string|null;
    description: string|null;
    manufacturerLink: string|null;
    supportLink: string|null;
    changelog: []|null;
    plugin: PluginEntity|null;
    customFields: []|null;
}

interface PluginTranslationCollection {
    [index: number]: PluginTranslationEntity;
}

interface PluginEntity {
    baseClass: string;
    name: string;
    composerName: string|null;
    active: boolean;
    managedByComposer: boolean;
    path: string|null;
    author: string|null;
    copyright: string|null;
    license: string|null;
    version: string;
    upgradeVersion: string|null;
    installedAt: Date;
    upgradedAt: Date;
    iconRaw: string|null;
    icon: string|null;
    label: string;
    description: string|null;
    manufacturerLink: string|null;
    supportLink: string|null;
    changelog: []|null;
    translations: PluginTranslationCollection|null;
    paymentMethods: PaymentMethodCollection|null;
    customFields: []|null;
    autoload: [];
}

interface PaymentMethodEntity {
    pluginId: string|null;
    handlerIdentifier: string;
    name: string|null;
    description: string|null;
    position: number;
    active: boolean;
    plugin: PluginEntity|null;
    translations: PaymentMethodTranslationCollection|null;
    orderTransactions: OrderTransactionCollection|null;
    customers: CustomerCollection|null; 
    salesChannelDefaultAssignments: SalesChannelCollection|null;
    availabilityRule: RuleEntity|null; 
    availabilityRuleId: string;
    mediaId: string|null;
    media: MediaEntity|null;
    customFields: []|null;
    formattedHandlerIDentifier: string;
}

interface CountryCollection {
    [index: number]: CountryEntity;
}

interface CountryEntity {
    name: string|null;
    iso: string|null;
    position: number;
    taxFree: boolean;
    active: boolean;
    shippingAvailable: boolean;
    iso3: string|null;
    displayStateInRegistration: boolean;
    forceStateInRegistration: boolean;
    states: CountryStateCollection|null;
    translations: CountryTranslationCollection|null;
    orderAddresses: OrderAddressCollection|null;
    customerAddress: CustomerAddressCollection|null;
    salesChannelDefaultAssignments: SalesChannelCollection|null;
    salesChannels: SalesChannelCollection|null;
}

interface SalesChannelTranslationCollection {
    [index: number]: SalesChannelTranslationEntity;
}

interface SalesChannelTranslationEntity {
    salesChannelId: string;
    name: string|null;
    salesChannel: SalesChannelEntity|null;
    customFields: []|null;
}

interface SalesChannelEntity {
    typeId: string;
    languageId: string;
    currencyId: string;
    paymentMethodId: string;
    shippingMethodId: string;
    countryId: string;
    navigationCategoryId: string;
    footerCategoryId: string|null;
    serviceCategoryId: string|null;
    name: string|null;
    shortName: string|null;
    accessKey: string;
    currencies: CurrencyTranslationCollection|null;
    languages: LanguageCollection|null;
    configuration: []|null;
    active: boolean;
    type: SalesChannelTypeEntity|null;
    currency: CurrencyEntity|null;
    language: LanguageEntity|null;
    paymentMethod: PaymentMethodEntity|null;
    shippingMethod: ShippingMethodPriceEntity|null;
    country: CountryEntity|null;
    orders: OrderCollection|null;
    customers: CustomerCollection|null;
    countries: CountryCollection|null;
    paymentMethods: PaymentMethodCollection|null;
    shippingMethods: ShippingMethodCollection|null;
    translations: SalesChannelTranslationCollection|null;
    domains: SalesChannelDomainCollection|null;
    systemConfigs: SystemConfigCollection|null;
    customFields: []|null;
    naigationCategory: CategoryEntity|null;
    footerCategory: CategoryEntity|null;
    serviceCategory: CategoryEntity|null;
    productVisibilities: ProductVisibilityCollection|null;
    mailTemplates: MailTemplateSalesChanenlCollection|null;
    mailHeaderFooterId: string|null;
    numberRangeSalesChannels: NumberRangeSalesChannelCollection|null;
    mailHeaderFooter: MailHeaderFooterEntity|null;
    customerGroupId: string|null;
    customerGroup: CustomerGroupEntity|null;
    newsletterRecipients: NewsletterRecipientCollection|null;
    promotionSalesChannels: PromotionSalesChannelCollection|null;
    documentBaseConfigSalesChannels: DocumentBaseConfigDefinition|null;
    productReviews: ProductReviewColletion|null;
}

interface MailHeaderFooterEntity {
    name: string|null;
    systemDefault: boolean;
    description: string|null;
    headerHtml: string|null;
    headerPlain: string|null;
    footerHtml: string|null;
    footerPlain: string|null;
    salesChannels: SalesChannelCollection|null;
    translations: MailHeaderFooterTranslationCollection|null;
}

interface MailHeaderFooterTranslationCollection {
    [index: number]: MailHeaderFooterTranslationEntity;
}

interface MailHeaderFooterTranslationEntity {
    name: string|null;
    description: string|null;
    headerHtml: string|null;
    headerPlain: string|null;
    footerHtml: string|null;
    footerPlain: string|null;
    mailHeaderFooter: MailHeaderFooterEntity|null;
    mailHeaderFooterId: string;    
}

interface ProductVisibilityCollection {
    [index: number]: ProductVisibilityEntity;
}

interface ProductVisibilityEntity {
    visibility: number;
    productId: string;
    salesChannelId: string;
    product: Product|null;
    salesChannel: SalesChannelEntity|null 
}

interface SystemConfigCollection {
    [index: number]: SystemConfigEntity;
}

interface SystemConfigEntity {
    configurationKey: string;
    configurationValue: any;
    salesChannelId: string|null;
    salesChannel: SalesChannelEntity|null;
}

interface ProductReviewColletion {
    [index: number]: ProductReviewEntity;
}

interface ProductReviewEntity {
    productId: string;
    customerId: string;
    salesChannelId: string;
    languageId: string;
    externalUser: string|null;
    externalEmail: string|null;
    points: number|null;
    status: boolean;
    comment: string|null;
    salesChannel: SalesChannelEntity|null;
    language: LanguageEntity|null;
    customer: CustomerEntity|null;
    product: Product|null;
    content: string|null;
    title: string|null;
}

interface ShippingMethodPriceEntity {
    shippingMethodId: string;
    currencyId: string;
    calculation: number|null;
    quantityStart: number|null;
    quantityEnd: number|null;
    price: number;
    shippingMethod: ShippingMethodPriceEntity|null;
    customFields: []|null;
    rule: RuleEntity|null;
    currency: CurrencyEntity|null;
    calculationRuleId: string|null;
}

interface ShippingMethodPriceCollection {
    [index: number]: ShippingMethodPriceEntity;    
}

interface PromotionDiscountCollection {

}

interface PromotionSetGroupCollection {

}

interface PromotionCollection {

}

interface RuleEntity {
    name: string;
    description: string|null;
    payload: string|RuleEntity|null;
    moduleTypes: []|null;
    productPrices: ProductPriceCollection;
    shippingMethods: ShippingMethodCollection;
    paymentMethods: PaymentMethodCollection;
    conditions: RuleConditionCollection;
    invalid: boolean;
    customFields: []|null;
    shippingMethodPrices: ShippingMethodPriceCollection|null;
    promotionDiscounts: PromotionDiscountCollection|null;
    promotionSetGroups: PromotionSetGroupCollection|null;
    ShippingMethodPriceCalculations: ShippingMethodPriceCollection|null;
    personaPromotions: PromotionCollection|null;
    orderPromotions: PromotionCollection|null; 
    cartPromotions: PromotionCollection|null; 
}

interface Price {
    currencyId: number;
    net: number;
    gross: number,
    linked: boolean;
}

interface ProductPriceEntity {
    productId: number;
    quantityStart: number;
    quantityEnd: number|null;
    product: Product|null;
    rule: RuleEntity|null;
    customFields: []|null;
}

interface ListingPriceCollection {
    [index: number]: ListingPrice;
}

interface ListingPrice {
    currencyId: number;
    ruleId: string;
    from: Price;
    to: Price;
}

interface PriceCollection {
    [index: number]: Price;
}

interface CalculatedTax {
    tax: number;
    taxRate: number;
    price: number;
}

interface CalculatedTaxCollection {
    [index: number]: CalculatedTax;
}

interface ReferencePrice {
    price: number;
}

interface CalculatedPrice {
    unitPrice: number;
    quantity: number;
    totalPrice: number;
    calculatedTaxes: CalculatedTaxCollection;
    taxRules: TaxRuleCollection;
    referencePRice: ReferencePrice;
}

interface TaxEntity {
    taxRate: number;
    name: string;
    products: ProductCollection;
    customFields: []|null;
}

interface TaxRule {
    taxRate: number;
    percentage: number;
}

interface TaxRuleCollection {
    [index: number]: TaxRule;
}

interface PropertyGroupOptionTranslationEntity {
    propertyGroupOptionId: string;
    name: string|null;
    position: number|null;
    propertyGroupOption: PropertyGroupOptionEntity|null; 
    customFields: []|null;
}

interface PropertyGroupOptionTranslationCollection {
    [index: number]: PropertyGroupOptionTranslationEntity;
}

interface ProductConfiguratorSettingEntity {
    productId: number;
    optionId: number;
    mediaId: number,
    position: number;
    price: []|null;
    option: PropertyGroupOptionEntity|null;
    media: MediaEntity|null;
    selected: boolean;
    product: Product|null;
    customFields: []|null;
}

interface ProductConfiguratorSettingCollection {
    [index: number]: ProductConfiguratorSettingEntity;
} 

interface PropertyGroupOptionEntity {
    groupId: string;
    name: string|null;
    position: number;
    colorHexCode: string|null;
    mediaId: string|null;
    group: PropertyGroupEntity|null;
    translations: PropertyGroupOptionTranslationCollection|null;
    productConfiguratorSettings: ProductConfiguratorSettingCollection|null;
    productProperties: ProductCollection|null;
    productOptions: ProductCollection|null;
    media: MediaEntity|null;
    customFields: []|null;
}

interface PropertyGroupEntity {
    name: string|null;
    displayType: string;
    sortingType: string;
    description: string|null;
    options: PropertyGroupOptionCollection|null;
    translations: PropertyGroupOptionTranslationCollection|null;
    customFields: []|null;

}

interface PropertyGroupCollection {
    [index: number]: PropertyGroupEntity;
}

interface DeliveryDate {
    readonly earliest: Date;
    readonly latest: Date;
}

interface DeliveryTimeEntity {
    name: string|null;
    min: number;
    max: number;
    unit: string;
    shippingMethods: ShippingMethodCollection|null;
    translations: EntityCollection;
    customFields: []|null;
}

interface ProductManufacturerEntity {
    mediaId: string|null;
    name: string|null;
    link: string|null;
    description: string|null;
    translations: ProductManufacturerTranslationCollection|null;
    products: ProductCollection;
    customFields: []|null;
}

interface UnitTranslationEntity {
    unitId: string;
    shortCode: string|null;
    name: string|null;
    unit: UnitEntity|null;
    customFields: []|null;    
}

interface UnitTranslationCollection {
    [index: number]: UnitTranslationEntity;
}

interface UnitEntity {
    shortCode: string|null;
    name: string|null;
    translations: UnitTranslationCollection|null;
    customFields: []|null;    
}

interface ProductTranslationEntity {
    productId: string;
    additionalText: string|null;
    name: string|null;
    keywords: string|null;
    description: string|null;
    metaTitle: string|null;
    packUnit: string|null;
    product: Product;
    customFields: []|null;   
}

interface ProductTranslationCollection {
    [index: number]: ProductTranslationEntity;
}

interface PropertyGroupOptionCollection {
    [index: number]: PropertyGroupOptionEntity;
}

interface ProductReviewEntity {
    productId: string;
    customerId: string;
    salesChannelId: string;
    languageId: string;
    externalUser: string|null;
    externalEmail: string|null;
    points: number|null;
    status: boolean;
    comment: string|null;   
}

interface ProductReviewCollection {
    [index: number]: ProductReviewEntity;
}

export interface Product {
    calculatedListingPrice: ListingPriceCollection;
    calculatedPrices: PriceCollection;
    calculatedPrice: CalculatedPrice;
    sortedProperties: PropertyGroupCollection | null;
    isNew: boolean;
    parentId: string|null;
    childCount: number;
    autoIncrement: number;
    taxId: string|null;
    manufacturerId: string|null;
    unitId: string|null;
    active: boolean;
    displayGroup: string;
    price: PriceCollection|null;
    manufacturerNumber: string|null;
    ean: string|null;
    productNumber: string;
    stock: number;
    availableStock: number|null;
    available: boolean;
    deliveryTimeId: string|null; 
    deliveryTime: DeliveryTimeEntity;
    restockTime: number;
    isCloseout: boolean|null;
    purchaseSteps: number|null;
    maxPurchase: number|null;
    minPurchase: number|null;
    purchaseUnit: number|null;
    referenceUnit: number|null;
    shippingFree: boolean|null;
    purchasePrice: number|null;
    markAsTopseller: boolean|null;
    weight: number|null;
    width: number|null; 
    height: number|null; 
    length: number|null; 
    releaseDate: Date; 
    categoryTree: []|null; 
    optionsIds: []|null;
    propertyIds: []|null;
    additionalText: string|null;
    name: string|null;
    keywords: string|null;
    description: string|null;
    metaTitle: string|null;
    packUnit: string|null;
    tax: TaxEntity;
    manufacturer: ProductManufacturerEntity|null;
    unit: UnitEntity|null;
    prices: ProductPriceCollection;
    listingPrices: ListingPriceCollection | null; 
    cover: ProductMedia;
    parent: Product;
    children: ProductCollection;
    media: ProductMediaCollection;
    translations: ProductTranslationCollection;
    categories: CategoryCollection;
    tags: TagCollection;
    properties: PropertyGroupOptionCollection|null;
    options: PropertyGroupOptionCollection|null;
    categoriesRo: CategoryCollection|null;
    coverId: string|null;
    customFields: []|null;
    tagIds: []|null; 
    productReviews: ProductReviewCollection|null; 
    ratingAverage: number|null;
    extensions: [];
    id: string;
    parentVersionId: string;
    productManufacturerVersionId: string;
    productMediaVersiond: null  
}