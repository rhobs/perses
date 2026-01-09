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
    get TablePanel () {
        return TablePanel;
    },
    get getTablePanelQueryOptions () {
        return getTablePanelQueryOptions;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _components = require("@perses-dev/components");
const _react = require("react");
const _core = require("@perses-dev/core");
const _material = require("@mui/material");
const _models = require("../models");
const _EmbeddedPanel = require("./EmbeddedPanel");
function generateCellContentConfig(column) {
    const plugin = column.plugin;
    if (plugin !== undefined) {
        return {
            cell: (ctx)=>{
                const panelData = ctx.getValue();
                if (!panelData) return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {});
                return /*#__PURE__*/ (0, _jsxruntime.jsx)(_EmbeddedPanel.EmbeddedPanel, {
                    kind: plugin.kind,
                    spec: plugin.spec,
                    queryResults: [
                        panelData
                    ]
                });
            },
            cellDescription: column.cellDescription ? ()=>`${column.cellDescription}` : ()=>''
        };
    }
    return {
        cell: (ctx)=>{
            const cellValue = ctx.getValue();
            return typeof cellValue === 'number' && column.format ? (0, _core.formatValue)(cellValue, column.format) : cellValue;
        },
        cellDescription: column.cellDescription ? ()=>`${column.cellDescription}` : undefined
    };
}
function ColumnFilterDropdown({ allValues, selectedValues, onFilterChange, theme }) {
    const values = [
        ...new Set(allValues)
    ].filter((v)=>v != null).sort();
    if (values.length === 0) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
            "data-filter-dropdown": true,
            style: {
                width: 200,
                padding: 10,
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 4,
                boxShadow: theme.shadows[4]
            },
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                style: {
                    color: theme.palette.text.secondary,
                    fontSize: 14
                },
                children: "No values found"
            })
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
        "data-filter-dropdown": true,
        style: {
            width: 200,
            padding: 10,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 4,
            boxShadow: theme.shadows[4],
            maxHeight: 250,
            overflowY: 'auto'
        },
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                style: {
                    marginBottom: 8,
                    fontSize: 14,
                    fontWeight: 'bold'
                },
                children: /*#__PURE__*/ (0, _jsxruntime.jsxs)("label", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer'
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)("input", {
                            type: "checkbox",
                            checked: selectedValues.length === values.length && values.length > 0,
                            onChange: (e)=>onFilterChange(e.target.checked ? values : []),
                            style: {
                                marginRight: 8
                            }
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsxs)("span", {
                            style: {
                                color: theme.palette.text.primary
                            },
                            children: [
                                "Select All (",
                                values.length,
                                ")"
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)("hr", {
                style: {
                    margin: '8px 0',
                    border: 'none',
                    borderTop: `1px solid ${theme.palette.divider}`
                }
            }),
            values.map((value, index)=>/*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                    style: {
                        marginBottom: 4
                    },
                    children: /*#__PURE__*/ (0, _jsxruntime.jsxs)("label", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            padding: '2px 0',
                            borderRadius: 2
                        },
                        onMouseEnter: (e)=>{
                            e.currentTarget.style.backgroundColor = theme.palette.action.hover;
                        },
                        onMouseLeave: (e)=>{
                            e.currentTarget.style.backgroundColor = 'transparent';
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)("input", {
                                type: "checkbox",
                                checked: selectedValues.includes(value),
                                onChange: (e)=>{
                                    if (e.target.checked) {
                                        onFilterChange([
                                            ...selectedValues,
                                            value
                                        ]);
                                    } else {
                                        onFilterChange(selectedValues.filter((v)=>v !== value));
                                    }
                                },
                                style: {
                                    marginRight: 8
                                }
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                style: {
                                    fontSize: 14,
                                    color: theme.palette.text.primary
                                },
                                children: value === null || value === undefined || value === '' ? '(empty)' : String(value)
                            })
                        ]
                    })
                }, `value-${index}`))
        ]
    });
}
/*
 * Generate column config from column definitions, if a column has multiple definitions, the first one will be used.
 * If column is hidden, return undefined.
 * If column do not have a definition, return a default column config.
 */ function generateColumnConfig(name, columnSettings) {
    for (const column of columnSettings){
        if (column.name === name) {
            if (column.hide) {
                return undefined;
            }
            const { name, header, headerDescription, enableSorting, width, align, dataLink } = column;
            return {
                accessorKey: name,
                header: header ?? name,
                headerDescription,
                enableSorting,
                width,
                align,
                dataLink,
                ...generateCellContentConfig(column)
            };
        }
    }
    return {
        accessorKey: name,
        header: name
    };
}
function getTablePanelQueryOptions(spec) {
    // if any cell renders a panel plugin, perform a range query instead of an instant query
    return {
        mode: (spec.columnSettings ?? []).some((c)=>c.plugin) ? 'range' : 'instant'
    };
}
function TablePanel({ contentDimensions, spec, queryResults }) {
    const theme = (0, _material.useTheme)();
    // TODO: handle other query types
    const queryMode = getTablePanelQueryOptions(spec).mode;
    const rawData = (0, _react.useMemo)(()=>{
        // Transform query results to a tabular format:
        // [ { timestamp: 123, value: 456, labelName1: labelValue1 }, ... ]
        return queryResults.flatMap((data, queryIndex)=>data.data.series.map((ts)=>({
                    data,
                    ts,
                    queryIndex
                }))).map(({ data, ts, queryIndex })=>{
            if (ts.values[0] === undefined) {
                return {
                    ...ts.labels
                };
            }
            // If there are multiple queries, we need to add the query index to the value key and label key to avoid conflicts
            const valueColumnName = queryResults.length === 1 ? 'value' : `value #${queryIndex + 1}`;
            const labels = queryResults.length === 1 ? ts.labels : Object.entries(ts.labels ?? {}).reduce((acc, [key, value])=>{
                if (key) acc[`${key} #${queryIndex + 1}`] = value;
                return acc;
            }, {});
            // If the cell visualization is a panel plugin, filter the data by the current series
            const columnValue = (spec.columnSettings ?? []).find((x)=>x.name === valueColumnName)?.plugin ? {
                ...data,
                data: {
                    ...data.data,
                    series: data.data.series.filter((s)=>s === ts)
                }
            } : ts.values[0][1];
            if (queryMode === 'instant') {
                // Timestamp is not indexed as it will be the same for all queries
                return {
                    timestamp: ts.values[0][0],
                    [valueColumnName]: columnValue,
                    ...labels
                };
            } else {
                // Don't add a timestamp for range queries
                return {
                    [valueColumnName]: columnValue,
                    ...labels
                };
            }
        });
    }, [
        queryResults,
        queryMode,
        spec.columnSettings
    ]);
    // Transform will be applied by their orders on the original data
    const data = (0, _core.transformData)(rawData, spec.transforms ?? []);
    const keys = (0, _react.useMemo)(()=>{
        const result = [];
        for (const entry of data){
            for (const key of Object.keys(entry)){
                if (!result.includes(key)) {
                    result.push(key);
                }
            }
        }
        return result;
    }, [
        data
    ]);
    // fetch unique values for each column of filtering
    const columnUniqueValues = (0, _react.useMemo)(()=>{
        const uniqueValues = {};
        keys.forEach((key)=>{
            const values = data.map((row)=>row[key]).filter((val)=>val !== null && val !== undefined && val !== '');
            uniqueValues[key] = Array.from(new Set(values));
        });
        return uniqueValues;
    }, [
        data,
        keys
    ]);
    // Generate columns and map each column accessor to its settings index and data key
    const columns = (0, _react.useMemo)(()=>{
        const columns = [];
        const customizedColumns = new Set();
        // Process columnSettings if they exist
        for (const columnSetting of spec.columnSettings ?? []){
            if (customizedColumns.has(columnSetting.name)) continue; // Skip duplicates
            const columnConfig = generateColumnConfig(columnSetting.name, spec.columnSettings ?? []);
            if (columnConfig !== undefined) {
                columns.push(columnConfig);
                customizedColumns.add(columnSetting.name);
            }
        }
        // Add remaining columns if defaultColumnHidden is false
        if (!spec.defaultColumnHidden) {
            for (const key of keys){
                if (!customizedColumns.has(key)) {
                    const columnConfig = generateColumnConfig(key, spec.columnSettings ?? []);
                    if (columnConfig !== undefined) {
                        columns.push(columnConfig);
                    }
                }
            }
        }
        return columns;
    }, [
        keys,
        spec.columnSettings,
        spec.defaultColumnHidden
    ]);
    // Generate cell settings that will be used by the table to render cells (text color, background color, ...)
    const cellConfigs = (0, _react.useMemo)(()=>{
        // If there are no cell settings globally or per column, return an empty object
        if (spec.cellSettings === undefined && !spec.columnSettings?.some((col)=>col.cellSettings !== undefined)) {
            return {};
        }
        const result = {};
        let index = 0;
        for (const row of data){
            // Transforming key to object to extend the row with undefined values if the key is not present
            // for checking the cell config "Misc" condition with "null"
            const keysAsObj = keys.reduce((acc, key)=>{
                acc[key] = undefined;
                return acc;
            }, {});
            const extendRow = {
                ...keysAsObj,
                ...row
            };
            // Generate cellConfigs for each column (including duplicates with different headers)
            for (const [key, value] of Object.entries(extendRow)){
                // First, try to get cell config from global cell settings
                let cellConfig = (0, _models.evaluateConditionalFormatting)(value, spec.cellSettings ?? []);
                // Then, try to get cell config from column-specific cell settings
                const columnSetting = spec.columnSettings?.find((col)=>col.name === key);
                if (columnSetting?.cellSettings?.length) {
                    const columnCellConfig = (0, _models.evaluateConditionalFormatting)(value, columnSetting.cellSettings);
                    // Column-specific settings take precedence over global settings
                    if (columnCellConfig) {
                        cellConfig = columnCellConfig;
                    }
                }
                if (cellConfig) {
                    result[`${index}_${key}`] = cellConfig;
                }
            }
            index++;
        }
        return result;
    }, [
        data,
        keys,
        spec.cellSettings,
        spec.columnSettings
    ]);
    function generateDefaultSortingState() {
        return spec.columnSettings?.filter((column)=>column.sort !== undefined).map((column)=>{
            return {
                id: column.name,
                desc: column.sort === 'desc'
            };
        }) ?? [];
    }
    const [sorting, setSorting] = (0, _react.useState)(generateDefaultSortingState());
    // Filtering state
    const [columnFilters, setColumnFilters] = (0, _react.useState)([]);
    const [filterAnchorEl, setFilterAnchorEl] = (0, _react.useState)({});
    const [openFilterColumn, setOpenFilterColumn] = (0, _react.useState)(null);
    // get selected values for a column
    const getSelectedFilterValues = (columnId)=>{
        const filter = columnFilters.find((f)=>f.id === columnId);
        return filter ? filter.value : [];
    };
    // update column filter
    const updateColumnFilter = (columnId, values)=>{
        const newFilters = columnFilters.filter((f)=>f.id !== columnId);
        if (values.length > 0) {
            newFilters.push({
                id: columnId,
                value: values
            });
        }
        setColumnFilters(newFilters);
    };
    // Handle filter clicks
    const handleFilterClick = (event, columnId)=>{
        event.preventDefault();
        event.stopPropagation();
        setFilterAnchorEl({
            ...filterAnchorEl,
            [columnId]: event.currentTarget
        });
        setOpenFilterColumn(columnId);
    };
    const handleFilterClose = ()=>{
        setFilterAnchorEl({});
        setOpenFilterColumn(null);
    };
    // Close filter when clicking outside
    (0, _react.useEffect)(()=>{
        if (!openFilterColumn) return;
        const handleClick = (e)=>{
            const target = e.target;
            if (!target.closest('[data-filter-dropdown]') && !target.closest('button')) {
                handleFilterClose();
            }
        };
        const timer = setTimeout(()=>{
            document.addEventListener('click', handleClick);
        }, 100);
        return ()=>{
            clearTimeout(timer);
            document.removeEventListener('click', handleClick);
        };
    }, [
        openFilterColumn
    ]);
    // filter data based on the current filters
    const filteredData = (0, _react.useMemo)(()=>{
        let filtered = [
            ...data
        ];
        // apply column filters if enabled
        if (spec.enableFiltering && columnFilters.length > 0) {
            filtered = filtered.filter((row)=>{
                return columnFilters.every((filter)=>{
                    const value = row[filter.id];
                    const filterValues = filter.value;
                    if (!filterValues || filterValues.length === 0) return true; // No filter values means no filtering
                    // Check if the row value is in the selected filter values
                    return filterValues.includes(value);
                });
            });
        }
        return filtered;
    }, [
        data,
        columnFilters,
        spec.enableFiltering
    ]);
    const [pagination, setPagination] = (0, _react.useState)(spec.pagination ? {
        pageIndex: 0,
        pageSize: 10
    } : undefined);
    (0, _react.useEffect)(()=>{
        // If the pagination setting changes from no pagination to pagination, but the pagination state is undefined, update the pagination state
        if (spec.pagination && !pagination) {
            setPagination({
                pageIndex: 0,
                pageSize: 10
            });
        } else if (!spec.pagination && pagination) {
            setPagination(undefined);
        }
    }, [
        spec.pagination,
        pagination
    ]);
    if (contentDimensions === undefined) {
        return null;
    }
    if (!data?.length) {
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
            spec.enableFiltering && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                style: {
                    display: 'flex',
                    background: theme.palette.background.default,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    width: contentDimensions.width,
                    boxSizing: 'border-box'
                },
                children: columns.map((column, idx)=>{
                    const filters = getSelectedFilterValues(column.accessorKey);
                    const columnWidth = column.width || spec.defaultColumnWidth;
                    return /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                        style: {
                            padding: '8px',
                            borderRight: idx < columns.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
                            width: columnWidth,
                            minWidth: columnWidth,
                            maxWidth: columnWidth,
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                            boxSizing: 'border-box',
                            flex: typeof columnWidth === 'number' ? 'none' : '1 1 auto'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                style: {
                                    marginRight: 8,
                                    fontSize: '12px',
                                    color: theme.palette.text.secondary,
                                    flex: 1,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                },
                                children: filters.length ? `${filters.length} items` : 'All'
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)("button", {
                                onClick: (e)=>{
                                    handleFilterClick(e, column.accessorKey);
                                },
                                style: {
                                    border: `1px solid ${theme.palette.divider}`,
                                    background: theme.palette.background.paper,
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    color: filters.length ? theme.palette.primary.main : theme.palette.text.secondary,
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    minWidth: '20px',
                                    height: '24px',
                                    flexShrink: 0,
                                    transition: 'all 0.2s ease'
                                },
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.background = theme.palette.action.hover;
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.background = theme.palette.background.paper;
                                },
                                type: "button",
                                children: "▼"
                            }),
                            openFilterColumn === column.accessorKey && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                                style: {
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    zIndex: 1000,
                                    marginTop: 4
                                },
                                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(ColumnFilterDropdown, {
                                    allValues: columnUniqueValues[column.accessorKey] || [],
                                    selectedValues: filters,
                                    onFilterChange: (values)=>updateColumnFilter(column.accessorKey, values),
                                    theme: theme
                                })
                            })
                        ]
                    }, `filter-${idx}`);
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.Table, {
                data: filteredData,
                columns: columns,
                cellConfigs: cellConfigs,
                height: spec.enableFiltering ? contentDimensions.height - 40 : contentDimensions.height,
                width: contentDimensions.width,
                density: spec.density,
                defaultColumnWidth: spec.defaultColumnWidth,
                defaultColumnHeight: spec.defaultColumnHeight,
                sorting: sorting,
                onSortingChange: setSorting,
                pagination: pagination,
                onPaginationChange: setPagination
            })
        ]
    });
}
