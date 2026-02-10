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
Object.defineProperty(exports, "traceQLToFilter", {
    enumerable: true,
    get: function() {
        return traceQLToFilter;
    }
});
const _lezertraceql = require("@grafana/lezer-traceql");
function traceQLToFilter(query) {
    const matchers = parseQuery(query);
    return {
        serviceName: reverseStringMatcher(matchers['resource.service.name']),
        spanName: reverseStringMatcher(matchers['name']),
        namespace: reverseStringMatcher(matchers['resource.k8s.namespace.name']),
        status: reverseIntrinsicMatcher(matchers['status']),
        spanDuration: reverseDurationMatcher(matchers['duration']),
        traceDuration: reverseDurationMatcher(matchers['traceDuration']),
        customMatchers: reverseCustomMatcher(matchers, new Set([
            'resource.service.name',
            'name',
            'resource.k8s.namespace.name',
            'status',
            'duration',
            'traceDuration'
        ]))
    };
}
function parseQuery(query) {
    const matchers = {};
    let attribute = '';
    let operator = '';
    let value = '';
    const syntaxTree = _lezertraceql.parser.parse(query);
    syntaxTree.iterate({
        enter (node) {
            switch(node.type.id){
                case _lezertraceql.AttributeField:
                    attribute = query.slice(node.from, node.to);
                    return false;
                case _lezertraceql.IntrinsicField:
                    attribute = query.slice(node.from, node.to);
                    return false;
                case _lezertraceql.FieldOp:
                    operator = query.slice(node.from, node.to);
                    return false;
                case _lezertraceql.Static:
                    value = query.slice(node.from, node.to);
                    return false;
            }
        },
        leave (node) {
            if (node.type.id === _lezertraceql.FieldExpression && node.node.getChild(_lezertraceql.FieldOp)) {
                const newMatchers = matchers[attribute] ?? [];
                newMatchers.push({
                    operator,
                    value
                });
                matchers[attribute] = newMatchers;
            }
        }
    });
    return matchers;
}
function unescape(q) {
    return q.replaceAll('\\"', '"').replaceAll('\\\\', '\\');
}
function reverseStringMatcher(matches) {
    const values = [];
    for (const { operator, value } of matches ?? []){
        const unescaped = unescape(value.slice(1, -1));
        if (operator == '=') {
            values.push(unescaped);
        } else if (operator == '=~') {
            values.push(...unescaped.split('|'));
        }
    }
    return values;
}
function reverseIntrinsicMatcher(matches) {
    const values = [];
    for (const { operator, value } of matches ?? []){
        if (operator == '=') {
            values.push(value);
        }
    }
    return values;
}
function reverseDurationMatcher(matches) {
    const duration = {};
    for (const { operator, value } of matches ?? []){
        if (operator == '>=') {
            duration.min = value;
        } else if (operator == '<=') {
            duration.max = value;
        }
    }
    return duration;
}
function reverseCustomMatcher(matchers, skipAttrs) {
    const customMatchers = [];
    for (const [attribute, matches] of Object.entries(matchers)){
        if (skipAttrs.has(attribute)) {
            continue;
        }
        for (const { operator, value } of matches){
            customMatchers.push(`${attribute}${operator}${value}`);
        }
    }
    return customMatchers;
}
