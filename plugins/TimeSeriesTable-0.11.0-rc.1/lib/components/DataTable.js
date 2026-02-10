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
import { Alert, Box, Checkbox, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useSelection } from '@perses-dev/components';
import { useSelectionItemActions } from '@perses-dev/dashboards';
import { useAllVariableValues } from '@perses-dev/plugin-system';
import { useCallback, useMemo } from 'react';
import { EmbeddedPanel } from './EmbeddedPanel';
import { SeriesName } from './SeriesName';
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
/**
 * Designed to display timeseries data in a prometheus like table format.
 * The first column will contain the metric name and label combination, and the second column will contain the values.
 * This is inspired by prometheus DataTable.
 * https://github.com/prometheus/prometheus/blob/2524a915915d7eb1b1207152d2e0ce5771193404/web/ui/react-app/src/pages/graph/DataTable.tsx
 * @param result timeseries query result
 * @constructor
 */ export const DataTable = ({ queryResults, spec })=>{
    const allVariables = useAllVariableValues();
    const series = useMemo(()=>queryResults.flatMap((d)=>d.data).flatMap((d)=>d?.series || []), [
        queryResults
    ]);
    const selectionEnabled = spec.selection?.enabled ?? false;
    const { selectionMap, setSelection, clearSelection, toggleSelection } = useSelection();
    const itemActionsConfig = spec.actions ? spec.actions : undefined;
    const itemActionsListConfig = useMemo(()=>itemActionsConfig?.enabled && itemActionsConfig.displayWithItem ? itemActionsConfig.actionsList : [], [
        itemActionsConfig?.enabled,
        itemActionsConfig?.displayWithItem,
        itemActionsConfig?.actionsList
    ]);
    const { getItemActionButtons, confirmDialog, actionButtons } = useSelectionItemActions({
        actions: itemActionsListConfig,
        variableState: allVariables
    });
    const hasItemActions = actionButtons && actionButtons.length > 0;
    const allSelected = useMemo(()=>{
        if (series.length === 0) return false;
        return series.every((_, idx)=>selectionMap.has(idx.toString()));
    }, [
        series,
        selectionMap
    ]);
    // Check if some (but not all) series are selected
    const someSelected = useMemo(()=>{
        if (series.length === 0) return false;
        const selectedCount = series.filter((_, idx)=>selectionMap.has(idx.toString())).length;
        return selectedCount > 0 && selectedCount < series.length;
    }, [
        series,
        selectionMap
    ]);
    const handleSelectAll = useCallback(()=>{
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
    const handleRowSelectionToggle = useCallback((ts, seriesIdx)=>{
        const rowData = buildRowData(ts);
        toggleSelection(rowData, seriesIdx.toString());
    }, [
        toggleSelection
    ]);
    // Memoize row data for stable references
    const rowsData = useMemo(()=>{
        return series.map((ts, idx)=>({
                ts,
                idx,
                rowData: buildRowData(ts)
            }));
    }, [
        series
    ]);
    if (!queryResults || !series?.length) {
        return /*#__PURE__*/ _jsx(Box, {
            sx: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            },
            children: /*#__PURE__*/ _jsx(Typography, {
                children: "No data"
            })
        });
    }
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            confirmDialog,
            series.length >= MAX_FORMATTABLE_SERIES && /*#__PURE__*/ _jsxs(Alert, {
                severity: "warning",
                children: [
                    "Showing more than ",
                    MAX_FORMATTABLE_SERIES,
                    " series, turning off label formatting for performance reasons."
                ]
            }),
            /*#__PURE__*/ _jsxs(Table, {
                className: "data-table",
                children: [
                    selectionEnabled && series.length > 0 && /*#__PURE__*/ _jsx(TableHead, {
                        children: /*#__PURE__*/ _jsxs(TableRow, {
                            children: [
                                /*#__PURE__*/ _jsx(TableCell, {
                                    padding: "checkbox",
                                    children: /*#__PURE__*/ _jsx(Checkbox, {
                                        indeterminate: someSelected,
                                        checked: allSelected,
                                        onChange: handleSelectAll,
                                        inputProps: {
                                            'aria-label': 'select all series'
                                        }
                                    })
                                }),
                                /*#__PURE__*/ _jsx(TableCell, {
                                    children: "Series"
                                }),
                                /*#__PURE__*/ _jsx(TableCell, {
                                    children: "Value"
                                }),
                                hasItemActions && /*#__PURE__*/ _jsx(TableCell, {
                                    children: "Actions"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ _jsx(TableBody, {
                        children: rowsData.map(({ ts, idx, rowData })=>{
                            const displayTimeStamps = (ts.values?.length ?? 0) > 1;
                            const valuesAndTimes = ts.values ? ts.values.map((v, valIdx)=>/*#__PURE__*/ _jsxs(Typography, {
                                    children: [
                                        v[1],
                                        " ",
                                        displayTimeStamps && /*#__PURE__*/ _jsxs("span", {
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
                                histogramsAndTimes = ts.histograms.map((h, hisIdx)=>/*#__PURE__*/ _jsxs(Stack, {
                                        alignItems: "center",
                                        children: [
                                            /*#__PURE__*/ _jsx(Box, {
                                                width: 400,
                                                height: 200,
                                                children: /*#__PURE__*/ _jsx(EmbeddedPanel, {
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
                                            /*#__PURE__*/ _jsxs(Stack, {
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                width: "100%",
                                                children: [
                                                    /*#__PURE__*/ _jsxs(Typography, {
                                                        children: [
                                                            "Total count: ",
                                                            h[1].count
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ _jsxs(Typography, {
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
                            return /*#__PURE__*/ _jsxs(TableRow, {
                                style: {
                                    whiteSpace: 'pre'
                                },
                                children: [
                                    selectionEnabled && /*#__PURE__*/ _jsx(TableCell, {
                                        padding: "checkbox",
                                        children: /*#__PURE__*/ _jsx(Checkbox, {
                                            checked: isSelected,
                                            onChange: ()=>handleRowSelectionToggle(ts, idx),
                                            inputProps: {
                                                'aria-label': `select series ${idx}`
                                            }
                                        })
                                    }),
                                    /*#__PURE__*/ _jsx(TableCell, {
                                        children: /*#__PURE__*/ _jsx(SeriesName, {
                                            name: ts.name,
                                            formattedName: ts.formattedName,
                                            labels: ts.labels,
                                            isFormatted: isFormatted
                                        })
                                    }),
                                    /*#__PURE__*/ _jsx(TableCell, {
                                        children: ts.histograms ? histogramsAndTimes : valuesAndTimes
                                    }),
                                    hasItemActions && /*#__PURE__*/ _jsx(TableCell, {
                                        children: /*#__PURE__*/ _jsx(Box, {
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
export const bucketRangeString = ([boundaryRule, leftBoundary, rightBoundary])=>{
    return `${leftDelim(boundaryRule)}${leftBoundary} -> ${rightBoundary}${rightDelim(boundaryRule)}`;
};
export const histogramTable = (h)=>/*#__PURE__*/ _jsxs(Table, {
        children: [
            /*#__PURE__*/ _jsx(TableHead, {
                children: /*#__PURE__*/ _jsx(TableRow, {
                    children: /*#__PURE__*/ _jsx(TableCell, {
                        style: {
                            textAlign: 'center'
                        },
                        colSpan: 2,
                        children: "Histogram Sample"
                    })
                })
            }),
            /*#__PURE__*/ _jsxs(TableBody, {
                children: [
                    /*#__PURE__*/ _jsxs(TableRow, {
                        children: [
                            /*#__PURE__*/ _jsx(TableCell, {
                                children: "Range"
                            }),
                            /*#__PURE__*/ _jsx(TableCell, {
                                children: "Count"
                            })
                        ]
                    }),
                    h.buckets?.map((b, i)=>/*#__PURE__*/ _jsxs(TableRow, {
                            children: [
                                /*#__PURE__*/ _jsx(TableCell, {
                                    children: bucketRangeString(b)
                                }),
                                /*#__PURE__*/ _jsx(TableCell, {
                                    children: b[3]
                                })
                            ]
                        }, i))
                ]
            })
        ]
    });

//# sourceMappingURL=DataTable.js.map