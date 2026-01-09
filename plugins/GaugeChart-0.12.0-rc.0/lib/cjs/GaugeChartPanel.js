// Copyright 2023 The Perses Authors
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
    get GaugeChartLoading () {
        return GaugeChartLoading;
    },
    get GaugeChartPanel () {
        return GaugeChartPanel;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _core = require("@perses-dev/core");
const _merge = /*#__PURE__*/ _interop_require_default(require("lodash/merge"));
const _react = require("react");
const _gaugechartmodel = require("./gauge-chart-model");
const _thresholds = require("./thresholds");
const _GaugeChartBase = require("./GaugeChartBase");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const EMPTY_GAUGE_SERIES = {
    label: '',
    value: undefined
};
const GAUGE_MIN_WIDTH = 90;
const PANEL_PADDING_OFFSET = 20;
/**
 * Calculate responsive progress width based on panel dimensions
 */ function getResponsiveProgressWidth(width, height) {
    const MIN_WIDTH = 10;
    const MAX_WIDTH = 48;
    const RATIO = 0.1; // 10% of the smaller dimension
    const minSize = Math.min(width, height);
    // Use RATIO of the smaller dimension as base, with reasonable min/max bounds
    return Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, Math.round(minSize * RATIO)));
}
/**
 * Responsive font size depending on number of characters and panel dimensions.
 * Uses clamp to ensure the text never overflows and scales appropriately with panel size.
 * (Value refers to the main number value displayed inside the gauge)
 */ function getResponsiveValueFontSize(value, format, width, height) {
    const MIN_SIZE = 8;
    const MAX_SIZE = 64;
    const formattedValue = typeof value === 'number' ? (0, _core.formatValue)(value, format) : `${value}`;
    const valueTextLength = Math.max(formattedValue.length, 6); // Ensure a minimum length to avoid overly large text for short values
    const availableSpace = Math.min(width, height);
    const fontSize = availableSpace / valueTextLength;
    return `clamp(${MIN_SIZE}px, ${fontSize}px, ${MAX_SIZE}px)`;
}
/**
 * Calculate responsive title font size based on panel dimensions
 * (Title refers to the text displayed below the gauge as a legend)
 */ function getResponsiveTitleFontSize(width, height) {
    const MIN_SIZE = 10;
    const MAX_SIZE = 16;
    const RATIO = 0.06; // Use 6% of the smaller dimension as base
    const size = Math.round(Math.min(width, height) * RATIO);
    // Scale based on panel size, with reasonable min/max bounds
    return Math.max(MIN_SIZE, Math.min(MAX_SIZE, size));
}
function GaugeChartPanel(props) {
    const { spec: pluginSpec, contentDimensions, queryResults } = props;
    const { calculation, max, legend } = pluginSpec;
    const { thresholds: thresholdsColors } = (0, _components.useChartsTheme)();
    /* Legend setting just added to the cue schema
     This line assures that if legend setting doesn't exist (for old gauge setting records),
     The legend shows normally as before. If it exists, then it checks the show property.
  */ const showLegend = legend?.show ?? true;
    // ensures all default format properties set if undef
    const format = (0, _merge.default)({}, _gaugechartmodel.DEFAULT_FORMAT, pluginSpec.format);
    const thresholds = pluginSpec.thresholds ?? _thresholds.defaultThresholdInput;
    const gaugeData = (0, _react.useMemo)(()=>{
        const seriesData = [];
        if (!queryResults[0]?.data?.series?.length) {
            return seriesData;
        }
        if (!_core.CalculationsMap[calculation]) {
            console.warn(`Invalid GaugeChart panel calculation ${calculation}, fallback to ${_core.DEFAULT_CALCULATION}`);
        }
        const calculate = _core.CalculationsMap[calculation] ?? _core.CalculationsMap[_core.DEFAULT_CALCULATION];
        for (const timeSeries of queryResults[0].data.series){
            seriesData.push({
                value: calculate(timeSeries.values),
                label: showLegend ? timeSeries.formattedName ?? '' : ''
            });
        }
        return seriesData;
    }, [
        queryResults,
        calculation,
        showLegend
    ]);
    if (!contentDimensions) return null;
    // needed for end value of last threshold color segment
    let thresholdMax = max;
    if (thresholdMax === undefined) {
        thresholdMax = format.unit === 'percent' ? _gaugechartmodel.DEFAULT_MAX_PERCENT : _gaugechartmodel.DEFAULT_MAX_PERCENT_DECIMAL;
    }
    const axisLineColors = (0, _thresholds.convertThresholds)(thresholds, format, thresholdMax, thresholdsColors);
    // accounts for showing a separate chart for each time series
    let chartWidth = contentDimensions.width / gaugeData.length - PANEL_PADDING_OFFSET;
    if (chartWidth < GAUGE_MIN_WIDTH && gaugeData.length > 1) {
        // enables horizontal scroll when charts overflow outside of panel
        chartWidth = GAUGE_MIN_WIDTH;
    }
    // Calculate responsive values based on chart dimensions
    const progressWidth = getResponsiveProgressWidth(chartWidth, contentDimensions.height);
    const axisLineWidth = Math.round(progressWidth * 0.2); // Axis line width is 20% of progress width
    const titleFontSize = getResponsiveTitleFontSize(chartWidth, contentDimensions.height);
    const axisLine = {
        show: true,
        lineStyle: {
            width: axisLineWidth,
            color: axisLineColors
        }
    };
    // no data message handled inside chart component
    if (!gaugeData.length) {
        const emptyValueFontSize = getResponsiveValueFontSize(null, format, contentDimensions.width, contentDimensions.height);
        const emptyProgressWidth = getResponsiveProgressWidth(contentDimensions.width, contentDimensions.height);
        const emptyTitleFontSize = getResponsiveTitleFontSize(contentDimensions.width, contentDimensions.height);
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_GaugeChartBase.GaugeChartBase, {
            width: contentDimensions.width,
            height: contentDimensions.height,
            data: EMPTY_GAUGE_SERIES,
            format: format,
            axisLine: axisLine,
            max: thresholdMax,
            valueFontSize: emptyValueFontSize,
            progressWidth: emptyProgressWidth,
            titleFontSize: emptyTitleFontSize
        });
    }
    const hasMultipleCharts = gaugeData.length > 1;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
        direction: "row",
        spacing: hasMultipleCharts ? 2 : 0,
        justifyContent: hasMultipleCharts ? 'left' : 'center',
        alignItems: "center",
        sx: {
            // so scrollbar only shows when necessary
            overflowX: gaugeData.length > 1 ? 'scroll' : 'auto'
        },
        children: gaugeData.map((series, seriesIndex)=>{
            const fontSize = getResponsiveValueFontSize(series.value ?? null, format, chartWidth, contentDimensions.height);
            return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_GaugeChartBase.GaugeChartBase, {
                    width: chartWidth,
                    height: contentDimensions.height,
                    data: series,
                    format: format,
                    axisLine: axisLine,
                    max: thresholdMax,
                    valueFontSize: fontSize,
                    progressWidth: progressWidth,
                    titleFontSize: titleFontSize
                })
            }, `gauge-series-${seriesIndex}`);
        })
    });
}
function GaugeChartLoading({ contentDimensions }) {
    if (!contentDimensions) return null;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Skeleton, {
        sx: {
            margin: '0 auto'
        },
        variant: "circular",
        width: contentDimensions.width > contentDimensions.height ? contentDimensions.height : contentDimensions.width,
        height: contentDimensions.height
    });
}
