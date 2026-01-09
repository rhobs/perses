import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Copyright 2025 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import React, { memo, useCallback } from 'react';
import { Box, Collapse } from '@mui/material';
import ChevronRight from 'mdi-material-ui/ChevronRight';
import { useSeverityColor } from '../hooks/useSeverity';
import { LogTimestamp } from './LogTimestamp';
import { LogRowContainer, LogRowContent, ExpandButton, LogText } from './LogsStyles';
import { LogDetailsTable } from './LogDetailsTable';
const DefaultLogRow = ({ log, isExpanded, index, onToggle, isExpandable = true, showTime = false, allowWrap = false })=>{
    const severityColor = useSeverityColor(log);
    const handleToggle = useCallback(()=>{
        if (isExpandable) {
            onToggle(index);
        }
    }, [
        isExpandable,
        onToggle,
        index
    ]);
    if (!log) return null;
    return /*#__PURE__*/ _jsxs(LogRowContainer, {
        severityColor: severityColor,
        children: [
            /*#__PURE__*/ _jsxs(LogRowContent, {
                onClick: handleToggle,
                isExpandable: isExpandable,
                children: [
                    isExpandable && /*#__PURE__*/ _jsx(Box, {
                        sx: {
                            display: 'flex',
                            alignItems: 'center',
                            width: '16px',
                            justifyContent: 'center'
                        },
                        children: /*#__PURE__*/ _jsx(ExpandButton, {
                            size: "small",
                            isExpanded: isExpanded,
                            children: /*#__PURE__*/ _jsx(ChevronRight, {
                                sx: {
                                    fontSize: '12px'
                                }
                            })
                        })
                    }),
                    /*#__PURE__*/ _jsx(LogTimestamp, {
                        timestamp: log.timestamp
                    }),
                    /*#__PURE__*/ _jsx(Box, {
                        sx: {
                            display: 'flex',
                            gap: '10px',
                            marginLeft: '36px'
                        },
                        children: /*#__PURE__*/ _jsx(LogText, {
                            variant: "body2",
                            allowWrap: allowWrap,
                            children: log.line
                        })
                    })
                ]
            }),
            /*#__PURE__*/ _jsx(Collapse, {
                in: isExpanded,
                timeout: 200,
                children: /*#__PURE__*/ _jsx(Box, {
                    sx: {
                        padding: '8px'
                    },
                    children: /*#__PURE__*/ _jsxs(Box, {
                        sx: {
                            display: 'grid',
                            gridTemplateColumns: !showTime ? '1fr' : '8px minmax(160px, max-content) 1fr',
                            gap: '12px'
                        },
                        children: [
                            showTime && /*#__PURE__*/ _jsxs(_Fragment, {
                                children: [
                                    /*#__PURE__*/ _jsx(Box, {}),
                                    /*#__PURE__*/ _jsx(Box, {})
                                ]
                            }),
                            /*#__PURE__*/ _jsx(Box, {
                                children: /*#__PURE__*/ _jsx(LogDetailsTable, {
                                    log: log.labels
                                })
                            })
                        ]
                    })
                })
            })
        ]
    });
};
export const LogRow = /*#__PURE__*/ memo(DefaultLogRow);
LogRow.displayName = 'LogRow';

//# sourceMappingURL=LogRow.js.map