// type DerivedStateVariable = 

import { Primitive } from "./utils/types/primitive"

export type DerivedStateVariableDefinition = [string, DeriveEvaluationJoin | DeriveCondition];

type Comparator = "equals" | "less" | "greater" | "lessEqual" | "greaterEqual";

type DeriveCondition = [string, Comparator, Primitive]

interface DeriveEvaluationJoin {
  /** Is true if all included instructions evaluate to true */
  and: DeriveCondition[];
  /** Is true if any instructions evaluate to true */ 
  or: DeriveCondition[];
}

