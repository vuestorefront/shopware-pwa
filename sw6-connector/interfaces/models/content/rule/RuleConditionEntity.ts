import { Rule } from "./Rule";
import { RuleConditionCollection } from "./RuleConditionCollection";
export interface RuleConditionEntity {
    type: string;
    ruleId: string;
    parentId: string | null;
    value: [] | null;
    rule: Rule | null;
    children: RuleConditionCollection | null;
    parent: RuleConditionEntity | null;
    position: number;
    customFields: [];
}
