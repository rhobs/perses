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
    get BLUR_FADEOUT_OPACITY () {
        return BLUR_FADEOUT_OPACITY;
    },
    get EMPTY_GRAPH_DATA () {
        return EMPTY_GRAPH_DATA;
    },
    get HIDE_DATAPOINTS_LIMIT () {
        return HIDE_DATAPOINTS_LIMIT;
    },
    get convertPanelYAxis () {
        return convertPanelYAxis;
    },
    get convertPercentThreshold () {
        return convertPercentThreshold;
    },
    get getCommonTimeScaleForQueries () {
        return getCommonTimeScaleForQueries;
    },
    get getThresholdSeries () {
        return getThresholdSeries;
    },
    get getTimeSeries () {
        return getTimeSeries;
    },
    get roundDown () {
        return roundDown;
    }
});
const _core = require("@perses-dev/core");
const _components = require("@perses-dev/components");
const _timeserieschartmodel = require("../time-series-chart-model");
const EMPTY_GRAPH_DATA = {
    timeSeries: [],
    xAxis: [],
    legendItems: []
};
const HIDE_DATAPOINTS_LIMIT = 70;
const BLUR_FADEOUT_OPACITY = 0.5;
function getCommonTimeScaleForQueries(queries) {
    const seriesData = queries.map((query)=>query.data);
    return (0, _core.getCommonTimeScale)(seriesData);
}
function getTimeSeries(id, datasetIndex, formattedName, visual, timeScale, paletteColor, querySettings) {
    const lineWidth = visual.lineWidth ?? _timeserieschartmodel.DEFAULT_LINE_WIDTH;
    const pointRadius = visual.pointRadius ?? _timeserieschartmodel.DEFAULT_POINT_RADIUS;
    // Shows datapoint symbols when selected time range is roughly 15 minutes or less
    const minuteMs = 60000;
    let showPoints = timeScale.rangeMs <= minuteMs * 15;
    // Allows overriding default behavior and opt-in to always show all symbols (can hurt performance)
    if (visual.showPoints === 'always') {
        showPoints = true;
    }
    if (visual.display === 'bar') {
        const series = {
            type: 'bar',
            id: id,
            datasetIndex,
            name: formattedName,
            color: paletteColor,
            stack: visual.stack === 'all' ? visual.stack : undefined,
            label: {
                show: false
            }
        };
        return series;
    }
    const series = {
        type: 'line',
        id: id,
        datasetIndex,
        name: formattedName,
        connectNulls: visual.connectNulls ?? _timeserieschartmodel.DEFAULT_CONNECT_NULLS,
        color: paletteColor,
        stack: visual.stack === 'all' ? visual.stack : undefined,
        sampling: 'lttb',
        progressiveThreshold: _components.OPTIMIZED_MODE_SERIES_LIMIT,
        showSymbol: showPoints,
        showAllSymbol: true,
        symbolSize: pointRadius,
        lineStyle: {
            width: lineWidth,
            type: querySettings?.lineStyle ?? visual.lineStyle
        },
        areaStyle: {
            opacity: querySettings?.areaOpacity ?? visual.areaOpacity ?? _timeserieschartmodel.DEFAULT_AREA_OPACITY
        },
        // https://echarts.apache.org/en/option.html#series-line.emphasis
        emphasis: {
            focus: 'series',
            disabled: visual.areaOpacity !== undefined && visual.areaOpacity > 0,
            lineStyle: {
                width: lineWidth + 1,
                opacity: 1,
                type: visual.lineStyle
            }
        },
        selectedMode: 'single',
        select: {
            itemStyle: {
                borderColor: paletteColor,
                borderWidth: pointRadius + 0.5
            }
        },
        blur: {
            lineStyle: {
                width: lineWidth,
                opacity: BLUR_FADEOUT_OPACITY,
                type: visual.lineStyle
            }
        }
    };
    return series;
}
function getThresholdSeries(name, threshold, seriesIndex) {
    return {
        type: 'line',
        name: name,
        id: name,
        datasetId: name,
        datasetIndex: seriesIndex,
        color: threshold.color,
        label: {
            show: false
        },
        lineStyle: {
            type: 'dashed',
            width: 2
        },
        emphasis: {
            focus: 'series',
            lineStyle: {
                width: 2.5
            }
        },
        blur: {
            lineStyle: {
                opacity: BLUR_FADEOUT_OPACITY
            }
        }
    };
}
function convertPercentThreshold(percent, data, max, min) {
    const percentDecimal = percent / 100;
    const adjustedMax = max ?? findMax(data);
    const adjustedMin = min ?? 0;
    const total = adjustedMax - adjustedMin;
    return percentDecimal * total + adjustedMin;
}
function findMax(data) {
    let max = 0;
    if (data.length && data[0] !== undefined && data[0]?.values) {
        data.forEach((series)=>{
            series.values.forEach((valueTuple)=>{
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const [_, value] = valueTuple;
                if (typeof value === 'number' && value > max) {
                    max = value;
                }
            });
        });
    } else {
        data.forEach((series)=>{
            if (series.data !== undefined) {
                series.data.forEach((value)=>{
                    if (typeof value === 'number' && value > max) {
                        max = value;
                    }
                });
            }
        });
    }
    return max;
}
function convertPanelYAxis(inputAxis = {}, useLogarithmicBase) {
    // Determine the appropriate min value based on scale type and user input
    let minValue;
    if (inputAxis?.min !== undefined) {
        // User explicitly set a min value - use it for both linear and log scales
        minValue = inputAxis.min;
    } else if (useLogarithmicBase !== 'none') {
        // For logarithmic scales without explicit min:
        // Let ECharts auto-calculate the range based on data to avoid issues with
        // function-based calculations which can result in improper ranges (e.g., 1-10)
        minValue = undefined;
    } else {
        // For linear scales without explicit min:
        // Use dynamic calculation with padding for better visualization
        // https://echarts.apache.org/en/option.html#yAxis.min
        minValue = (value)=>{
            if (value.min >= 0 && value.min <= 1) {
                // Helps with PercentDecimal units, or datasets that return 0 or 1 booleans
                return 0;
            }
            // Note: We can tweak the MULTIPLIER constants if we want
            // TODO: Experiment with using a padding that is based on the difference between max value and min value
            if (value.min > 0) {
                return roundDown(value.min * _timeserieschartmodel.POSITIVE_MIN_VALUE_MULTIPLIER);
            } else {
                return roundDown(value.min * _timeserieschartmodel.NEGATIVE_MIN_VALUE_MULTIPLIER);
            }
        };
    }
    // Build the yAxis configuration
    const yAxis = {
        show: true,
        axisLabel: {
            show: inputAxis?.show ?? _timeserieschartmodel.DEFAULT_Y_AXIS.show
        },
        min: minValue,
        max: inputAxis?.max
    };
    // Apply logarithmic scale settings if requested
    if (useLogarithmicBase !== 'none') {
        return {
            ...yAxis,
            type: 'log',
            logBase: useLogarithmicBase
        };
    }
    return yAxis;
}
function roundDown(num) {
    const magnitude = Math.floor(Math.log10(Math.abs(num)));
    const firstDigit = Math.floor(num / Math.pow(10, magnitude));
    return firstDigit * Math.pow(10, magnitude);
}
