// Copyright 2025 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get applyQuotedCompletion () {
        return applyQuotedCompletion;
    },
    get complete () {
        return complete;
    },
    get identifyCompletion () {
        return identifyCompletion;
    }
});
const _autocomplete = require("@codemirror/autocomplete");
const _language = require("@codemirror/language");
const _lezerlogql = require("@grafana/lezer-logql");
const _lokiclient = require("../model/loki-client");
const quoteChars = [
    '"',
    '`'
];
const defaultQuoteChar = '"';
async function complete(completionCfg, { state, pos }) {
    // First, identify the completion scope
    const completion = identifyCompletion(state, pos, (0, _language.syntaxTree)(state));
    if (!completion) {
        // No completion scope found for current cursor position.
        return null;
    }
    // Then, retrieve completion options for the identified scope (from the Loki API).
    const options = await retrieveOptions(completionCfg, completion.scope);
    return {
        options,
        from: completion.from,
        to: completion.to
    };
}
function identifyCompletion(state, pos, tree) {
    const node = tree.resolveInner(pos, -1);
    switch(node.type.id){
        case _lezerlogql.Selector:
            // Selector is the entire {label matchers} expression
            // Autocomplete at start: {▯ or empty: {}
            // Do not autocomplete if cursor is after closing brace: {job="mysql"}▯
            if ((node.firstChild === null || node.firstChild?.type.id === 0) && !state.sliceDoc(node.from, pos).includes('}')) {
                return {
                    scope: {
                        kind: 'LabelName'
                    },
                    from: pos
                };
            }
            break;
        case _lezerlogql.Matchers:
            {
                // Matchers node contains all label matchers inside {}
                // Autocomplete after comma: { job="mysql",▯ or { job="mysql", ▯
                const text = state.sliceDoc(node.from, pos);
                if (text.endsWith(',') || text.endsWith(', ')) {
                    return {
                        scope: {
                            kind: 'LabelName'
                        },
                        from: pos
                    };
                }
                break;
            }
        case _lezerlogql.Matcher:
            // Single matcher like job="mysql"
            // Autocomplete when cursor is after a complete matcher: { job="mysql" ▯
            if (node.parent?.type.id === _lezerlogql.Matchers) {
                return {
                    scope: {
                        kind: 'LabelName'
                    },
                    from: pos
                };
            }
            break;
        case _lezerlogql.Identifier:
            // Identifier is a label name being typed
            // Autocomplete partial label names: { jo▯ or { job="mysql", na▯
            if (node.parent?.type.id === _lezerlogql.Matcher) {
                return {
                    scope: {
                        kind: 'LabelName'
                    },
                    from: node.from
                };
            }
            break;
        case _lezerlogql.Eq:
        case _lezerlogql.Neq:
        case _lezerlogql.Re:
        case _lezerlogql.Nre:
            // Operators for label matching: =, !=, =~, !~
            // Autocomplete label values right after operator: { job=▯ or { job!=▯
            if (node.parent?.type.id === _lezerlogql.Matcher) {
                const labelNode = node.parent.firstChild;
                if (labelNode?.type.id === _lezerlogql.Identifier) {
                    const label = state.sliceDoc(labelNode.from, labelNode.to);
                    return {
                        scope: {
                            kind: 'LabelValue',
                            label
                        },
                        from: pos
                    };
                }
            }
            break;
        case _lezerlogql.String:
            // String value in a matcher: { job="▯
            // Do not autocomplete if cursor is after closing quotes: { job=""▯
            if (node.parent?.type.id === _lezerlogql.Matcher && !/^".*"$/.test(state.sliceDoc(node.from, pos))) {
                const labelNode = node.parent.firstChild;
                if (labelNode?.type.id === _lezerlogql.Identifier) {
                    const label = state.sliceDoc(labelNode.from, labelNode.to);
                    return {
                        scope: {
                            kind: 'LabelValue',
                            label
                        },
                        from: node.from + 1
                    }; // +1 to skip opening quote
                }
            }
            break;
        case 0 /* error node */ :
            // Error nodes represent incomplete or malformed syntax
            // Autocomplete incomplete value after operator: { job=mys▯ or { job="mys▯
            if ((node.prevSibling?.type.id === _lezerlogql.Eq || node.prevSibling?.type.id === _lezerlogql.Neq || node.prevSibling?.type.id === _lezerlogql.Re || node.prevSibling?.type.id === _lezerlogql.Nre) && node.parent?.type.id === _lezerlogql.Matcher) {
                const labelNode = node.parent.firstChild;
                if (labelNode?.type.id === _lezerlogql.Identifier) {
                    const label = state.sliceDoc(labelNode.from, labelNode.to);
                    // Skip leading quote if present: { name="HT▯
                    const from = quoteChars.includes(state.sliceDoc(node.from, node.from + 1)) ? node.from + 1 : node.from;
                    return {
                        scope: {
                            kind: 'LabelValue',
                            label
                        },
                        from
                    };
                }
            }
            // Autocomplete partial label name: { j▯ or { job="mysql", n▯
            if (node.parent?.type.id === _lezerlogql.Selector || node.parent?.type.id === _lezerlogql.Matchers) {
                return {
                    scope: {
                        kind: 'LabelName'
                    },
                    from: node.from
                };
            }
            break;
    }
}
/**
 * Retrieve completion options based on the identified completion scope.
 */ async function retrieveOptions(completionCfg, completion) {
    switch(completion.kind){
        case 'LabelName':
            return completeLabelName(completionCfg);
        case 'LabelValue':
            return completeLabelValue(completionCfg, completion.label);
    }
}
async function completeLabelName(completionCfg) {
    if (!completionCfg.client) {
        return [];
    }
    const start = completionCfg.timeRange?.start ? (0, _lokiclient.toUnixSeconds)(new Date(completionCfg.timeRange.start).getTime()) : undefined;
    const end = completionCfg.timeRange?.end ? (0, _lokiclient.toUnixSeconds)(new Date(completionCfg.timeRange.end).getTime()) : undefined;
    try {
        const response = await completionCfg.client.labels(start, end);
        if (response.status === 'success') {
            return response.data.map((label)=>({
                    label
                }));
        }
        return [];
    } catch (error) {
        console.error('Error fetching label names:', error);
        return [];
    }
}
function escapeString(input, quoteChar) {
    // do not escape raw strings (when using backticks)
    if (quoteChar === '`') {
        return input;
    }
    let escaped = input;
    // escape backslashes and quotes
    escaped = escaped.replaceAll('\\', '\\\\');
    escaped = escaped.replaceAll('"', '\\"');
    return escaped;
}
function applyQuotedCompletion(view, completion, from, to) {
    let quoteChar = defaultQuoteChar;
    if (quoteChars.includes(view.state.sliceDoc(from - 1, from))) {
        quoteChar = view.state.sliceDoc(from - 1, from);
        from--;
    }
    if (quoteChars.includes(view.state.sliceDoc(to, to + 1))) {
        quoteChar = view.state.sliceDoc(to, to + 1);
        to++;
    }
    // When using raw strings (`), we cannot escape a backtick.
    // Therefore, switch the quote character.
    if (completion.label.includes('`')) {
        quoteChar = '"';
    }
    const insertText = `${quoteChar}${escapeString(completion.label, quoteChar)}${quoteChar}`;
    view.dispatch((0, _autocomplete.insertCompletionText)(view.state, insertText, from, to));
}
async function completeLabelValue(completionCfg, label) {
    if (!completionCfg.client) {
        return [];
    }
    const start = completionCfg.timeRange?.start ? (0, _lokiclient.toUnixSeconds)(new Date(completionCfg.timeRange.start).getTime()) : undefined;
    const end = completionCfg.timeRange?.end ? (0, _lokiclient.toUnixSeconds)(new Date(completionCfg.timeRange.end).getTime()) : undefined;
    try {
        const response = await completionCfg.client.labelValues(label, start, end);
        if (response.status === 'success') {
            return response.data.map((value)=>({
                    label: value ?? '',
                    displayLabel: value ?? '(empty string)',
                    apply: applyQuotedCompletion
                }));
        }
        return [];
    } catch (error) {
        console.error(`Error fetching values for label ${label}:`, error);
        return [];
    }
}
