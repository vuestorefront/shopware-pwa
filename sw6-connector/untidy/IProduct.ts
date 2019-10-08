import { ICategoryCollection } from "./ICategoryCollection";
import { ITagCollection } from "./ITag"
import { IMediaEntity } from "./IMediaEntity";
import { IShippingMethodCollection, IPaymentMethodCollection } from "./IContext";
import { IEntityCollection } from "./IEntity";
import { IOrderCollection, IOrderEntity } from './IOrder';
import { ICategoryEntity } from './ICategoryEntity';
import { INewsletterRecipientCollection } from './INewsletter';

export interface IProductMedia {
    productId: string;
    mediaId: string;
    position: number;
    media: IMediaEntity;
    product: IProduct;
    customFields: []|null;
}

interface IProductMediaCollection {
    [index: number]: IProductMedia;
}

export interface IProductCollection {
    [index: number]: IProduct;
}

interface IProductManufacturerTranslationCollection {
    [index: number]: IProductManufacturerTranslationEntity;
}

interface IProductManufacturerTranslationEntity {     
    productManufacturerId: number;
    name: string|null;
    description: string|null;
    productManufacturer: IProductManufacturerEntity|null;
    customFields: []|null;
}

interface IProductPriceCollection {
    [index: number]: IProductPriceEntity;
}

interface IRuleConditionEntity {
    type: string;
    ruleId: string;
    parentId: string|null;
    value: []|null;
    rule: IRuleEntity|null;
    children: IRuleConditionCollection|null;
    parent: IRuleConditionEntity|null;
    position: number;
    customFields: [];

}

interface IRuleConditionCollection {
    [index: number]: IRuleConditionEntity;
}

interface ICurrencyTranslationEntity {
    currencyId: string;
    shortName: string|null;
    name: string|null;
    currency: ICurrencyEntity|null;
    customFields: []|null;
}

interface ICurrencyTranslationCollection {
    [index: number]: ICurrencyTranslationEntity;
}

interface ISnippetSetEntity {
    name: string;
    baseFile: string;
    iso: string;
    snippets: ISnippetCollection|null;
    salesChannelDomains: ISalesChannelDomainCollection|null;
    customFields: []|null;
}

interface ISnippetCollection {
    [index: number]: ISnippetEntity;
}

interface ISnippetEntity {
    setId: string;
    translationKey: string;
    value: string;
    author: string;
    set: ISnippetSetEntity|null;
    customFields: []|null;
}

interface ISnippetSetCollection {
    [index: number]: ISnippetSetEntity;
}

interface ISalesChannelDomainEntity {
    url: string;
    currencyId: string|null;
    currency: ICurrencyEntity|null;
    snippetSetId: string|null;
    snippetSet: ISnippetSetEntity|null;
    salesChannelId: string;
    salesChannel: ISalesChannelEntity|null;
    languageId: string;
    language: ILanguageEntity|null;
    customFields: []|null;
}

interface ISalesChannelDomainCollection {
    [index: number]: ISalesChannelDomainEntity;
}

interface IPromotionSalesChannelEntity {
    promotionId: string;
    salesChannelId: string;
    priority: number;
    promotion: IPromotionEntity|null;
    salesChannel: ISalesChannelEntity|null;
}

interface IPromotionSalesChannelCollection {
    [index: number]: IPromotionSalesChannelEntity;
}

interface IPromotionIndividualCodeEntity {
    promotionId: string;
    code: string;
    promotion: IPromotionEntity|null;
    payload: []|null;
}

interface IPromotionIndividualCodeCollection {
    [index: number]: IPromotionIndividualCodeEntity;
}

interface IRuleCollection {
    [index: number]: IRuleCollection;
}

interface IRule {
    name: string;
}

