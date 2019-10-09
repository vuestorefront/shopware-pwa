import { SnippetSetEntity } from "./SnippetSetEntity";
export interface SnippetEntity {
    setId: string;
    translationKey: string;
    value: string;
    author: string;
    set: SnippetSetEntity | null;
    customFields: [] | null;
}
