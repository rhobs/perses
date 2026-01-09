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
Object.defineProperty(exports, "SpanEventList", {
    enumerable: true,
    get: function() {
        return SpanEventList;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _react = require("react");
const _ChevronUp = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/ChevronUp"));
const _ChevronDown = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/ChevronDown"));
const _utils = require("../utils");
const _Attributes = require("./Attributes");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function SpanEventList(props) {
    const { customLinks, trace, span } = props;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: span.events.sort((a, b)=>a.timeUnixMs - b.timeUnixMs).map((event, i)=>/*#__PURE__*/ (0, _jsxruntime.jsxs)(_react.Fragment, {
                children: [
                    i > 0 && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Divider, {}),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(SpanEventItem, {
                        customLinks: customLinks,
                        trace: trace,
                        event: event
                    })
                ]
            }, i))
    });
}
function SpanEventItem(props) {
    const { customLinks, trace, event } = props;
    const relativeTime = event.timeUnixMs - trace.startTimeUnixMs;
    const [open, setOpen] = (0, _react.useState)(false);
    const handleClick = ()=>{
        setOpen(!open);
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.List, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.ListItemButton, {
                onClick: handleClick,
                sx: {
                    px: 1
                },
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.ListItemText, {
                        primary: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                            children: [
                                /*#__PURE__*/ (0, _jsxruntime.jsxs)("strong", {
                                    children: [
                                        (0, _utils.formatDuration)(relativeTime),
                                        ":"
                                    ]
                                }),
                                " ",
                                event.name
                            ]
                        }),
                        slotProps: {
                            primary: {
                                noWrap: true
                            }
                        }
                    }),
                    open ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_ChevronUp.default, {}) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_ChevronDown.default, {})
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Collapse, {
                in: open,
                timeout: "auto",
                unmountOnExit: true,
                children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.List, {
                    sx: {
                        px: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_Attributes.AttributeItem, {
                            name: "name",
                            value: event.name
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_Attributes.AttributeItem, {
                            name: "time",
                            value: (0, _utils.formatDuration)(relativeTime)
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_Attributes.AttributeItems, {
                            customLinks: customLinks,
                            attributes: event.attributes
                        })
                    ]
                })
            })
        ]
    });
}