interface IRuleCollection {
    name: string;
    description: string|null;
    priority: number;
    payload: string|IRule|null;
    moduleTypes: []|null;
    productPrices: IProductPriceCollection|null;
    shippingMethods: IShippingMethodCollection|null;
    paymentMethods: IPaymentMethodCollection|null;
    conditions: IRuleConditionCollection|null;
    invalid: boolean;
    customFields: []|null;
    shippingMethodPrices: IShippingMethodPriceCollection|null;
    promotionDiscounts: IPromotionDiscountCollection|null;
    promotionSetGroups: IPromotionSetGroupCollection|null; 
    shippingMethodPriceCalculations: IShippingMethodPriceCollection|null;
    personaPromotions: IPromotionCollection|null;
    orderPromotions: IPromotionCollection|null;
    cartPromotions: IPromotionCollection|null;
}

interface ICustomer {

}

interface ICustomerCollection {
    [index: number]: ICustomer; 
}

interface IPromotionTranslationEntity {
    promotionId: string;
    name: string|null;
}

interface IPromotionTranslationCollection {
    [index: number]: IPromotionTranslationEntity;
}

interface IPromotionEntity {
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
    salesChannels: IPromotionSalesChannelCollection|null;
    code: string|null;
    discounts: IPromotionDiscountCollection|null;
    individualCodes: IPromotionIndividualCodeCollection|null;
    setgroups: IPromotionSetGroupCollection|null;
    orderRules: IRuleCollection|null;
    personaRules: IRuleCollection|null;
    personaCustomers: ICustomerCollection|null;
    cartRules: ITaxRuleCollection; 
    translations: IPromotionTranslationCollection|null;
    orderCount: number;
    ordersPerCustomerCount: []|null;
    exclusionIds: [];
}

interface IPromotionDiscountEntity {
    promotionId: string;
    scope: string;
    type: string;
    value: number;
    promotion: IPromotionEntity|null;
    discountRules: IRuleCollection|null;
    considerAdvancedRules: boolean;
    maxValue: number|null;
    promotionDiscountPrices: number|null;    
}

interface IPromotionDiscountPriceEntity {
    currencyId: string;
    discountId: string;
    price: number;
    promotionDiscount: IPromotionDiscountEntity;
    currency: ICurrencyEntity;
}

interface IPromotionDiscountPriceCollection {
    [index: number]: IPromotionDiscountPriceEntity;
}

interface ICurrencyEntity {
    isoCode: string;
    factor: number;
    symbol: string;
    shortName: string|null;
    name: string|null;
    position: number;
    decimalPrecision: number;
    translations: ICurrencyTranslationCollection|null;
    orders: IOrderCollection|null;
    salesChannels: ISalesChannelCollection|null;
    salesChannelDefaultAssignments: ISalesChannelCollection|null;
    salesChannelDomains: ISalesChannelDomainCollection|null;
    customFields: []|null;
    shippingMethodPrices: IShippingMethodPriceCollection|null;
    promotionDiscountPrices: IPromotionDiscountPriceCollection;
    isSystemDefault: boolean|null;
}

interface ILocaleTranslationEntity {
    localeId: string;
    name: string|null;
    territory: string|null;
    locale: ILocaleEntity|null;
    customFields: []|null;
}

interface ILocaleTranslationCollection {
    [index: number]: ILocaleTranslationEntity;
}


interface ILocaleEntity {
    code: string;
    name: string|null;
    territory: string|null;
    translations: ILocaleTranslationCollection|null;
    users: IUserCollection|null;
    languages: ILanguageCollection|null;
    customFields: []|null;
}

