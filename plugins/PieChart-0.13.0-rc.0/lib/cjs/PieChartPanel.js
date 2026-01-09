//Copyright 2024 The Perses Authors
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
Object.defineProperty(exports, "PieChartPanel", {
    enumerable: true,
    get: function() {
        return PieChartPanel;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _core = require("@perses-dev/core");
const _pluginsystem = require("@perses-dev/plugin-system");
const _merge = /*#__PURE__*/ _interop_require_default(require("lodash/merge"));
const _react = require("react");
const _utils = require("./utils");
const _colors = require("./colors");
const _PieChartBase = require("./PieChartBase");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function PieChartPanel(props) {
    const { spec: { calculation, sort, mode, legend: pieChartLegend, colorPalette: colorPalette }, contentDimensions, queryResults } = props;
    const chartsTheme = (0, _components.useChartsTheme)();
    const chartId = (0, _components.useId)('time-series-panel');
    const seriesNames = queryResults.flatMap((result)=>result?.data.series?.map((series)=>series.name) || []);
    // Memoize the color list so it only regenerates when color/palette/series count changes
    const colorList = (0, _react.useMemo)(()=>{
        return (0, _colors.getSeriesColor)(seriesNames, colorPalette);
    }, [
        colorPalette,
        seriesNames
    ]);
    const { pieChartData, legendItems, legendColumns } = (0, _react.useMemo)(()=>{
        const calculate = _core.CalculationsMap[calculation];
        const pieChartData = [];
        const legendItems = [];
        const legendColumns = [];
        queryResults.forEach((result, queryIndex)=>{
            const series = result?.data.series ?? [];
            series.forEach((seriesData, seriesIndex)=>{
                const seriesId = `${chartId}${seriesData.name}${seriesIndex}${queryIndex}`;
                const seriesColor = colorList[queryIndex * series.length + seriesIndex] ?? '#ff0000';
                const seriesItem = {
                    id: seriesId,
                    value: calculate(seriesData.values) ?? null,
                    name: seriesData.formattedName ?? '',
                    itemStyle: {
                        color: seriesColor
                    }
                };
                pieChartData.push(seriesItem);
                legendItems.push({
                    id: seriesId,
                    label: seriesData.formattedName ?? '',
                    color: seriesColor,
                    data: {}
                });
            });
        });
        const sortedPieChartData = (0, _utils.sortSeriesData)(pieChartData, sort);
        // Reorder legend items to reflect the current sorting order of series
        const valueById = new Map(sortedPieChartData.map((pd)=>[
                pd.id ?? pd.name,
                pd.value ?? 0
            ]));
        legendItems.sort((a, b)=>{
            const av = valueById.get(a.id) ?? 0;
            const bv = valueById.get(b.id) ?? 0;
            return sort === 'asc' ? av - bv : bv - av;
        });
        if (pieChartLegend?.values?.length && pieChartLegend?.mode === 'table') {
            const { values } = pieChartLegend;
            [
                ...values
            ].sort().forEach((v)=>{
                /* First, create a column for the current legend value */ legendColumns.push({
                    accessorKey: `data.${v}`,
                    header: _pluginsystem.comparisonLegends[v]?.label || v,
                    headerDescription: _pluginsystem.comparisonLegends[v]?.description,
                    width: 90,
                    align: 'right',
                    cellDescription: true,
                    enableSorting: true
                });
                /* Then, settle the legend items related to this legend value */ switch(v){
                    case 'abs':
                        legendItems.forEach((li)=>{
                            const { value: itemAbsoluteValue } = pieChartData.find((pd)=>li.id === pd.id) || {};
                            if (typeof itemAbsoluteValue === 'number' && li.data) {
                                li.data['abs'] = itemAbsoluteValue;
                            }
                        });
                        break;
                    case 'relative':
                        legendItems.forEach((li)=>{
                            const { value: itemPercentageValue } = (0, _utils.calculatePercentages)(sortedPieChartData).find((ppd)=>li.id === ppd.id) || {};
                            if (typeof itemPercentageValue === 'number' && li.data) {
                                li.data['relative'] = `${itemPercentageValue.toFixed(2)}%`;
                            }
                        });
                        break;
                    default:
                        break;
                }
            });
        }
        return {
            pieChartData: mode === 'percentage' ? (0, _utils.calculatePercentages)(sortedPieChartData) : sortedPieChartData,
            legendItems,
            legendColumns
        };
    }, [
        calculation,
        sort,
        mode,
        queryResults,
        colorList,
        chartId,
        pieChartLegend
    ]);
    const contentPadding = chartsTheme.container.padding.default;
    const adjustedContentDimensions = contentDimensions ? {
        width: contentDimensions.width - contentPadding * 2,
        height: contentDimensions.height - contentPadding * 2
    } : undefined;
    const legend = (0, _react.useMemo)(()=>{
        return props.spec.legend && (0, _pluginsystem.validateLegendSpec)(props.spec.legend) ? (0, _merge.default)({}, _core.DEFAULT_LEGEND, props.spec.legend) : undefined;
    }, [
        props.spec.legend
    ]);
    const [selectedLegendItems, setSelectedLegendItems] = (0, _react.useState)('ALL');
    const [legendSorting, setLegendSorting] = (0, _react.useState)();
    const chartRef = (0, _react.useRef)(null);
    // ensures there are fallbacks for unset properties since most
    // users should not need to customize visual display
    if (!contentDimensions) return null;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
        sx: {
            padding: `${contentPadding}px`
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.ContentWithLegend, {
            width: adjustedContentDimensions?.width ?? 400,
            height: adjustedContentDimensions?.height ?? 1000,
            // Making this small enough that the medium size doesn't get
            // responsive-handling-ed away when in the panel options editor.
            minChildrenHeight: 50,
            legendSize: legend?.size,
            legendProps: legend && {
                options: legend,
                data: legendItems,
                selectedItems: selectedLegendItems,
                onSelectedItemsChange: setSelectedLegendItems,
                tableProps: {
                    columns: legendColumns,
                    sorting: legendSorting,
                    onSortingChange: setLegendSorting
                },
                onItemMouseOver: (e, { id })=>{
                    chartRef.current?.highlightSeries({
                        name: id
                    });
                },
                onItemMouseOut: ()=>{
                    chartRef.current?.clearHighlightedSeries();
                }
            },
            children: ({ height, width })=>{
                return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                    style: {
                        height,
                        width
                    },
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_PieChartBase.PieChartBase, {
                        data: pieChartData,
                        width: width,
                        height: height,
                        showLabels: Boolean(props.spec.showLabels)
                    })
                });
            }
        })
    });
}
