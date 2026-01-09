import { Filter } from './filter';
/**
 * Construct a Filter from a TraceQL query.
 * 1. Parse the query (using Lezer library) and extract all matchers, e.g. 'some_attribute = "some_value"'
 * 2. Create the filter attribute values, a string array with a single value (for 'x = "y"') or multiple values (for 'x =~ "y|z"')
 * 3. Add the remaining matchers to the set of custom matchers.
 */
export declare function traceQLToFilter(query: string): Filter;
//# sourceMappingURL=traceql_to_filter.d.ts.map