interface ILanguageEntity {
    parentId: string|null;
    localeId: string;
    translationCodeId: string|null;
    translationCode: ILocaleEntity|null;
    name: string;
    locale: ILocaleEntity|null;
    parent: ILanguageEntity|null;
    children: ILanguageCollection|null;
    salesChannels: ISalesChannelCollection|null;
    customers: ICustomerCollection|null;
    salesChannelDefaultAssignments: ISalesChannelCollection|null;
    customFields: []|null;
    categoryTranslations: ICategoryTranslationCollection|null;
    countryStateTranslations: ICountryStateTranslationCollection|null;
    countryTranslations: ICategoryTranslationCollection|null;
    currencyTranslations: ICurrencyTranslationCollection|null;
    customerGroupTranslations: ICustomerGroupTranslationCollection|null;
    localeTranslations: ILocaleTranslationCollection|null;
    mediaTranslations: IMediaTranslationCollection|null;
    paymentMethodTranslations: IPaymentMethodTranslationCollection|null;
    productManufacturerTranslations: IProductManufacturerTranslationCollection|null;
    productTranslations: IProductTranslationCollection|null;
    shippingMethodTranslations: IShippingMethodTranslationCollection|null;
    unitTranslations: IUnitTranslationCollection| null;
    propertyGroupTranslations: IPropertyGroupTranslationCollection|null;
    propertyGroupOptionTranslations: IPropertyGroupOptionTranslationCollection|null;
    salesChannelTranslations: ISalesChannelTranslationCollection|null;
    salesChannelTypeTranslations: ISalesChannelTypeTranslationCollection|null;
    salutationTranslations: ISalutationTranslationCollection|null;
    salesChannelDomains: SalesChannelDomainCollection|null;
    pluginTranslations: IPluginTranslationCollection|null;
    productStreamTranslations: IProductStreamTranslationCollection|null;
    stateMachineTranslations: ICollection|null;
    stateMachineStateTranslations: ICollection|null;
    cmsPageTranslation: ICollection|null;
    cmsSlotTranslations: ICollection|null;
    mailTemplateTranslations: IMailTemplateCollection|null;
    mailHeaderFooterTranslation: IMailHeaderFooterCollection|null;
    documentTypeTranslations: IDocumentTypeTranslationCollection|null;
    deliveryTimeTranslations: IDeliveryTimeCollection|null;
    newsletterRecipients: INewsletterRecipientCollection|null;
    orders: IOrderCollection|null;
    numberRangeTypeTranslations: INumberRangeTypeTranslationCollection|null;
    productSearchKeywords: IProductSearchKeywordCollection|null;
    productKeywordDictionaries: IProductKeywordDictionaryCollection|null;
    mailTemplateTypeTranslations: IMailTemplateTypeDefinition|null;
    promotionTranslations: IPromotionTranslationsCollection|null;
    numberRangeTranslations: INumberRangeTranslationCollection|null;
    productReviews: IProductReviewCollection|null;


}

interface ISalesChannelCollection {
    [index: number]: ISalesChannelEntity;
}

interface ILanguageCollection {
    [index: number]: ILanguageEntity;
}

interface ISalesChannelTypeTranslationEntity {
    salesChannelTypeId: string;
    name: string|null;
    manufacturer: string|null;
    description: string|null;
    descriptionLong: string|null;
    salesChannelType: ISalesChannelTypeEntity|null;
    customFields: []|null;
}

interface ISalesChannelTypeTranslationCollection {
    [index: number]: ISalesChannelTypeTranslationEntity;
}

interface ISalesChannelTypeEntity {
    name: string|null;
    manufacturer: string|null;
    description: string|null;
    descriptionLong: string|null;
    coverUrl: string|null;
    iconName: string|null;
    screenshotUrls: []|null;
    salesChannels: ISalesChannelCollection|null;
    translations: ISalesChannelTypeTranslationCollection|null;
    customFields: []|null;
}

interface IPaymentMethodTranslationEntity {
    paymentMethodId: string;
    name: string|null;
    description: string|null;
    paymentMethod: IPaymentMethodEntity|null;
    customFields: []|null;
}

interface IPaymentMethodTranslationCollection {
    [index: number]: IPaymentMethodTranslationEntity;
}

interface IStateMachineTransitionEntity {
    actionName: string;
    stateMachineId: string;
    stateMachine: IStateMachineStateEntity|null;
    fromStateId: string;
    fromStateMachineState: IStateMachineStateEntity|null;
    toStateId: string;
    toStateMachineState: IStateMachineStateEntity|null;
    customFields: []|null;
}

interface IStateMachineTransitionCollection {
    [index: number]: IStateMachineTransitionEntity;
}

interface IStateMachineStateCollection {
    [index: number]: IStateMachineStateEntity;
}


interface IStateMachineTranslationCollection {
    [index: number]: IStateMachineStateTranslationEntity;
}

