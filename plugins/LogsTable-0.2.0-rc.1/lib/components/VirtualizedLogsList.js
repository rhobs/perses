import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Box, useTheme, Popover, Button, ButtonGroup, IconButton } from '@mui/material';
import CloseIcon from 'mdi-material-ui/Close';
import { Virtuoso } from 'react-virtuoso';
import { useSelection } from '@perses-dev/components';
import { useSelectionItemActions } from '@perses-dev/dashboards';
import { useAllVariableValues } from '@perses-dev/plugin-system';
import { formatLogEntries, formatLogMessage } from '../utils/copyHelpers';
import { LogRow } from './LogRow';
const PERSES_LOGSTABLE_HINTS_DISMISSED = 'PERSES_LOGSTABLE_HINTS_DISMISSED';
const COPY_TOAST_DURATION_MS = 5000;
// Detect Mac for keyboard shortcuts display
const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
export const VirtualizedLogsList = ({ logs, spec, expandedRows, onToggleExpand })=>{
    const theme = useTheme();
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [lastSelectedIndex, setLastSelectedIndex] = useState(null);
    const selectedRowsRef = useRef(selectedRows);
    const [copyPopoverAnchor, setCopyPopoverAnchor] = useState(null);
    const [lastCopiedFormat, setLastCopiedFormat] = useState('full');
    const [lastCopiedCount, setLastCopiedCount] = useState(0);
    const copyPopoverTimerRef = useRef(null);
    const [isHintsDismissed, setIsHintsDismissed] = useState(()=>{
        try {
            return localStorage.getItem(PERSES_LOGSTABLE_HINTS_DISMISSED) === 'true';
        } catch  {
            return false;
        }
    });
    const selectionEnabled = spec.selection?.enabled ?? false;
    const { setSelection, clearSelection } = useSelection();
    const allVariables = useAllVariableValues();
    const itemActionsConfig = spec.actions ? spec.actions : undefined;
    const itemActionsListConfig = itemActionsConfig?.enabled && itemActionsConfig.displayWithItem ? itemActionsConfig.actionsList : [];
    const { getItemActionButtons, confirmDialog } = useSelectionItemActions({
        actions: itemActionsListConfig,
        variableState: allVariables
    });
    useEffect(()=>{
        selectedRowsRef.current = selectedRows;
    }, [
        selectedRows
    ]);
    // Sync local selection state with context when selection is enabled
    useEffect(()=>{
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
    const handleDismissHints = useCallback(()=>{
        setIsHintsDismissed(true);
        try {
            localStorage.setItem(PERSES_LOGSTABLE_HINTS_DISMISSED, 'true');
        } catch  {
        // Ignore localStorage errors
        }
    }, []);
    const showCopyPopover = useCallback((format = 'full', count)=>{
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
    const handleCloseCopyPopover = useCallback(()=>{
        if (copyPopoverTimerRef.current) {
            window.clearTimeout(copyPopoverTimerRef.current);
        }
        setCopyPopoverAnchor(null);
    }, []);
    const handleCopyInFormat = useCallback(async (format)=>{
        const selectedLogs = Array.from(selectedRowsRef.current).sort((a, b)=>a - b).map((index)=>logs[index]).filter((log)=>log !== undefined);
        let text;
        if (format === 'message') {
            text = selectedLogs.map(formatLogMessage).join('\n');
        } else if (format === 'json') {
            text = JSON.stringify(selectedLogs, null, 2);
        } else {
            text = formatLogEntries(selectedLogs);
        }
        await navigator.clipboard.writeText(text);
        showCopyPopover(format, selectedLogs.length);
    }, [
        logs,
        showCopyPopover
    ]);
    const handleRowSelect = useCallback((index, event)=>{
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
        return /*#__PURE__*/ _jsx(LogRow, {
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
            const formattedText = formatLogEntries(selectedLogs);
            e.clipboardData.setData('text/plain', formattedText);
        }
    };
    // Keyboard shortcuts for selection
    useEffect(()=>{
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
                    const formattedText = formatLogEntries(selectedLogs);
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
    useEffect(()=>{
        return ()=>{
            if (copyPopoverTimerRef.current) {
                window.clearTimeout(copyPopoverTimerRef.current);
            }
        };
    }, []);
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            confirmDialog,
            /*#__PURE__*/ _jsxs(Box, {
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
                    !isHintsDismissed && /*#__PURE__*/ _jsxs(Box, {
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
                            /*#__PURE__*/ _jsxs(Box, {
                                sx: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    flex: 1
                                },
                                children: [
                                    /*#__PURE__*/ _jsxs(Box, {
                                        component: "span",
                                        sx: {
                                            opacity: 0.8
                                        },
                                        children: [
                                            isMac ? '⌘' : 'Ctrl',
                                            "+Click to select"
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsx(Box, {
                                        component: "span",
                                        sx: {
                                            opacity: 0.6
                                        },
                                        children: "•"
                                    }),
                                    /*#__PURE__*/ _jsx(Box, {
                                        component: "span",
                                        sx: {
                                            opacity: 0.8
                                        },
                                        children: "Shift+Click for range"
                                    }),
                                    /*#__PURE__*/ _jsx(Box, {
                                        component: "span",
                                        sx: {
                                            opacity: 0.6
                                        },
                                        children: "•"
                                    }),
                                    /*#__PURE__*/ _jsxs(Box, {
                                        component: "span",
                                        sx: {
                                            opacity: 0.8
                                        },
                                        children: [
                                            isMac ? '⌘' : 'Ctrl',
                                            "+C to copy"
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsx(Box, {
                                        component: "span",
                                        sx: {
                                            opacity: 0.6
                                        },
                                        children: "•"
                                    }),
                                    /*#__PURE__*/ _jsx(Box, {
                                        component: "span",
                                        sx: {
                                            opacity: 0.8
                                        },
                                        children: "Esc to clear"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ _jsx(IconButton, {
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
                                children: /*#__PURE__*/ _jsx(CloseIcon, {
                                    sx: {
                                        fontSize: '16px'
                                    }
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsx(Virtuoso, {
                        style: {
                            height: '100%',
                            flexGrow: 1
                        },
                        initialItemCount: spec.showAll ? logs.length : undefined,
                        totalCount: logs.length,
                        itemContent: renderLogRow
                    }),
                    /*#__PURE__*/ _jsx(Popover, {
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
                        children: /*#__PURE__*/ _jsxs(Box, {
                            sx: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2
                            },
                            children: [
                                /*#__PURE__*/ _jsxs(Box, {
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
                                        /*#__PURE__*/ _jsx(Box, {
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
                                /*#__PURE__*/ _jsxs(ButtonGroup, {
                                    size: "small",
                                    variant: "outlined",
                                    children: [
                                        /*#__PURE__*/ _jsx(Button, {
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
                                        /*#__PURE__*/ _jsx(Button, {
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
                                        /*#__PURE__*/ _jsx(Button, {
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

//# sourceMappingURL=VirtualizedLogsList.js.map