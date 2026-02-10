/** A model of a filter bar for common tracing attributes. All attributes are combined with AND, the values of an attribute are combined with OR. */
export interface Filter {
    serviceName: string[];
    spanName: string[];
    namespace: string[];
    status: string[];
    spanDuration: DurationField;
    traceDuration: DurationField;
    customMatchers: string[];
}
export interface DurationField {
    min?: string;
    max?: string;
}
/** split a string by whitespace, except when inside quotes */
export declare function splitByUnquotedWhitespace(x: string): string[];
//# sourceMappingURL=filter.d.ts.map