interface IStateMachineHistoryEntity {
    stateMachineId: string;
    stateMachine: IStateMachineEntity|null;
    entityName: string;
    entityId: [];
    fromStateId: string;
    fromStateMachineState: IStateMachineStateEntity|null;
    toStateId: string;
    toStateMachineState: IStateMachineStateEntity|null;    
    userId: string;
    user: IUserEntity|null;
}

interface IStateMachineHistoryCollection {
    [index: number]: IStateMachineHistoryEntity;
}

interface IStateMachineEntity {
    technicalName: string;
    name: string;
    transitions: IStateMachineTransitionCollection|null;
    states: IStateMachineStateCollection|null;
    initialStateId: string|null;
    translations: IStateMachineTranslationCollection;
    historiEntries: IStateMachineHistoryCollection|null;
    customFields: []|null;    
}

interface IStateMachineStateTranslationEntity {
    name: string|null;
    stateMachineStateId: string;
    stateMachineState: IStateMachineStateEntity|null;
    customFields: []|null;    
}

interface IStateMachineStateTranslationCollection {
    [index: number]: IStateMachineStateTranslationEntity;
}

interface IOrderDeliveryEntity {
    orderId: string;
    shippingOrderAddressId: string;
    shippingMethodId: string;
    trackingCode: string|null;
    shippingDateEarliest: Date;
    shippingDateLatest: Date;
    shippingCosts: ICalculatedPrice;
    shippingOrderAddress: IOrderAddressEntity|null;
    stateId: string;
    stateMachineState: IStateMachineStateEntity|null;
    shippingMethod: IShippingMethodPriceEntity|null;
    order: IOrderEntity|null;
    positions: IOrderDeliveryPositionCollection|null;
}

interface IOrderDeliveryCollection {
    [index: number]: IOrderDeliveryEntity;
}

interface IStateMachineStateEntity {
    name: string;
    technicalName: string;
    stateMachine: IStateMachineEntity|null;
    fromStateMachineTransitions: IStateMachineTransitionCollection|null;
    toStateMachineTransitions: IStateMachineTransitionCollection|null;
    translations: IStateMachineStateTranslationCollection;
    orders: IOrderCollection|null;
    orderTransactions: IOrderTransactionCollection|null;
    orderDeliveries: IOrderDeliveryCollection|null;
    fromStateMachineHistoryEntries: IStateMachineHistoryCollection|null;
    toStateMachineHistoryEntries: IStateMachineHistoryCollection|null;
    customFields: []|null;
}

interface IOrderTransactionEntity {
    orderId: string;
    paymentMethodId: string;
    amount: ICalculatedPrice;
    paymentMethod: IPaymentMethodEntity|null;
    order: IOrderEntity|null;
    stateMachineState: IStateMachineStateEntity|null;
    stateId: string;
    customFields: []|null;
}

interface IOrderTransactionCollection {
    [index: number]: IOrderTransactionEntity;
}

interface IPluginTranslationEntity {
    pluginId: string;
    label: string|null;
    description: string|null;
    manufacturerLink: string|null;
    supportLink: string|null;
    changelog: []|null;
    plugin: IPluginEntity|null;
    customFields: []|null;
}

interface IPluginTranslationCollection {
    [index: number]: IPluginTranslationEntity;
}

interface IPluginEntity {
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
    translations: IPluginTranslationCollection|null;
    paymentMethods: IPaymentMethodCollection|null;
    customFields: []|null;
    autoload: [];
}

interface IPaymentMethodEntity {
    pluginId: string|null;
    handlerIdentifier: string;
    name: string|null;
    description: string|null;
    position: number;
    active: boolean;
    plugin: IPluginEntity|null;
    translations: IPaymentMethodTranslationCollection|null;
    orderTransactions: IOrderTransactionCollection|null;
    customers: ICustomerCollection|null; 
    salesChannelDefaultAssignments: ISalesChannelCollection|null;
    availabilityRule: IRuleEntity|null; 
    availabilityRuleId: string;
    mediaId: string|null;
    media: IMediaEntity|null;
    customFields: []|null;
    formattedHandlerIDentifier: string;
}

