import { Plugin } from "./Plugin";
export interface PluginTranslation {
    pluginId: string;
    label: string | null;
    description: string | null;
    manufacturerLink: string | null;
    supportLink: string | null;
    changelog: [] | null;
    plugin: Plugin | null;
    customFields: [] | null;
}
