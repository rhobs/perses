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
Object.defineProperty(exports, "SpanLinkList", {
    enumerable: true,
    get: function() {
        return SpanLinkList;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _react = require("react");
const _pluginsystem = require("@perses-dev/plugin-system");
const _Attributes = require("./Attributes");
function SpanLinkList(props) {
    const { customLinks, span } = props;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: span.links.map((link, i)=>/*#__PURE__*/ (0, _jsxruntime.jsxs)(_react.Fragment, {
                children: [
                    i > 0 && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Divider, {}),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(SpanLinkItem, {
                        link: link,
                        customLinks: customLinks
                    })
                ]
            }, i))
    });
}
function SpanLinkItem(props) {
    const { customLinks, link } = props;
    const variableValues = (0, _pluginsystem.useAllVariableValues)();
    const traceLink = customLinks?.links.trace ? (0, _pluginsystem.replaceVariablesInString)(customLinks.links.trace, variableValues, {
        ...customLinks?.variables,
        traceId: link.traceId
    }) : undefined;
    const spanLink = customLinks?.links.span ? (0, _pluginsystem.replaceVariablesInString)(customLinks.links.span, variableValues, {
        ...customLinks?.variables,
        traceId: link.traceId,
        spanId: link.spanId
    }) : undefined;
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.List, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_Attributes.AttributeItem, {
                name: "trace ID",
                value: link.traceId,
                link: traceLink
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_Attributes.AttributeItem, {
                name: "span ID",
                value: link.spanId,
                link: spanLink
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_Attributes.AttributeItems, {
                customLinks: customLinks,
                attributes: link.attributes
            })
        ]
    });
}
