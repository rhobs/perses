// Copyright The Perses Authors
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
Object.defineProperty(exports, "VirtualizedLogsList", {
    enumerable: true,
    get: function() {
        return VirtualizedLogsList;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard(require("react"));
const _material = require("@mui/material");
const _Close = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Close"));
const _reactvirtuoso = require("react-virtuoso");
const _components = require("@perses-dev/components");
const _dashboards = require("@perses-dev/dashboards");
const _pluginsystem = require("@perses-dev/plugin-system");
const _copyHelpers = require("../utils/copyHelpers");
const _LogRow = require("./LogRow");
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
const PERSES_LOGSTABLE_HINTS_DISMISSED = 'PERSES_LOGSTABLE_HINTS_DISMISSED';
const COPY_TOAST_DURATION_MS = 5000;
// Detect Mac for keyboard shortcuts display
const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
const VirtualizedLogsList = ({ logs, spec, expandedRows, onToggleExpand })=>{
    const theme = (0, _material.useTheme)();
    const [selectedRows, setSelectedRows] = (0, _react.useState)(new Set());
    const [lastSelectedIndex, setLastSelectedIndex] = (0, _react.useState)(null);
    const selectedRowsRef = (0, _react.useRef)(selectedRows);
    const [copyPopoverAnchor, setCopyPopoverAnchor] = (0, _react.useState)(null);
    const [lastCopiedFormat, setLastCopiedFormat] = (0, _react.useState)('full');
    const [lastCopiedCount, setLastCopiedCount] = (0, _react.useState)(0);
    const copyPopoverTimerRef = (0, _react.useRef)(null);
    const [isHintsDismissed, setIsHintsDismissed] = (0, _react.useState)(()=>{
        try {
            return localStorage.getItem(PERSES_LOGSTABLE_HINTS_DISMISSED) === 'true';
        } catch  {
            return false;
        }
    });
    const selectionEnabled = spec.selection?.enabled ?? false;
    const { setSelection, clearSelection } = (0, _components.useSelection)();
    const allVariables = (0, _pluginsystem.useAllVariableValues)();
    const itemActionsConfig = spec.actions ? spec.actions : undefined;
    const itemActionsListConfig = itemActionsConfig?.enabled && itemActionsConfig.displayWithItem ? itemActionsConfig.actionsList : [];
    const { getItemActionButtons, confirmDialog } = (0, _dashboards.useSelectionItemActions)({
        actions: itemActionsListConfig,
        variableState: allVariables
    });
    (0, _react.useEffect)(()=>{
        selectedRowsRef.current = selectedRows;
    }, [
        selectedRows
    ]);
    // Sync local selection state with context when selection is enabled
    (0, _react.useEffect)(()=>{
        if (!selectionEnabled) return;
        if (selectedRows.size === 0) {
            clearSelection();
        } else {
            const selectionItems = Array.from(selectedRows).map((index)=>{
                const log = logs[index];
                return log ? {
                    id: index,
                    item: log
                } : null;
            }).filter((entry)=>entry !== null);
            setSelection(selectionItems);
        }
    }, [
        selectedRows,
        logs,
        selectionEnabled,
        setSelection,
        clearSelection
    ]);
    const handleDismissHints = (0, _react.useCallback)(()=>{
        setIsHintsDismissed(true);
        try {
            localStorage.setItem(PERSES_LOGSTABLE_HINTS_DISMISSED, 'true');
        } catch  {
        // Ignore localStorage errors
        }
    }, []);
    const showCopyPopover = (0, _react.useCallback)((format = 'full', count)=>{
        // Show toast at bottom-right corner
        const x = window.innerWidth - 32;
        const y = window.innerHeight - 32;
        setCopyPopoverAnchor({
            x,
            y
        });
        setLastCopiedFormat(format);
        setLastCopiedCount(count);
        // Clear existing timer
        if (copyPopoverTimerRef.current) {
            window.clearTimeout(copyPopoverTimerRef.current);
        }
        // Auto-dismiss after configured duration
        copyPopoverTimerRef.current = window.setTimeout(()=>{
            setCopyPopoverAnchor(null);
        }, COPY_TOAST_DURATION_MS);
    }, []);
    const handleCloseCopyPopover = (0, _react.useCallback)(()=>{
        if (copyPopoverTimerRef.current) {
            window.clearTimeout(copyPopoverTimerRef.current);
        }
        setCopyPopoverAnchor(null);
    }, []);
    const handleCopyInFormat = (0, _react.useCallback)(async (format)=>{
        const selectedLogs = Array.from(selectedRowsRef.current).sort((a, b)=>a - b).map((index)=>logs[index]).filter((log)=>log !== undefined);
        let text;
        if (format === 'message') {
            text = selectedLogs.map(_copyHelpers.formatLogMessage).join('\n');
        } else if (format === 'json') {
            text = JSON.stringify(selectedLogs, null, 2);
        } else {
            text = (0, _copyHelpers.formatLogEntries)(selectedLogs);
        }
        await navigator.clipboard.writeText(text);
        showCopyPopover(format, selectedLogs.length);
    }, [
        logs,
        showCopyPopover
    ]);
    const handleRowSelect = (0, _react.useCallback)((index, event)=>{
        if (event.shiftKey) {
            // Prevent text selection during shift-click
            event.preventDefault();
            window.getSelection()?.removeAllRanges();
            if (lastSelectedIndex !== null) {
                // Range selection: select all rows between anchor and current
                const start = Math.min(lastSelectedIndex, index);
                const end = Math.max(lastSelectedIndex, index);
                const newSelection = new Set();
                for(let i = start; i <= end; i++){
                    newSelection.add(i);
                }
                setSelectedRows(newSelection);
            } else {
                // No anchor set: just select this row and set as anchor
                const newSelection = new Set([
                    index
                ]);
                setSelectedRows(newSelection);
                setLastSelectedIndex(index);
            }
        } else if (event.ctrlKey || event.metaKey) {
            // Prevent text selection during cmd/ctrl-click
            event.preventDefault();
            window.getSelection()?.removeAllRanges();
            // Toggle individual row (additive selection)
            const newSelection = new Set(selectedRows);
            if (newSelection.has(index)) {
                newSelection.delete(index);
            } else {
                newSelection.add(index);
            }
            setSelectedRows(newSelection);
            setLastSelectedIndex(index);
        } else {
            // Plain click: set as anchor for future shift-clicks
            // Don't prevent default to allow text selection
            setLastSelectedIndex(index);
        }
    }, [
        selectedRows,
        lastSelectedIndex
    ]);
    const renderLogRow = (index)=>{
        const log = logs[index];
        if (!log) return null;
        const itemActionButtons = itemActionsListConfig?.length ? getItemActionButtons({
            id: index,
            data: log
        }) : [];
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_LogRow.LogRow, {
            isExpandable: spec.enableDetails,
            log: log,
            index: index,
            isExpanded: expandedRows.has(index),
            onToggle: onToggleExpand,
            allowWrap: spec.allowWrap,
            showTime: spec.showTime,
            isSelected: selectedRows.has(index),
            onSelect: handleRowSelect,
            itemActionButtons: itemActionButtons
        });
    };
    const handleCopy = (e)=>{
        const selection = window.getSelection();
        const hasTextSelection = selection && selection.rangeCount > 0 && selection.toString().length > 0;
        // If user has text selected, let browser handle it normally
        if (hasTextSelection) {
            return;
        }
        // If rows are selected, copy those
        const currentSelectedRows = selectedRowsRef.current;
        if (currentSelectedRows.size > 0) {
            e.preventDefault();
            const selectedLogs = Array.from(currentSelectedRows).sort((a, b)=>a - b).map((index)=>logs[index]).filter((log)=>log !== undefined);
            const formattedText = (0, _copyHelpers.formatLogEntries)(selectedLogs);
            e.clipboardData.setData('text/plain', formattedText);
        }
    };
    // Keyboard shortcuts for selection
    (0, _react.useEffect)(()=>{
        const handleKeyDown = async (e)=>{
            // Cmd/Ctrl+A: Select all logs
            if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
                e.preventDefault();
                const allIndices = new Set(logs.map((_, index)=>index));
                setSelectedRows(allIndices);
                if (logs.length > 0) {
                    setLastSelectedIndex(logs.length - 1);
                }
            }
            // Cmd/Ctrl+C: Copy selected rows
            if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
                const selection = window.getSelection();
                const hasTextSelection = selection && selection.rangeCount > 0 && selection.toString().length > 0;
                // Only handle if we have selected rows and no text selection
                if (selectedRowsRef.current.size > 0 && !hasTextSelection) {
                    e.preventDefault();
                    const selectedLogs = Array.from(selectedRowsRef.current).sort((a, b)=>a - b).map((index)=>logs[index]).filter((log)=>log !== undefined);
                    const formattedText = (0, _copyHelpers.formatLogEntries)(selectedLogs);
                    await navigator.clipboard.writeText(formattedText);
                    showCopyPopover('full', selectedLogs.length);
                }
            }
            // Escape: Clear selection
            if (e.key === 'Escape' && selectedRows.size > 0) {
                setSelectedRows(new Set());
                setLastSelectedIndex(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return ()=>{
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [
        logs,
        selectedRows,
        showCopyPopover
    ]);
    // Cleanup timer on unmount
    (0, _react.useEffect)(()=>{
        return ()=>{
            if (copyPopoverTimerRef.current) {
                window.clearTimeout(copyPopoverTimerRef.current);
            }
        };
    }, []);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            confirmDialog,
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
                sx: {
                    height: '100%',
                    backgroundColor: theme.palette.background.default,
                    overflow: 'hidden',
                    boxShadow: theme.shadows[1],
                    display: 'flex',
                    flexDirection: 'column'
                },
                onCopy: handleCopy,
                children: [
                    !isHintsDismissed && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
                        sx: {
                            px: 2,
                            py: 0.75,
                            fontSize: '12px',
                            color: theme.palette.text.secondary,
                            backgroundColor: theme.palette.background.paper,
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            flexShrink: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
                                sx: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    flex: 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
                                        component: "span",
                                        sx: {
                                            opacity: 0.8
                                        },
                                        children: [
                                            isMac ? '⌘' : 'Ctrl',
                                            "+Click to select"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                                        component: "span",
                                        sx: {
                                            opacity: 0.6
                                        },
                                        children: "•"
                                    }),
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                                        component: "span",
                                        sx: {
                                            opacity: 0.8
                                        },
                                        children: "Shift+Click for range"
                                    }),
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                                        component: "span",
                                        sx: {
                                            opacity: 0.6
                                        },
                                        children: "•"
                                    }),
                                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
                                        component: "span",
                                        sx: {
                                            opacity: 0.8
                                        },
                                        children: [
                                            isMac ? '⌘' : 'Ctrl',
                                            "+C to copy"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                                        component: "span",
                                        sx: {
                                            opacity: 0.6
                                        },
                                        children: "•"
                                    }),
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                                        component: "span",
                                        sx: {
                                            opacity: 0.8
                                        },
                                        children: "Esc to clear"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                                size: "small",
                                onClick: handleDismissHints,
                                sx: {
                                    opacity: 0.6,
                                    '&:hover': {
                                        opacity: 1
                                    },
                                    padding: 0.5
                                },
                                "aria-label": "Dismiss hints",
                                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Close.default, {
                                    sx: {
                                        fontSize: '16px'
                                    }
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_reactvirtuoso.Virtuoso, {
                        style: {
                            height: '100%',
                            flexGrow: 1
                        },
                        initialItemCount: spec.showAll ? logs.length : undefined,
                        totalCount: logs.length,
                        itemContent: renderLogRow
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Popover, {
                        open: Boolean(copyPopoverAnchor),
                        anchorReference: "anchorPosition",
                        anchorPosition: copyPopoverAnchor ? {
                            top: copyPopoverAnchor.y,
                            left: copyPopoverAnchor.x
                        } : undefined,
                        onClose: handleCloseCopyPopover,
                        disableScrollLock: true,
                        disableAutoFocus: true,
                        disableRestoreFocus: true,
                        disableEnforceFocus: true,
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right'
                        },
                        transformOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right'
                        },
                        slotProps: {
                            paper: {
                                sx: {
                                    px: 2,
                                    py: 1.5,
                                    boxShadow: theme.shadows[8],
                                    borderRadius: 2,
                                    pointerEvents: 'auto'
                                }
                            }
                        },
                        sx: {
                            pointerEvents: 'none'
                        },
                        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
                            sx: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
                                    sx: {
                                        fontSize: '14px',
                                        color: theme.palette.text.primary,
                                        fontWeight: 500,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5
                                    },
                                    children: [
                                        "✓ Copied ",
                                        lastCopiedCount,
                                        " ",
                                        lastCopiedCount === 1 ? 'log' : 'logs',
                                        " as",
                                        ' ',
                                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                                            component: "span",
                                            sx: {
                                                color: theme.palette.primary.main,
                                                minWidth: '60px',
                                                display: 'inline-block'
                                            },
                                            children: lastCopiedFormat === 'full' ? 'Full' : lastCopiedFormat === 'message' ? 'Message' : 'JSON'
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.ButtonGroup, {
                                    size: "small",
                                    variant: "outlined",
                                    children: [
                                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                                            onClick: ()=>handleCopyInFormat('full'),
                                            sx: {
                                                fontSize: '12px',
                                                textTransform: 'none',
                                                minWidth: '52px',
                                                fontWeight: lastCopiedFormat === 'full' ? 600 : 400,
                                                bgcolor: lastCopiedFormat === 'full' ? theme.palette.action.selected : 'transparent'
                                            },
                                            children: "Full"
                                        }),
                                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                                            onClick: ()=>handleCopyInFormat('message'),
                                            sx: {
                                                fontSize: '12px',
                                                textTransform: 'none',
                                                minWidth: '74px',
                                                fontWeight: lastCopiedFormat === 'message' ? 600 : 400,
                                                bgcolor: lastCopiedFormat === 'message' ? theme.palette.action.selected : 'transparent'
                                            },
                                            children: "Message"
                                        }),
                                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                                            onClick: ()=>handleCopyInFormat('json'),
                                            sx: {
                                                fontSize: '12px',
                                                textTransform: 'none',
                                                minWidth: '52px',
                                                fontWeight: lastCopiedFormat === 'json' ? 600 : 400,
                                                bgcolor: lastCopiedFormat === 'json' ? theme.palette.action.selected : 'transparent'
                                            },
                                            children: "JSON"
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                ]
            })
        ]
    });
};
