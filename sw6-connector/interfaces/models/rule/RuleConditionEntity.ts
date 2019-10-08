import { RuleEntity } from "./RuleEntity";
import { RuleConditionCollection } from "./RuleConditionCollection";
export interface RuleConditionEntity {
    type: string;
    ruleId: string;
    parentId: string | null;
    value: [] | null;
    rule: RuleEntity | null;
    children: RuleConditionCollection | null;
    parent: RuleConditionEntity | null;
    position: number;
    customFields: [];
}
