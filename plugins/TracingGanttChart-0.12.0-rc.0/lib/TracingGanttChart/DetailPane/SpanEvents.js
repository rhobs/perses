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
import { Collapse, Divider, List, ListItemButton, ListItemText } from '@mui/material';
import { Fragment, useState } from 'react';
import ChevronUp from 'mdi-material-ui/ChevronUp';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import { formatDuration } from '../utils';
import { AttributeItems, AttributeItem } from './Attributes';
export function SpanEventList(props) {
    const { customLinks, trace, span } = props;
    return /*#__PURE__*/ _jsx(_Fragment, {
        children: span.events.sort((a, b)=>a.timeUnixMs - b.timeUnixMs).map((event, i)=>/*#__PURE__*/ _jsxs(Fragment, {
                children: [
                    i > 0 && /*#__PURE__*/ _jsx(Divider, {}),
                    /*#__PURE__*/ _jsx(SpanEventItem, {
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
    const [open, setOpen] = useState(false);
    const handleClick = ()=>{
        setOpen(!open);
    };
    return /*#__PURE__*/ _jsxs(List, {
        children: [
            /*#__PURE__*/ _jsxs(ListItemButton, {
                onClick: handleClick,
                sx: {
                    px: 1
                },
                children: [
                    /*#__PURE__*/ _jsx(ListItemText, {
                        primary: /*#__PURE__*/ _jsxs(_Fragment, {
                            children: [
                                /*#__PURE__*/ _jsxs("strong", {
                                    children: [
                                        formatDuration(relativeTime),
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
                    open ? /*#__PURE__*/ _jsx(ChevronUp, {}) : /*#__PURE__*/ _jsx(ChevronDown, {})
                ]
            }),
            /*#__PURE__*/ _jsx(Collapse, {
                in: open,
                timeout: "auto",
                unmountOnExit: true,
                children: /*#__PURE__*/ _jsxs(List, {
                    sx: {
                        px: 1
                    },
                    children: [
                        /*#__PURE__*/ _jsx(AttributeItem, {
                            name: "name",
                            value: event.name
                        }),
                        /*#__PURE__*/ _jsx(AttributeItem, {
                            name: "time",
                            value: formatDuration(relativeTime)
                        }),
                        /*#__PURE__*/ _jsx(AttributeItems, {
                            customLinks: customLinks,
                            attributes: event.attributes
                        })
                    ]
                })
            })
        ]
    });
}

//# sourceMappingURL=SpanEvents.js.map