interface ICountryCollection {
    [index: number]: ICountryEntity;
}

interface ICountryEntity {
    name: string|null;
    iso: string|null;
    position: number;
    taxFree: boolean;
    active: boolean;
    shippingAvailable: boolean;
    iso3: string|null;
    displayStateInRegistration: boolean;
    forceStateInRegistration: boolean;
    states: ICountryStateCollection|null;
    translations: ICountryTranslationCollection|null;
    orderAddresses: IOrderAddressCollection|null;
    customerAddress: ICustomerAddressCollection|null;
    salesChannelDefaultAssignments: ISalesChannelCollection|null;
    salesChannels: ISalesChannelCollection|null;
}

interface ISalesChannelTranslationCollection {
    [index: number]: ISalesChannelTranslationEntity;
}

interface ISalesChannelTranslationEntity {
    salesChannelId: string;
    name: string|null;
    salesChannel: ISalesChannelEntity|null;
    customFields: []|null;
}

interface ISalesChannelEntity {
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
    currencies: ICurrencyTranslationCollection|null;
    languages: ILanguageCollection|null;
    configuration: []|null;
    active: boolean;
    type: ISalesChannelTypeEntity|null;
    currency: ICurrencyEntity|null;
    language: ILanguageEntity|null;
    paymentMethod: IPaymentMethodEntity|null;
    shippingMethod: IShippingMethodPriceEntity|null;
    country: ICountryEntity|null;
    orders: IOrderCollection|null;
    customers: ICustomerCollection|null;
    countries: ICountryCollection|null;
    paymentMethods: IPaymentMethodCollection|null;
    shippingMethods: IShippingMethodCollection|null;
    translations: ISalesChannelTranslationCollection|null;
    domains: ISalesChannelDomainCollection|null;
    systemConfigs: ISystemConfigCollection|null;
    customFields: []|null;
    naigationCategory: ICategoryEntity|null;
    footerCategory: ICategoryEntity|null;
    serviceCategory: ICategoryEntity|null;
    productVisibilities: IProductVisibilityCollection|null;
    mailTemplates: IMailTemplateSalesChanenlCollection|null;
    mailHeaderFooterId: string|null;
    numberRangeSalesChannels: INumberRangeSalesChannelCollection|null;
    mailHeaderFooter: IMailHeaderFooterEntity|null;
    customerGroupId: string|null;
    customerGroup: ICustomerGroupEntity|null;
    newsletterRecipients: INewsletterRecipientCollection|null;
    promotionSalesChannels: IPromotionSalesChannelCollection|null;
    documentBaseConfigSalesChannels: IDocumentBaseConfigDefinition|null;
    productReviews: IProductReviewColletion|null;
}

interface IMailHeaderFooterEntity {
    name: string|null;
    systemDefault: boolean;
    description: string|null;
    headerHtml: string|null;
    headerPlain: string|null;
    footerHtml: string|null;
    footerPlain: string|null;
    salesChannels: ISalesChannelCollection|null;
    translations: IMailHeaderFooterTranslationCollection|null;
}

interface IMailHeaderFooterTranslationCollection {
    [index: number]: IMailHeaderFooterTranslationEntity;
}

interface IMailHeaderFooterTranslationEntity {
    name: string|null;
    description: string|null;
    headerHtml: string|null;
    headerPlain: string|null;
    footerHtml: string|null;
    footerPlain: string|null;
    mailHeaderFooter: IMailHeaderFooterEntity|null;
    mailHeaderFooterId: string;    
}

interface IProductVisibilityCollection {
    [index: number]: IProductVisibilityEntity;
}

interface IProductVisibilityEntity {
    visibility: number;
    productId: string;
    salesChannelId: string;
    product: IProduct|null;
    salesChannel: ISalesChannelEntity|null 
}

interface ISystemConfigCollection {
    [index: number]: ISystemConfigEntity;
}

interface ISystemConfigEntity {
    configurationKey: string;
    configurationValue: any;
    salesChannelId: string|null;
    salesChannel: ISalesChannelEntity|null;
}

