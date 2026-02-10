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
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get DataTable () {
        return DataTable;
    },
    get bucketRangeString () {
        return bucketRangeString;
    },
    get histogramTable () {
        return histogramTable;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _dashboards = require("@perses-dev/dashboards");
const _pluginsystem = require("@perses-dev/plugin-system");
const _react = require("react");
const _EmbeddedPanel = require("./EmbeddedPanel");
const _SeriesName = require("./SeriesName");
const MAX_FORMATTABLE_SERIES = 1000;
/**
 * Build row data object from a TimeSeries, including all labels and value
 */ function buildRowData(ts) {
    return {
        ...ts.labels,
        name: ts.name,
        formattedName: ts.formattedName,
        value: ts.values?.[0]?.[1],
        timestamp: ts.values?.[0]?.[0]
    };
}
const DataTable = ({ queryResults, spec })=>{
    const allVariables = (0, _pluginsystem.useAllVariableValues)();
    const series = (0, _react.useMemo)(()=>queryResults.flatMap((d)=>d.data).flatMap((d)=>d?.series || []), [
        queryResults
    ]);
    const selectionEnabled = spec.selection?.enabled ?? false;
    const { selectionMap, setSelection, clearSelection, toggleSelection } = (0, _components.useSelection)();
    const itemActionsConfig = spec.actions ? spec.actions : undefined;
    const itemActionsListConfig = (0, _react.useMemo)(()=>itemActionsConfig?.enabled && itemActionsConfig.displayWithItem ? itemActionsConfig.actionsList : [], [
        itemActionsConfig?.enabled,
        itemActionsConfig?.displayWithItem,
        itemActionsConfig?.actionsList
    ]);
    const { getItemActionButtons, confirmDialog, actionButtons } = (0, _dashboards.useSelectionItemActions)({
        actions: itemActionsListConfig,
        variableState: allVariables
    });
    const hasItemActions = actionButtons && actionButtons.length > 0;
    const allSelected = (0, _react.useMemo)(()=>{
        if (series.length === 0) return false;
        return series.every((_, idx)=>selectionMap.has(idx.toString()));
    }, [
        series,
        selectionMap
    ]);
    // Check if some (but not all) series are selected
    const someSelected = (0, _react.useMemo)(()=>{
        if (series.length === 0) return false;
        const selectedCount = series.filter((_, idx)=>selectionMap.has(idx.toString())).length;
        return selectedCount > 0 && selectedCount < series.length;
    }, [
        series,
        selectionMap
    ]);
    const handleSelectAll = (0, _react.useCallback)(()=>{
        if (allSelected) {
            clearSelection();
        } else {
            const allItems = series.map((ts, idx)=>({
                    id: idx.toString(),
                    item: buildRowData(ts)
                }));
            setSelection(allItems);
        }
    }, [
        allSelected,
        series,
        setSelection,
        clearSelection
    ]);
    const handleRowSelectionToggle = (0, _react.useCallback)((ts, seriesIdx)=>{
        const rowData = buildRowData(ts);
        toggleSelection(rowData, seriesIdx.toString());
    }, [
        toggleSelection
    ]);
    // Memoize row data for stable references
    const rowsData = (0, _react.useMemo)(()=>{
        return series.map((ts, idx)=>({
                ts,
                idx,
                rowData: buildRowData(ts)
            }));
    }, [
        series
    ]);
    if (!queryResults || !series?.length) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
            sx: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            },
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                children: "No data"
            })
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            confirmDialog,
            series.length >= MAX_FORMATTABLE_SERIES && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Alert, {
                severity: "warning",
                children: [
                    "Showing more than ",
                    MAX_FORMATTABLE_SERIES,
                    " series, turning off label formatting for performance reasons."
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Table, {
                className: "data-table",
                children: [
                    selectionEnabled && series.length > 0 && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableHead, {
                        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.TableRow, {
                            children: [
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                                    padding: "checkbox",
                                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Checkbox, {
                                        indeterminate: someSelected,
                                        checked: allSelected,
                                        onChange: handleSelectAll,
                                        inputProps: {
                                            'aria-label': 'select all series'
                                        }
                                    })
                                }),
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                                    children: "Series"
                                }),
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                                    children: "Value"
                                }),
                                hasItemActions && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                                    children: "Actions"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableBody, {
                        children: rowsData.map(({ ts, idx, rowData })=>{
                            const displayTimeStamps = (ts.values?.length ?? 0) > 1;
                            const valuesAndTimes = ts.values ? ts.values.map((v, valIdx)=>/*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                                    children: [
                                        v[1],
                                        " ",
                                        displayTimeStamps && /*#__PURE__*/ (0, _jsxruntime.jsxs)("span", {
                                            children: [
                                                "@",
                                                v[0]
                                            ]
                                        })
                                    ]
                                }, valIdx)) : [];
                            let histogramsAndTimes = null;
                            if (ts.histograms && ts.histograms.length > 0) {
                                const seriesQueryResult = {
                                    ...queryResults[0],
                                    data: {
                                        ...queryResults[0].data,
                                        series: [
                                            queryResults[0].data.series[idx]
                                        ]
                                    }
                                };
                                histogramsAndTimes = ts.histograms.map((h, hisIdx)=>/*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                                        alignItems: "center",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                                                width: 400,
                                                height: 200,
                                                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_EmbeddedPanel.EmbeddedPanel, {
                                                    kind: "HistogramChart",
                                                    spec: {
                                                        unit: 'decimal',
                                                        width: 400,
                                                        height: 200
                                                    },
                                                    queryResults: [
                                                        seriesQueryResult
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                width: "100%",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                                                        children: [
                                                            "Total count: ",
                                                            h[1].count
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                                                        children: [
                                                            "Sum: ",
                                                            h[1].sum
                                                        ]
                                                    })
                                                ]
                                            }),
                                            histogramTable(h[1])
                                        ]
                                    }, -hisIdx));
                            }
                            const rowId = idx.toString();
                            const isSelected = selectionMap.has(rowId);
                            const isFormatted = series.length < MAX_FORMATTABLE_SERIES;
                            return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.TableRow, {
                                style: {
                                    whiteSpace: 'pre'
                                },
                                children: [
                                    selectionEnabled && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                                        padding: "checkbox",
                                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Checkbox, {
                                            checked: isSelected,
                                            onChange: ()=>handleRowSelectionToggle(ts, idx),
                                            inputProps: {
                                                'aria-label': `select series ${idx}`
                                            }
                                        })
                                    }),
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_SeriesName.SeriesName, {
                                            name: ts.name,
                                            formattedName: ts.formattedName,
                                            labels: ts.labels,
                                            isFormatted: isFormatted
                                        })
                                    }),
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                                        children: ts.histograms ? histogramsAndTimes : valuesAndTimes
                                    }),
                                    hasItemActions && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                                            sx: {
                                                display: 'flex',
                                                gap: 1
                                            },
                                            children: getItemActionButtons({
                                                id: rowId,
                                                data: rowData
                                            })
                                        })
                                    })
                                ]
                            }, idx);
                        })
                    })
                ]
            })
        ]
    });
};
const leftDelim = (br)=>br === 3 || br === 1 ? '[' : '(';
const rightDelim = (br)=>br === 3 || br === 0 ? ']' : ')';
const bucketRangeString = ([boundaryRule, leftBoundary, rightBoundary])=>{
    return `${leftDelim(boundaryRule)}${leftBoundary} -> ${rightBoundary}${rightDelim(boundaryRule)}`;
};
const histogramTable = (h)=>/*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Table, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableHead, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableRow, {
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                        style: {
                            textAlign: 'center'
                        },
                        colSpan: 2,
                        children: "Histogram Sample"
                    })
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.TableBody, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.TableRow, {
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                                children: "Range"
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                                children: "Count"
                            })
                        ]
                    }),
                    h.buckets?.map((b, i)=>/*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.TableRow, {
                            children: [
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                                    children: bucketRangeString(b)
                                }),
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                                    children: b[3]
                                })
                            ]
                        }, i))
                ]
            })
        ]
    });
