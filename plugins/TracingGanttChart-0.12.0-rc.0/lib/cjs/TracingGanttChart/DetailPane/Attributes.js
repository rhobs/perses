// Copyright 2024 The Perses Authors
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
    get AttributeItem () {
        return AttributeItem;
    },
    get AttributeItems () {
        return AttributeItems;
    },
    get AttributeList () {
        return AttributeList;
    },
    get TraceAttributes () {
        return TraceAttributes;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _material = require("@mui/material");
const _pluginsystem = require("@perses-dev/plugin-system");
const _utils = require("../utils");
function TraceAttributes(props) {
    const { customLinks, trace, span } = props;
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.List, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(AttributeItem, {
                        name: "span ID",
                        value: span.spanId
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(AttributeItem, {
                        name: "start",
                        value: (0, _utils.formatDuration)(span.startTimeUnixMs - trace.startTimeUnixMs)
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(AttributeItem, {
                        name: "duration",
                        value: (0, _utils.formatDuration)(span.endTimeUnixMs - span.startTimeUnixMs)
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Divider, {}),
            span.attributes.length > 0 && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(AttributeList, {
                        customLinks: customLinks,
                        attributes: span.attributes.toSorted((a, b)=>a.key.localeCompare(b.key))
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Divider, {})
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(AttributeList, {
                customLinks: customLinks,
                attributes: span.resource.attributes.toSorted((a, b)=>a.key.localeCompare(b.key))
            })
        ]
    });
}
function AttributeList(props) {
    const { customLinks, attributes } = props;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.List, {
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(AttributeItems, {
            customLinks: customLinks,
            attributes: attributes
        })
    });
}
function AttributeItems(props) {
    const { customLinks, attributes } = props;
    const variableValues = (0, _pluginsystem.useAllVariableValues)();
    // turn array into map for fast access
    const attributeLinks = (0, _react.useMemo)(()=>{
        const attrs = (customLinks?.links.attributes ?? []).map((a)=>[
                a.name,
                a.link
            ]);
        return Object.fromEntries(attrs);
    }, [
        customLinks
    ]);
    // some links require access to other attributes, for example a pod link "/namespace/${k8s_namespace_name}/pod/${k8s_pod_name}"
    const extraVariables = (0, _react.useMemo)(()=>{
        // replace dot with underscore in attribute name, because dot is not allowed in variable names
        const stringAttrs = attributes.map((attr)=>[
                attr.key.replaceAll('.', '_'),
                renderAttributeValue(attr.value)
            ]);
        return {
            ...customLinks?.variables,
            ...Object.fromEntries(stringAttrs)
        };
    }, [
        customLinks,
        attributes
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: attributes.map((attribute, i)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(AttributeItem, {
                name: attribute.key,
                value: renderAttributeValue(attribute.value),
                link: attributeLinks[attribute.key] ? (0, _pluginsystem.replaceVariablesInString)(attributeLinks[attribute.key], variableValues, extraVariables) : undefined
            }, i))
    });
}
function AttributeItem(props) {
    const { name, value, link } = props;
    const { RouterComponent } = (0, _pluginsystem.useRouterContext)();
    const valueComponent = RouterComponent && link ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Link, {
        component: RouterComponent,
        to: link,
        children: value
    }) : value;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.ListItem, {
        sx: {
            px: 1,
            py: 0
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.ListItemText, {
            primary: name,
            secondary: valueComponent,
            slotProps: {
                primary: {
                    variant: 'h5'
                },
                secondary: {
                    variant: 'body1',
                    sx: {
                        wordBreak: 'break-word'
                    }
                }
            }
        })
    });
}
function renderAttributeValue(value) {
    if ('stringValue' in value) return value.stringValue || '<empty string>';
    if ('intValue' in value) return value.intValue;
    if ('doubleValue' in value) return String(value.doubleValue);
    if ('boolValue' in value) return String(value.boolValue);
    if ('arrayValue' in value) {
        const values = value.arrayValue.values;
        return values && values.length > 0 ? values.map(renderAttributeValue).join(', ') : '<empty array>';
    }
    return 'unknown';
}
