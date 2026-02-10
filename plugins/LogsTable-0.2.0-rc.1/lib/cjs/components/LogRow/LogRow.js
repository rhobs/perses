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
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LogRow", {
    enumerable: true,
    get: function() {
        return LogRow;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard(require("react"));
const _material = require("@mui/material");
const _ChevronRight = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/ChevronRight"));
const _ContentCopy = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/ContentCopy"));
const _ChevronDown = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/ChevronDown"));
const _FormatQuoteClose = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/FormatQuoteClose"));
const _CodeJson = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/CodeJson"));
const _Check = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Check"));
const _useSeverity = require("../hooks/useSeverity");
const _copyHelpers = require("../../utils/copyHelpers");
const _LogTimestamp = require("./LogTimestamp");
const _LogsStyles = require("./LogsStyles");
const _LogDetailsTable = require("./LogDetailsTable");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const COPY_SUCCESS_DURATION_MS = 1500;
const DefaultLogRow = ({ log, isExpanded, index, onToggle, isExpandable = true, showTime = false, allowWrap = false, isSelected = false, onSelect, itemActionButtons })=>{
    const theme = (0, _material.useTheme)();
    const severityColor = (0, _useSeverity.useSeverityColor)(log);
    const [isHovered, setIsHovered] = (0, _react.useState)(false);
    const [anchorEl, setAnchorEl] = (0, _react.useState)(null);
    const [copySuccess, setCopySuccess] = (0, _react.useState)(false);
    const rowRef = (0, _react.useRef)(null);
    const copyTimeoutRef = (0, _react.useRef)(null);
    // Cleanup timeout on unmount
    (0, _react.useEffect)(()=>{
        return ()=>{
            if (copyTimeoutRef.current) {
                window.clearTimeout(copyTimeoutRef.current);
            }
        };
    }, []);
    const handleToggle = (0, _react.useCallback)((e)=>{
        if (isExpandable) {
            e.stopPropagation();
            onToggle(index);
        }
    }, [
        isExpandable,
        onToggle,
        index
    ]);
    const handleRowMouseDown = (0, _react.useCallback)((e)=>{
        if (onSelect) {
            onSelect(index, e);
        }
    }, [
        onSelect,
        index
    ]);
    const handleOpenMenu = (0, _react.useCallback)((e)=>{
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    }, []);
    const handleCloseMenu = (0, _react.useCallback)(()=>{
        setAnchorEl(null);
        setIsHovered(false);
    }, []);
    const handleCopy = (0, _react.useCallback)(async (format)=>{
        if (!log) return;
        let text;
        switch(format){
            case 'message':
                text = (0, _copyHelpers.formatLogMessage)(log);
                break;
            case 'json':
                text = (0, _copyHelpers.formatLogAsJson)(log);
                break;
            case 'full':
            default:
                text = (0, _copyHelpers.formatLogEntry)(log);
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
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_LogsStyles.LogRowContainer, {
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
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_LogsStyles.LogRowContent, {
                onMouseDown: handleRowMouseDown,
                isExpandable: isExpandable,
                isHighlighted: Boolean(anchorEl),
                hasRowActions: hasRowActions,
                isSelected: isSelected,
                children: [
                    isExpandable && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                        onClick: handleToggle,
                        sx: {
                            display: 'flex',
                            alignItems: 'center',
                            width: '16px',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        },
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_LogsStyles.ExpandButton, {
                            size: "small",
                            isExpanded: isExpanded,
                            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_ChevronRight.default, {
                                sx: {
                                    fontSize: '12px'
                                }
                            })
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_LogTimestamp.LogTimestamp, {
                        timestamp: log.timestamp
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
                        sx: {
                            display: 'flex',
                            gap: '10px',
                            marginLeft: '36px',
                            alignItems: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_LogsStyles.LogText, {
                                variant: "body2",
                                allowWrap: allowWrap,
                                children: log.line
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Tooltip, {
                                title: copySuccess ? 'Copied!' : 'Copy options',
                                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
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
                                    children: copySuccess ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_Check.default, {
                                        sx: {
                                            fontSize: '14px'
                                        }
                                    }) : /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_ContentCopy.default, {
                                                sx: {
                                                    fontSize: '14px'
                                                }
                                            }),
                                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_ChevronDown.default, {
                                                sx: {
                                                    fontSize: '12px'
                                                }
                                            })
                                        ]
                                    })
                                })
                            }),
                            hasRowActions && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
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
                            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Menu, {
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
                                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.MenuItem, {
                                        onClick: ()=>handleCopy('full'),
                                        sx: {
                                            py: 1,
                                            '&:hover': {
                                                backgroundColor: theme.palette.action.hover
                                            }
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.ListItemIcon, {
                                                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_ContentCopy.default, {
                                                    fontSize: "small"
                                                })
                                            }),
                                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.ListItemText, {
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
                                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.MenuItem, {
                                        onClick: ()=>handleCopy('message'),
                                        sx: {
                                            py: 1,
                                            '&:hover': {
                                                backgroundColor: theme.palette.action.hover
                                            }
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.ListItemIcon, {
                                                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_FormatQuoteClose.default, {
                                                    fontSize: "small"
                                                })
                                            }),
                                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.ListItemText, {
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
                                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.MenuItem, {
                                        onClick: ()=>handleCopy('json'),
                                        sx: {
                                            py: 1,
                                            '&:hover': {
                                                backgroundColor: theme.palette.action.hover
                                            }
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.ListItemIcon, {
                                                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_CodeJson.default, {
                                                    fontSize: "small"
                                                })
                                            }),
                                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.ListItemText, {
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
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Collapse, {
                in: isExpanded,
                timeout: 200,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                    sx: {
                        padding: '8px'
                    },
                    children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
                        sx: {
                            display: 'grid',
                            gridTemplateColumns: !showTime ? '1fr' : '8px minmax(160px, max-content) 1fr',
                            gap: '12px'
                        },
                        children: [
                            showTime && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {}),
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {})
                                ]
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_LogDetailsTable.LogDetailsTable, {
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
const LogRow = /*#__PURE__*/ (0, _react.memo)(DefaultLogRow);
LogRow.displayName = 'LogRow';
