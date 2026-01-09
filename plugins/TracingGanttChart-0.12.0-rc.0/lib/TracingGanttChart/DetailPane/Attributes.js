import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
import { useMemo } from 'react';
import { Divider, Link, List, ListItem, ListItemText } from '@mui/material';
import { replaceVariablesInString, useAllVariableValues, useRouterContext } from '@perses-dev/plugin-system';
import { formatDuration } from '../utils';
export function TraceAttributes(props) {
    const { customLinks, trace, span } = props;
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsxs(List, {
                children: [
                    /*#__PURE__*/ _jsx(AttributeItem, {
                        name: "span ID",
                        value: span.spanId
                    }),
                    /*#__PURE__*/ _jsx(AttributeItem, {
                        name: "start",
                        value: formatDuration(span.startTimeUnixMs - trace.startTimeUnixMs)
                    }),
                    /*#__PURE__*/ _jsx(AttributeItem, {
                        name: "duration",
                        value: formatDuration(span.endTimeUnixMs - span.startTimeUnixMs)
                    })
                ]
            }),
            /*#__PURE__*/ _jsx(Divider, {}),
            span.attributes.length > 0 && /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                    /*#__PURE__*/ _jsx(AttributeList, {
                        customLinks: customLinks,
                        attributes: span.attributes.toSorted((a, b)=>a.key.localeCompare(b.key))
                    }),
                    /*#__PURE__*/ _jsx(Divider, {})
                ]
            }),
            /*#__PURE__*/ _jsx(AttributeList, {
                customLinks: customLinks,
                attributes: span.resource.attributes.toSorted((a, b)=>a.key.localeCompare(b.key))
            })
        ]
    });
}
export function AttributeList(props) {
    const { customLinks, attributes } = props;
    return /*#__PURE__*/ _jsx(List, {
        children: /*#__PURE__*/ _jsx(AttributeItems, {
            customLinks: customLinks,
            attributes: attributes
        })
    });
}
export function AttributeItems(props) {
    const { customLinks, attributes } = props;
    const variableValues = useAllVariableValues();
    // turn array into map for fast access
    const attributeLinks = useMemo(()=>{
        const attrs = (customLinks?.links.attributes ?? []).map((a)=>[
                a.name,
                a.link
            ]);
        return Object.fromEntries(attrs);
    }, [
        customLinks
    ]);
    // some links require access to other attributes, for example a pod link "/namespace/${k8s_namespace_name}/pod/${k8s_pod_name}"
    const extraVariables = useMemo(()=>{
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
    return /*#__PURE__*/ _jsx(_Fragment, {
        children: attributes.map((attribute, i)=>/*#__PURE__*/ _jsx(AttributeItem, {
                name: attribute.key,
                value: renderAttributeValue(attribute.value),
                link: attributeLinks[attribute.key] ? replaceVariablesInString(attributeLinks[attribute.key], variableValues, extraVariables) : undefined
            }, i))
    });
}
export function AttributeItem(props) {
    const { name, value, link } = props;
    const { RouterComponent } = useRouterContext();
    const valueComponent = RouterComponent && link ? /*#__PURE__*/ _jsx(Link, {
        component: RouterComponent,
        to: link,
        children: value
    }) : value;
    return /*#__PURE__*/ _jsx(ListItem, {
        sx: {
            px: 1,
            py: 0
        },
        children: /*#__PURE__*/ _jsx(ListItemText, {
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

//# sourceMappingURL=Attributes.js.map