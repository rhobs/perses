import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
import { Divider, List } from '@mui/material';
import { Fragment } from 'react';
import { replaceVariablesInString, useAllVariableValues } from '@perses-dev/plugin-system';
import { AttributeItem, AttributeItems } from './Attributes';
export function SpanLinkList(props) {
    const { customLinks, span } = props;
    return /*#__PURE__*/ _jsx(_Fragment, {
        children: span.links.map((link, i)=>/*#__PURE__*/ _jsxs(Fragment, {
                children: [
                    i > 0 && /*#__PURE__*/ _jsx(Divider, {}),
                    /*#__PURE__*/ _jsx(SpanLinkItem, {
                        link: link,
                        customLinks: customLinks
                    })
                ]
            }, i))
    });
}
function SpanLinkItem(props) {
    const { customLinks, link } = props;
    const variableValues = useAllVariableValues();
    const traceLink = customLinks?.links.trace ? replaceVariablesInString(customLinks.links.trace, variableValues, {
        ...customLinks?.variables,
        traceId: link.traceId
    }) : undefined;
    const spanLink = customLinks?.links.span ? replaceVariablesInString(customLinks.links.span, variableValues, {
        ...customLinks?.variables,
        traceId: link.traceId,
        spanId: link.spanId
    }) : undefined;
    return /*#__PURE__*/ _jsxs(List, {
        children: [
            /*#__PURE__*/ _jsx(AttributeItem, {
                name: "trace ID",
                value: link.traceId,
                link: traceLink
            }),
            /*#__PURE__*/ _jsx(AttributeItem, {
                name: "span ID",
                value: link.spanId,
                link: spanLink
            }),
            /*#__PURE__*/ _jsx(AttributeItems, {
                customLinks: customLinks,
                attributes: link.attributes
            })
        ]
    });
}

//# sourceMappingURL=SpanLinks.js.map