interface IProductReviewColletion {
    [index: number]: IProductReviewEntity;
}

interface IProductReviewEntity {
    productId: string;
    customerId: string;
    salesChannelId: string;
    languageId: string;
    externalUser: string|null;
    externalEmail: string|null;
    points: number|null;
    status: boolean;
    comment: string|null;
    salesChannel: ISalesChannelEntity|null;
    language: ILanguageEntity|null;
    customer: ICustomerEntity|null;
    product: IProduct|null;
    content: string|null;
    title: string|null;
}

interface IShippingMethodPriceEntity {
    shippingMethodId: string;
    currencyId: string;
    calculation: number|null;
    quantityStart: number|null;
    quantityEnd: number|null;
    price: number;
    shippingMethod: IShippingMethodPriceEntity|null;
    customFields: []|null;
    rule: IRuleEntity|null;
    currency: ICurrencyEntity|null;
    calculationRuleId: string|null;
}

interface IShippingMethodPriceCollection {
    [index: number]: IShippingMethodPriceEntity;    
}

interface IPromotionDiscountCollection {

}

interface IPromotionSetGroupCollection {

}

interface IPromotionCollection {

}

interface IRuleEntity {
    name: string;
    description: string|null;
    payload: string|IRuleEntity|null;
    moduleTypes: []|null;
    productPrices: IProductPriceCollection;
    shippingMethods: IShippingMethodCollection;
    paymentMethods: IPaymentMethodCollection;
    conditions: IRuleConditionCollection;
    invalid: boolean;
    customFields: []|null;
    shippingMethodPrices: IShippingMethodPriceCollection|null;
    promotionDiscounts: IPromotionDiscountCollection|null;
    promotionSetGroups: IPromotionSetGroupCollection|null;
    ShippingMethodPriceCalculations: IShippingMethodPriceCollection|null;
    personaPromotions: IPromotionCollection|null;
    orderPromotions: IPromotionCollection|null; 
    cartPromotions: IPromotionCollection|null; 
}

interface IPrice {
    currencyId: number;
    net: number;
    gross: number,
    linked: boolean;
}

interface IProductPriceEntity {
    productId: number;
    quantityStart: number;
    quantityEnd: number|null;
    product: IProduct|null;
    rule: IRuleEntity|null;
    customFields: []|null;
}

interface IListingPriceCollection {
    [index: number]: IListingPrice;
}

interface IListingPrice {
    currencyId: number;
    ruleId: string;
    from: IPrice;
    to: IPrice;
}

interface IPriceCollection {
    [index: number]: IPrice;
}

interface ICalculatedTax {
    tax: number;
    taxRate: number;
    price: number;
}

interface ICalculatedTaxCollection {
    [index: number]: ICalculatedTax;
}

interface IReferencePrice {
    price: number;
}

interface ICalculatedPrice {
    unitPrice: number;
    quantity: number;
    totalPrice: number;
    calculatedTaxes: ICalculatedTaxCollection;
    taxRules: ITaxRuleCollection;
    referencePRice: IReferencePrice;
}

interface ITaxEntity {
    taxRate: number;
    name: string;
    products: IProductCollection;
    customFields: []|null;
}

interface ITaxRule {
    taxRate: number;
    percentage: number;
}

interface ITaxRuleCollection {
    [index: number]: ITaxRule;
}

interface IPropertyGroupOptionTranslationEntity {
    propertyGroupOptionId: string;
    name: string|null;
    position: number|null;
    propertyGroupOption: IPropertyGroupOptionEntity|null; 
    customFields: []|null;
}

interface IPropertyGroupOptionTranslationCollection {
    [index: number]: IPropertyGroupOptionTranslationEntity;
}

interface IProductConfiguratorSettingEntity {
    productId: number;
    optionId: number;
    mediaId: number,
    position: number;
    price: []|null;
    option: IPropertyGroupOptionEntity|null;
    media: IMediaEntity|null;
    selected: boolean;
    product: IProduct|null;
    customFields: []|null;
}

interface IProductConfiguratorSettingCollection {
    [index: number]: IProductConfiguratorSettingEntity;
} 

