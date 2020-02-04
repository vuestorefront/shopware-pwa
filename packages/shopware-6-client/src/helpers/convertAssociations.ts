import {
  Association,
  ShopwareAssociation
} from "@shopware-pwa/shopware-6-client/src/interfaces/search/Association";

export function convertAssociations(
  associations: Association[] = []
): ShopwareAssociation | undefined {
  if (!Array.isArray(associations) || !associations.length) return;
  let shopwareAssociations: ShopwareAssociation = {};
  associations.forEach(association => {
    shopwareAssociations[association.name] = association.associations
      ? {
          associations: convertAssociations(association.associations)
        }
      : {};
  });
  return shopwareAssociations;
}
