/**
 * Construct a TraceQL query from a filter.
 * 1. Creates the matchers, for example 'resource.service.name = "some_value"' or 'resource.service.name =~ "some_value|other_value"'
 * 2. Join all matchers with '&&'
 * 3. Return the full TraceQL query, for example '{ resource.service.name = "some_value" && name = "span_name" }'
 */ export function filterToTraceQL(filter) {
    const matchers = [
        ...stringMatcher('resource.service.name', filter.serviceName),
        ...stringMatcher('name', filter.spanName),
        ...stringMatcher('resource.k8s.namespace.name', filter.namespace),
        ...intrinsicMatcher('status', filter.status),
        ...durationMatcher('duration', filter.spanDuration),
        ...durationMatcher('traceDuration', filter.traceDuration),
        ...customMatcher(filter.customMatchers)
    ];
    if (matchers.length === 0) {
        return '{}';
    }
    return `{ ${matchers.join(' && ')} }`;
}
function escape(q) {
    return q.replaceAll('\\', '\\\\').replaceAll('"', '\\"');
}
function stringMatcher(attribute, values) {
    const escapedValues = values.map(escape);
    if (escapedValues.length > 1) {
        return [
            `${attribute} =~ "${escapedValues.join('|')}"`
        ];
    } else if (escapedValues.length == 1) {
        return [
            `${attribute} = "${escapedValues[0]}"`
        ];
    }
    return [];
}
function intrinsicMatcher(attribute, values) {
    const orConds = values.map((x)=>`${attribute} = ${x}`);
    if (orConds.length > 1) {
        return [
            '(' + orConds.join(' || ') + ')'
        ];
    } else if (orConds.length === 1) {
        return orConds;
    } else {
        return [];
    }
}
function durationMatcher(attribute, value) {
    const matchers = [];
    if (value.min) {
        matchers.push(`${attribute} >= ${value.min}`);
    }
    if (value.max) {
        matchers.push(`${attribute} <= ${value.max}`);
    }
    return matchers;
}
function customMatcher(customMatchers) {
    return customMatchers;
}

//# sourceMappingURL=filter_to_traceql.js.map