import { Language } from "../../framework/language/Language";
export interface ProductKeywordDictionary {
    id: string;
    languageId: string;
    keyword: string;
    reserved: string;
    language: Language | null;
}
