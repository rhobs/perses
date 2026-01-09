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
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import LaunchIcon from 'mdi-material-ui/Launch';
import { InfoTooltip } from '@perses-dev/components';
import { replaceVariablesInString, useAllVariableValues, useRouterContext } from '@perses-dev/plugin-system';
export function SpanLinksButton(props) {
    const { customLinks, span } = props;
    const variableValues = useAllVariableValues();
    const { RouterComponent } = useRouterContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    if (!RouterComponent || !customLinks.links.span) {
        return null;
    }
    // if there is a single span link, render the button directly without a menu
    if (span.links.length == 1 && span.links[0]) {
        const link = span.links[0];
        return /*#__PURE__*/ _jsx(InfoTooltip, {
            description: "open linked span",
            children: /*#__PURE__*/ _jsx(IconButton, {
                size: "small",
                component: RouterComponent,
                to: replaceVariablesInString(customLinks.links.span, variableValues, {
                    ...customLinks.variables,
                    traceId: link.traceId,
                    spanId: link.spanId
                }),
                children: /*#__PURE__*/ _jsx(LaunchIcon, {
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
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(InfoTooltip, {
                description: `${span.links.length} linked spans`,
                children: /*#__PURE__*/ _jsx(IconButton, {
                    "aria-label": "span links",
                    "aria-haspopup": "true",
                    "aria-expanded": isOpen ? 'true' : undefined,
                    size: "small",
                    onClick: handleOpenMenu,
                    children: /*#__PURE__*/ _jsx(LaunchIcon, {
                        fontSize: "inherit"
                    })
                })
            }),
            /*#__PURE__*/ _jsx(Menu, {
                anchorEl: anchorEl,
                open: isOpen,
                onClose: handleClose,
                children: span.links.map((link)=>/*#__PURE__*/ _jsxs(MenuItem, {
                        component: RouterComponent,
                        onClick: handleClose,
                        to: replaceVariablesInString(customLinks.links.span, variableValues, {
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

//# sourceMappingURL=SpanLinksButton.js.map