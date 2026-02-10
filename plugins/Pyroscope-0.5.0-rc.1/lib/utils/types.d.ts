export type OperatorType = '=' | '!=' | '=~' | '!~';
export interface LabelFilter {
    labelName: string;
    labelValue: string;
    operator: OperatorType;
}
export declare function computeFilterExpr(filters: LabelFilter[]): string;
//# sourceMappingURL=types.d.ts.map