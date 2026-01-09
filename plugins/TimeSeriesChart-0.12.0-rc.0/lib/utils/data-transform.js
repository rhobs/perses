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
import { getCommonTimeScale } from '@perses-dev/core';
import { OPTIMIZED_MODE_SERIES_LIMIT } from '@perses-dev/components';
import { DEFAULT_AREA_OPACITY, DEFAULT_CONNECT_NULLS, DEFAULT_LINE_WIDTH, DEFAULT_POINT_RADIUS, DEFAULT_Y_AXIS, POSITIVE_MIN_VALUE_MULTIPLIER, NEGATIVE_MIN_VALUE_MULTIPLIER } from '../time-series-chart-model';
export const EMPTY_GRAPH_DATA = {
    timeSeries: [],
    xAxis: [],
    legendItems: []
};
export const HIDE_DATAPOINTS_LIMIT = 70;
export const BLUR_FADEOUT_OPACITY = 0.5;
/**
 * Given a list of running queries, calculates a common time scale for use on
 * the x axis (i.e. start/end dates and a step that is divisible into all of
 * the queries' steps).
 */ export function getCommonTimeScaleForQueries(queries) {
    const seriesData = queries.map((query)=>query.data);
    return getCommonTimeScale(seriesData);
}
/**
 * Gets ECharts line series option properties for regular trends
 */ export function getTimeSeries(id, datasetIndex, formattedName, visual, timeScale, paletteColor, querySettings) {
    const lineWidth = visual.lineWidth ?? DEFAULT_LINE_WIDTH;
    const pointRadius = visual.pointRadius ?? DEFAULT_POINT_RADIUS;
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
        connectNulls: visual.connectNulls ?? DEFAULT_CONNECT_NULLS,
        color: paletteColor,
        stack: visual.stack === 'all' ? visual.stack : undefined,
        sampling: 'lttb',
        progressiveThreshold: OPTIMIZED_MODE_SERIES_LIMIT,
        showSymbol: showPoints,
        showAllSymbol: true,
        symbolSize: pointRadius,
        lineStyle: {
            width: lineWidth,
            type: querySettings?.lineStyle ?? visual.lineStyle
        },
        areaStyle: {
            opacity: querySettings?.areaOpacity ?? visual.areaOpacity ?? DEFAULT_AREA_OPACITY
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
/**
 * Gets threshold-specific line series styles
 * markLine cannot be used since it does not update yAxis max / min
 * and threshold data needs to show in the tooltip
 */ export function getThresholdSeries(name, threshold, seriesIndex) {
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
/**
 * Converts percent threshold into absolute step value
 * If max is undefined, use the max value from time series data as default
 */ export function convertPercentThreshold(percent, data, max, min) {
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
/**
 * Converts Perses panel yAxis from dashboard spec to ECharts supported yAxis options.
 * Handles both linear and logarithmic scales with appropriate min/max calculations.
 */ export function convertPanelYAxis(inputAxis = {}, useLogarithmicBase) {
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
                return roundDown(value.min * POSITIVE_MIN_VALUE_MULTIPLIER);
            } else {
                return roundDown(value.min * NEGATIVE_MIN_VALUE_MULTIPLIER);
            }
        };
    }
    // Build the yAxis configuration
    const yAxis = {
        show: true,
        axisLabel: {
            show: inputAxis?.show ?? DEFAULT_Y_AXIS.show
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
/**
 * Rounds down to nearest number with one significant digit.
 *
 * Examples:
 * 1. 675 --> 600
 * 2. 0.567 --> 0.5
 * 3. -12 --> -20
 */ export function roundDown(num) {
    const magnitude = Math.floor(Math.log10(Math.abs(num)));
    const firstDigit = Math.floor(num / Math.pow(10, magnitude));
    return firstDigit * Math.pow(10, magnitude);
}

//# sourceMappingURL=data-transform.js.map