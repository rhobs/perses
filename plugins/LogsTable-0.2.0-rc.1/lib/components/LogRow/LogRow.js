import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Copyright The Perses Authors
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
import React, { memo, useCallback, useState, useRef, useEffect } from 'react';
import { Box, Collapse, useTheme, IconButton, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import ChevronRight from 'mdi-material-ui/ChevronRight';
import ContentCopy from 'mdi-material-ui/ContentCopy';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import FormatQuoteClose from 'mdi-material-ui/FormatQuoteClose';
import CodeJson from 'mdi-material-ui/CodeJson';
import Check from 'mdi-material-ui/Check';
import { useSeverityColor } from '../hooks/useSeverity';
import { formatLogEntry, formatLogMessage, formatLogAsJson } from '../../utils/copyHelpers';
import { LogTimestamp } from './LogTimestamp';
import { LogRowContainer, LogRowContent, ExpandButton, LogText } from './LogsStyles';
import { LogDetailsTable } from './LogDetailsTable';
const COPY_SUCCESS_DURATION_MS = 1500;
const DefaultLogRow = ({ log, isExpanded, index, onToggle, isExpandable = true, showTime = false, allowWrap = false, isSelected = false, onSelect, itemActionButtons })=>{
    const theme = useTheme();
    const severityColor = useSeverityColor(log);
    const [isHovered, setIsHovered] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const rowRef = useRef(null);
    const copyTimeoutRef = useRef(null);
    // Cleanup timeout on unmount
    useEffect(()=>{
        return ()=>{
            if (copyTimeoutRef.current) {
                window.clearTimeout(copyTimeoutRef.current);
            }
        };
    }, []);
    const handleToggle = useCallback((e)=>{
        if (isExpandable) {
            e.stopPropagation();
            onToggle(index);
        }
    }, [
        isExpandable,
        onToggle,
        index
    ]);
    const handleRowMouseDown = useCallback((e)=>{
        if (onSelect) {
            onSelect(index, e);
        }
    }, [
        onSelect,
        index
    ]);
    const handleOpenMenu = useCallback((e)=>{
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    }, []);
    const handleCloseMenu = useCallback(()=>{
        setAnchorEl(null);
        setIsHovered(false);
    }, []);
    const handleCopy = useCallback(async (format)=>{
        if (!log) return;
        let text;
        switch(format){
            case 'message':
                text = formatLogMessage(log);
                break;
            case 'json':
                text = formatLogAsJson(log);
                break;
            case 'full':
            default:
                text = formatLogEntry(log);
        }
        await navigator.clipboard.writeText(text);
        setCopySuccess(true);
        handleCloseMenu();
        // Clear existing timeout
        if (copyTimeoutRef.current) {
            window.clearTimeout(copyTimeoutRef.current);
        }
        // Reset success state after configured duration
        copyTimeoutRef.current = window.setTimeout(()=>{
            setCopySuccess(false);
        }, COPY_SUCCESS_DURATION_MS);
    }, [
        log,
        handleCloseMenu
    ]);
    if (!log) return null;
    const hasRowActions = itemActionButtons && itemActionButtons.length > 0;
    return /*#__PURE__*/ _jsxs(LogRowContainer, {
        severityColor: severityColor,
        ref: rowRef,
        onMouseEnter: ()=>setIsHovered(true),
        onMouseLeave: ()=>{
            if (!anchorEl) {
                setIsHovered(false);
            }
        },
        "data-log-index": index,
        "data-testid": `log-row-container-${index}`,
        children: [
            /*#__PURE__*/ _jsxs(LogRowContent, {
                onMouseDown: handleRowMouseDown,
                isExpandable: isExpandable,
                isHighlighted: Boolean(anchorEl),
                hasRowActions: hasRowActions,
                isSelected: isSelected,
                children: [
                    isExpandable && /*#__PURE__*/ _jsx(Box, {
                        onClick: handleToggle,
                        sx: {
                            display: 'flex',
                            alignItems: 'center',
                            width: '16px',
                            justifyContent: 'center',
                            cursor: 'pointer'
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
                    /*#__PURE__*/ _jsxs(Box, {
                        sx: {
                            display: 'flex',
                            gap: '10px',
                            marginLeft: '36px',
                            alignItems: 'center'
                        },
                        children: [
                            /*#__PURE__*/ _jsx(LogText, {
                                variant: "body2",
                                allowWrap: allowWrap,
                                children: log.line
                            }),
                            /*#__PURE__*/ _jsx(Tooltip, {
                                title: copySuccess ? 'Copied!' : 'Copy options',
                                children: /*#__PURE__*/ _jsx(IconButton, {
                                    size: "small",
                                    onClick: handleOpenMenu,
                                    "aria-label": "Copy log options",
                                    sx: {
                                        padding: '4px',
                                        marginLeft: 'auto',
                                        color: copySuccess ? theme.palette.success.main : theme.palette.text.secondary,
                                        opacity: isHovered || Boolean(anchorEl) || copySuccess ? 1 : 0,
                                        pointerEvents: isHovered || Boolean(anchorEl) || copySuccess ? 'auto' : 'none',
                                        transition: 'opacity 0.08s ease, color 0.2s ease',
                                        '&:hover': {
                                            color: copySuccess ? theme.palette.success.main : theme.palette.primary.main,
                                            backgroundColor: theme.palette.action.hover
                                        },
                                        borderRadius: '4px',
                                        display: 'flex',
                                        gap: '2px'
                                    },
                                    children: copySuccess ? /*#__PURE__*/ _jsx(Check, {
                                        sx: {
                                            fontSize: '14px'
                                        }
                                    }) : /*#__PURE__*/ _jsxs(_Fragment, {
                                        children: [
                                            /*#__PURE__*/ _jsx(ContentCopy, {
                                                sx: {
                                                    fontSize: '14px'
                                                }
                                            }),
                                            /*#__PURE__*/ _jsx(ChevronDown, {
                                                sx: {
                                                    fontSize: '12px'
                                                }
                                            })
                                        ]
                                    })
                                })
                            }),
                            hasRowActions && /*#__PURE__*/ _jsx(Box, {
                                sx: {
                                    display: 'flex',
                                    gap: '4px',
                                    alignItems: 'center',
                                    opacity: isHovered || Boolean(anchorEl) ? 1 : 0,
                                    pointerEvents: isHovered || Boolean(anchorEl) ? 'auto' : 'none',
                                    transition: 'opacity 0.08s ease'
                                },
                                children: itemActionButtons
                            }),
                            /*#__PURE__*/ _jsxs(Menu, {
                                anchorEl: anchorEl,
                                open: Boolean(anchorEl),
                                onClose: handleCloseMenu,
                                onClick: (e)=>e.stopPropagation(),
                                "aria-label": "Copy format options",
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                },
                                transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'right'
                                },
                                slotProps: {
                                    paper: {
                                        sx: {
                                            mt: 0.5,
                                            minWidth: 180,
                                            boxShadow: theme.shadows[3]
                                        }
                                    }
                                },
                                children: [
                                    /*#__PURE__*/ _jsxs(MenuItem, {
                                        onClick: ()=>handleCopy('full'),
                                        sx: {
                                            py: 1,
                                            '&:hover': {
                                                backgroundColor: theme.palette.action.hover
                                            }
                                        },
                                        children: [
                                            /*#__PURE__*/ _jsx(ListItemIcon, {
                                                children: /*#__PURE__*/ _jsx(ContentCopy, {
                                                    fontSize: "small"
                                                })
                                            }),
                                            /*#__PURE__*/ _jsx(ListItemText, {
                                                primary: "Copy log",
                                                secondary: "Timestamp + labels + message",
                                                slotProps: {
                                                    primary: {
                                                        fontSize: '14px'
                                                    },
                                                    secondary: {
                                                        fontSize: '11px'
                                                    }
                                                }
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsxs(MenuItem, {
                                        onClick: ()=>handleCopy('message'),
                                        sx: {
                                            py: 1,
                                            '&:hover': {
                                                backgroundColor: theme.palette.action.hover
                                            }
                                        },
                                        children: [
                                            /*#__PURE__*/ _jsx(ListItemIcon, {
                                                children: /*#__PURE__*/ _jsx(FormatQuoteClose, {
                                                    fontSize: "small"
                                                })
                                            }),
                                            /*#__PURE__*/ _jsx(ListItemText, {
                                                primary: "Copy message",
                                                secondary: "Message text only",
                                                slotProps: {
                                                    primary: {
                                                        fontSize: '14px'
                                                    },
                                                    secondary: {
                                                        fontSize: '11px'
                                                    }
                                                }
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsxs(MenuItem, {
                                        onClick: ()=>handleCopy('json'),
                                        sx: {
                                            py: 1,
                                            '&:hover': {
                                                backgroundColor: theme.palette.action.hover
                                            }
                                        },
                                        children: [
                                            /*#__PURE__*/ _jsx(ListItemIcon, {
                                                children: /*#__PURE__*/ _jsx(CodeJson, {
                                                    fontSize: "small"
                                                })
                                            }),
                                            /*#__PURE__*/ _jsx(ListItemText, {
                                                primary: "Copy as JSON",
                                                secondary: "Full log entry",
                                                slotProps: {
                                                    primary: {
                                                        fontSize: '14px'
                                                    },
                                                    secondary: {
                                                        fontSize: '11px'
                                                    }
                                                }
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
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