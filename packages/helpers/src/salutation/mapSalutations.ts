import { Salutation } from "@shopware-pwa/shopware-6-client/src/interfaces/models/system/salutation/Salutation";

export interface MappedSalutation {
  name: string | null;
  id: string;
}

/**
 * Map available salutations to (`name`: string, `id`: string) format
 *
 * @returns MappedSalutations
 * @alpha
 **/
export function mapSalutations(salutations: Salutation[]): MappedSalutation[] {
  if (!salutations?.length) return [];
  const mappedSalutations: MappedSalutation[] = salutations.map(
    (salutation: Salutation) => ({
      name: salutation.displayName ?? salutation.salutationKey,
      id: salutation.id
    })
  );
  return mappedSalutations.filter(
    (mappedSalutation: MappedSalutation) => mappedSalutation.name !== null
  );
}
