// Copyright The Perses Authors
// Licensed under the Apache License, Version 2.0 (the \"License\");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an \"AS IS\" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "filterToTraceQL", {
    enumerable: true,
    get: function() {
        return filterToTraceQL;
    }
});
function filterToTraceQL(filter) {
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
