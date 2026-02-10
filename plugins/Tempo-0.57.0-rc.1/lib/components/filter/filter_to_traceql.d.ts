import { Filter } from './filter';
/**
 * Construct a TraceQL query from a filter.
 * 1. Creates the matchers, for example 'resource.service.name = "some_value"' or 'resource.service.name =~ "some_value|other_value"'
 * 2. Join all matchers with '&&'
 * 3. Return the full TraceQL query, for example '{ resource.service.name = "some_value" && name = "span_name" }'
 */
export declare function filterToTraceQL(filter: Filter): string;
//# sourceMappingURL=filter_to_traceql.d.ts.map