interface IPropertyGroupOptionEntity {
    groupId: string;
    name: string|null;
    position: number;
    colorHexCode: string|null;
    mediaId: string|null;
    group: IPropertyGroupEntity|null;
    translations: IPropertyGroupOptionTranslationCollection|null;
    productConfiguratorSettings: IProductConfiguratorSettingCollection|null;
    productProperties: IProductCollection|null;
    productOptions: IProductCollection|null;
    media: IMediaEntity|null;
    customFields: []|null;
}

interface IPropertyGroupEntity {
    name: string|null;
    displayType: string;
    sortingType: string;
    description: string|null;
    options: IPropertyGroupOptionCollection|null;
    translations: IPropertyGroupOptionTranslationCollection|null;
    customFields: []|null;

}

interface IPropertyGroupCollection {
    [index: number]: IPropertyGroupEntity;
}

interface IDeliveryDate {
    readonly earliest: Date;
    readonly latest: Date;
}

interface IDeliveryTimeEntity {
    name: string|null;
    min: number;
    max: number;
    unit: string;
    shippingMethods: IShippingMethodCollection|null;
    translations: IEntityCollection;
    customFields: []|null;
}

interface IProductManufacturerEntity {
    mediaId: string|null;
    name: string|null;
    link: string|null;
    description: string|null;
    translations: IProductManufacturerTranslationCollection|null;
    products: IProductCollection;
    customFields: []|null;
}

interface IUnitTranslationEntity {
    unitId: string;
    shortCode: string|null;
    name: string|null;
    unit: IUnitEntity|null;
    customFields: []|null;    
}

interface IUnitTranslationCollection {
    [index: number]: IUnitTranslationEntity;
}

interface IUnitEntity {
    shortCode: string|null;
    name: string|null;
    translations: IUnitTranslationCollection|null;
    customFields: []|null;    
}

interface IProductTranslationEntity {
    productId: string;
    additionalText: string|null;
    name: string|null;
    keywords: string|null;
    description: string|null;
    metaTitle: string|null;
    packUnit: string|null;
    product: IProduct;
    customFields: []|null;   
}

interface IProductTranslationCollection {
    [index: number]: IProductTranslationEntity;
}

interface IPropertyGroupOptionCollection {
    [index: number]: IPropertyGroupOptionEntity;
}

interface IProductReviewEntity {
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

interface IProductReviewCollection {
    [index: number]: IProductReviewEntity;
}

export interface IProduct {
    calculatedListingPrice: IListingPriceCollection;
    calculatedPrices: IPriceCollection;
    calculatedPrice: ICalculatedPrice;
    sortedProperties: IPropertyGroupCollection | null;
    isNew: boolean;
    parentId: string|null;
    childCount: number;
    autoIncrement: number;
    taxId: string|null;
    manufacturerId: string|null;
    unitId: string|null;
    active: boolean;
    displayGroup: string;
    price: IPriceCollection|null;
    manufacturerNumber: string|null;
    ean: string|null;
    productNumber: string;
    stock: number;
    availableStock: number|null;
    available: boolean;
    deliveryTimeId: string|null; 
    deliveryTime: IDeliveryTimeEntity;
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
    tax: ITaxEntity;
    manufacturer: IProductManufacturerEntity|null;
    unit: IUnitEntity|null;
    prices: IProductPriceCollection;
    listingPrices: IListingPriceCollection | null; 
    cover: IProductMedia;
    parent: IProduct;
    children: IProductCollection;
    media: IProductMediaCollection;
    translations: IProductTranslationCollection;
    categories: ICategoryCollection;
    tags: ITagCollection;
    properties: IPropertyGroupOptionCollection|null;
    options: IPropertyGroupOptionCollection|null;
    categoriesRo: ICategoryCollection|null;
    coverId: string|null;
    customFields: []|null;
    tagIds: []|null; 
    productReviews: IProductReviewCollection|null; 
    ratingAverage: number|null;
    extensions: [];
    id: string;
    parentVersionId: string;
    productManufacturerVersionId: string;
    productMediaVersiond: null  
}