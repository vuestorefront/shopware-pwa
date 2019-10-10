import { Rule } from "./Rule";
import { RuleCondition } from "./RuleCondition";
import { CustomField } from "../../common/CustomField";
export interface RuleCondition {
  type: string;
  ruleId: string;
  parentId: string | null;
  value: [] | null;
  rule: Rule | null;
  children: RuleCondition | null;
  parent: RuleCondition | null;
  position: number;
  customFields: CustomField[];
}
