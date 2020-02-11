import { Salutation } from "@shopware-pwa/shopware-6-client/src/interfaces/models/system/salutation/Salutation";

export function mapSalutations(salutations: Salutation[] | null): { name: string, id: string }[] {
  const salutationList = salutations ?? [];
  return salutationList.map((salutation: Salutation) => ({ 
    name: salutation.displayName ?? salutation.salutationKey,
    id: salutation.id
  }));
}