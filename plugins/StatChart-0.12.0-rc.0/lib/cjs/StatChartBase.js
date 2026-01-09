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
Object.defineProperty(exports, "StatChartBase", {
    enumerable: true,
    get: function() {
        return StatChartBase;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _material = require("@mui/material");
const _merge = /*#__PURE__*/ _interop_require_default(require("lodash/merge"));
const _core = require("echarts/core");
const _charts = require("echarts/charts");
const _components = require("echarts/components");
const _renderers = require("echarts/renderers");
const _components1 = require("@perses-dev/components");
const _chromajs = /*#__PURE__*/ _interop_require_default(require("chroma-js"));
const _calculatefontsize = require("./utils/calculate-font-size");
const _formatstatchartvalue = require("./utils/format-stat-chart-value");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
(0, _core.use)([
    _charts.LineChart,
    _components.GridComponent,
    _components.DatasetComponent,
    _components.TitleComponent,
    _components.TooltipComponent,
    _renderers.CanvasRenderer
]);
const LINE_HEIGHT = 1.2;
const SERIES_NAME_MAX_FONT_SIZE = 30;
const SERIES_NAME_FONT_WEIGHT = 400;
const VALUE_FONT_WEIGHT = 700;
const WHITE_COLOR_CODE = '#FFFFFF';
const BLACK_COLOR_CODE = '#000000';
const StatChartBase = (props)=>{
    const { width, height, data, data: { color }, sparkline, showSeriesName, format, valueFontSize, colorMode } = props;
    const { palette: { mode: paletteMode, text: { secondary } } } = (0, _material.useTheme)();
    const chartsTheme = (0, _components1.useChartsTheme)();
    const formattedValue = (0, _formatstatchartvalue.formatStatChartValue)(data.calculatedValue, format);
    const containerPadding = chartsTheme.container.padding.default;
    // calculate series name font size and height
    let seriesNameFontSize = (0, _calculatefontsize.useOptimalFontSize)({
        text: data?.seriesData?.name ?? '',
        fontWeight: SERIES_NAME_FONT_WEIGHT,
        width,
        height: height * 0.125,
        lineHeight: LINE_HEIGHT,
        maxSize: SERIES_NAME_MAX_FONT_SIZE
    });
    const seriesNameHeight = showSeriesName ? seriesNameFontSize * LINE_HEIGHT + containerPadding : 0;
    // calculate value font size and height
    const availableWidth = width - containerPadding * 2;
    const availableHeight = height - seriesNameHeight;
    const optimalValueFontSize = (0, _calculatefontsize.useOptimalFontSize)({
        text: formattedValue,
        // override the font size if user selects it in the settings
        fontSizeOverride: valueFontSize,
        fontWeight: VALUE_FONT_WEIGHT,
        // without sparkline, use only 50% of the available width so it looks better for multiseries
        width: sparkline ? availableWidth : availableWidth * 0.5,
        // with sparkline, use only 25% of available height to leave room for chart
        // without sparkline, value should take up 90% of available space
        height: sparkline ? availableHeight * 0.25 : availableHeight * 0.9,
        lineHeight: LINE_HEIGHT
    });
    const valueFontHeight = optimalValueFontSize * LINE_HEIGHT;
    // make sure the series name font size is slightly smaller than value font size
    seriesNameFontSize = Math.min(optimalValueFontSize * 0.7, seriesNameFontSize);
    const option = (0, _react.useMemo)(()=>{
        if (!data.seriesData) return chartsTheme.noDataOption;
        const series = data.seriesData;
        const statSeries = [];
        if (sparkline) {
            const lineSeries = {
                type: 'line',
                name: series.name,
                data: series.values,
                zlevel: 1,
                symbol: 'none',
                animation: false,
                silent: true
            };
            const clonedSparkLine = {
                ...sparkline
            };
            if (colorMode === 'background_solid') {
                clonedSparkLine.areaStyle = {
                    color: WHITE_COLOR_CODE,
                    opacity: 0.4
                };
                clonedSparkLine.lineStyle = {
                    color: WHITE_COLOR_CODE,
                    opacity: 1
                };
            }
            const mergedSeries = (0, _merge.default)(lineSeries, clonedSparkLine);
            statSeries.push(mergedSeries);
        }
        const option = {
            title: {
                show: false
            },
            grid: {
                show: false,
                top: '35%',
                right: 0,
                bottom: 0,
                left: 0,
                containLabel: false
            },
            xAxis: {
                type: 'time',
                show: false,
                boundaryGap: false
            },
            yAxis: {
                type: 'value',
                show: false,
                min: (value)=>{
                    if (value.min >= 0 && value.min <= 1) {
                        // helps with percent-decimal units, or datasets that return 0 or 1 booleans
                        return 0;
                    }
                    return value.min;
                }
            },
            tooltip: {
                show: false
            },
            series: statSeries
        };
        return option;
    }, [
        data,
        chartsTheme,
        sparkline,
        colorMode
    ]);
    const textAlignment = sparkline ? 'auto' : 'center';
    const styledFormattedValue = (0, _react.useMemo)(()=>{
        let valueColor = '';
        switch(colorMode){
            case 'background_solid':
                valueColor = _chromajs.default.contrast(color, WHITE_COLOR_CODE) > _chromajs.default.contrast(color, BLACK_COLOR_CODE) ? WHITE_COLOR_CODE : BLACK_COLOR_CODE;
                break;
            case 'none':
                valueColor = paletteMode === 'dark' ? WHITE_COLOR_CODE : BLACK_COLOR_CODE;
                break;
            case 'value':
            default:
                valueColor = color;
                break;
        }
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(Value, {
            variant: "h3",
            color: valueColor,
            fontSize: optimalValueFontSize,
            padding: containerPadding,
            children: formattedValue
        });
    }, [
        colorMode,
        containerPadding,
        optimalValueFontSize,
        formattedValue,
        color,
        paletteMode
    ]);
    const seriesName = (0, _react.useMemo)(()=>{
        if (!showSeriesName) return null;
        let textColor = '';
        switch(colorMode){
            case 'background_solid':
                textColor = _chromajs.default.contrast(color, WHITE_COLOR_CODE) > _chromajs.default.contrast(color, BLACK_COLOR_CODE) ? WHITE_COLOR_CODE : BLACK_COLOR_CODE;
                break;
            case 'none':
            case 'value':
            default:
                textColor = secondary;
                break;
        }
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(SeriesName, {
            padding: containerPadding,
            fontSize: seriesNameFontSize,
            color: textColor,
            children: data.seriesData?.name
        });
    }, [
        colorMode,
        showSeriesName,
        secondary,
        color,
        containerPadding,
        seriesNameFontSize,
        data?.seriesData?.name
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
        sx: {
            height: '100%',
            width: '100%',
            backgroundColor: colorMode === 'background_solid' ? color : 'transparent',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: textAlignment,
            alignItems: textAlignment
        },
        children: [
            seriesName,
            styledFormattedValue,
            sparkline && /*#__PURE__*/ (0, _jsxruntime.jsx)(_components1.EChart, {
                sx: {
                    width: '100%'
                },
                style: {
                    // ECharts rounds the height to the nearest integer by default.
                    // This can cause unneccessary scrollbars when the total height of this chart exceeds the 'height' prop.
                    height: Math.floor(height - seriesNameHeight - valueFontHeight)
                },
                option: option,
                theme: chartsTheme.echartsTheme,
                renderer: "svg"
            })
        ]
    });
};
const SeriesName = (0, _material.styled)(_material.Typography, {
    shouldForwardProp: (prop)=>prop !== 'padding' && prop !== 'fontSize'
})(({ padding, fontSize, color })=>({
        color: color,
        padding: `${padding}px`,
        fontSize: `${fontSize}px`,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    }));
const Value = (0, _material.styled)(_material.Typography, {
    shouldForwardProp: (prop)=>prop !== 'color' && prop !== 'padding' && prop !== 'fontSize' && prop !== 'sparkline'
})(({ theme, color, padding, fontSize, sparkline })=>({
        color: color ?? theme.palette.text.primary,
        fontSize: `${fontSize}px`,
        padding: sparkline ? `${padding}px ${padding}px 0 ${padding}px` : ` 0 ${padding}px`,
        whiteSpace: 'nowrap',
        lineHeight: LINE_HEIGHT
    }));
