export interface IEntity {
    _uniqueIdentifier: string;
    versionId: string;
    translated: [];
    createdAt: Date | null;
    updatedAt: Date | null;
}

export interface IEntityCollection {
    [index: number]: IEntity;
}