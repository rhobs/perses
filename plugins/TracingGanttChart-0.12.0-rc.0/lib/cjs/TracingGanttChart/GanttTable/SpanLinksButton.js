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
Object.defineProperty(exports, "SpanLinksButton", {
    enumerable: true,
    get: function() {
        return SpanLinksButton;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _react = require("react");
const _Launch = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Launch"));
const _components = require("@perses-dev/components");
const _pluginsystem = require("@perses-dev/plugin-system");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function SpanLinksButton(props) {
    const { customLinks, span } = props;
    const variableValues = (0, _pluginsystem.useAllVariableValues)();
    const { RouterComponent } = (0, _pluginsystem.useRouterContext)();
    const [anchorEl, setAnchorEl] = (0, _react.useState)(null);
    const isOpen = Boolean(anchorEl);
    if (!RouterComponent || !customLinks.links.span) {
        return null;
    }
    // if there is a single span link, render the button directly without a menu
    if (span.links.length == 1 && span.links[0]) {
        const link = span.links[0];
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.InfoTooltip, {
            description: "open linked span",
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                size: "small",
                component: RouterComponent,
                to: (0, _pluginsystem.replaceVariablesInString)(customLinks.links.span, variableValues, {
                    ...customLinks.variables,
                    traceId: link.traceId,
                    spanId: link.spanId
                }),
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Launch.default, {
                    fontSize: "inherit"
                })
            })
        });
    }
    const handleOpenMenu = (event)=>{
        // do not propagate onClick event to the table row (otherwise, the detail pane would open)
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event)=>{
        // Closing the menu, i.e. clicking on the fullscreen transparent MUI backdrop element, does trigger a click on the table row (which opens the detail pane).
        // Therefore, stop propagating this event
        event.stopPropagation();
        setAnchorEl(null);
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.InfoTooltip, {
                description: `${span.links.length} linked spans`,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                    "aria-label": "span links",
                    "aria-haspopup": "true",
                    "aria-expanded": isOpen ? 'true' : undefined,
                    size: "small",
                    onClick: handleOpenMenu,
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Launch.default, {
                        fontSize: "inherit"
                    })
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Menu, {
                anchorEl: anchorEl,
                open: isOpen,
                onClose: handleClose,
                children: span.links.map((link)=>/*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.MenuItem, {
                        component: RouterComponent,
                        onClick: handleClose,
                        to: (0, _pluginsystem.replaceVariablesInString)(customLinks.links.span, variableValues, {
                            ...customLinks.variables,
                            traceId: link.traceId,
                            spanId: link.spanId
                        }),
                        children: [
                            "Open linked span ",
                            link.spanId
                        ]
                    }, link.spanId))
            })
        ]
    });
}
