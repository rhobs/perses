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
Object.defineProperty(exports, "GaugeChartBase", {
    enumerable: true,
    get: function() {
        return GaugeChartBase;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _components = require("@perses-dev/components");
const _core = require("@perses-dev/core");
const _core1 = require("echarts/core");
const _charts = require("echarts/charts");
const _components1 = require("echarts/components");
const _renderers = require("echarts/renderers");
(0, _core1.use)([
    _charts.GaugeChart,
    _components1.GridComponent,
    _components1.TitleComponent,
    _components1.TooltipComponent,
    _renderers.CanvasRenderer
]);
// adjusts when to show pointer icon
const GAUGE_SMALL_BREAKPOINT = 170;
function GaugeChartBase(props) {
    const { width, height, data, format, axisLine, max, valueFontSize, progressWidth, titleFontSize } = props;
    const chartsTheme = (0, _components.useChartsTheme)();
    // useDeepMemo ensures value size util does not rerun everytime you hover on the chart
    const option = (0, _components.useDeepMemo)(()=>{
        if (data.value === undefined) return chartsTheme.noDataOption;
        // Base configuration shared by both series (= progress & scale)
        const baseGaugeConfig = {
            type: 'gauge',
            center: [
                '50%',
                '65%'
            ],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: max,
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            data: [
                {
                    value: data.value
                }
            ]
        };
        return {
            title: {
                show: false
            },
            tooltip: {
                show: false
            },
            series: [
                // Inner gauge (progress)
                {
                    ...baseGaugeConfig,
                    radius: '90%',
                    silent: true,
                    progress: {
                        show: true,
                        width: progressWidth,
                        itemStyle: {
                            color: 'auto'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: [
                                [
                                    1,
                                    'rgba(127,127,127,0.35)'
                                ]
                            ],
                            width: progressWidth
                        }
                    },
                    pointer: {
                        show: false
                    },
                    anchor: {
                        show: false
                    },
                    title: {
                        show: false
                    },
                    detail: {
                        show: false
                    }
                },
                // Outer gauge (scale & display)
                {
                    ...baseGaugeConfig,
                    radius: '100%',
                    pointer: {
                        show: true,
                        // pointer hidden for small panels, path taken from ex: https://echarts.apache.org/examples/en/editor.html?c=gauge-grade
                        icon: width > GAUGE_SMALL_BREAKPOINT ? 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z' : 'none',
                        length: 10,
                        width: 5,
                        offsetCenter: [
                            0,
                            '-49%'
                        ],
                        itemStyle: {
                            color: 'auto'
                        }
                    },
                    axisLine: axisLine,
                    // `detail` is the text displayed in the middle
                    detail: {
                        show: true,
                        width: '60%',
                        borderRadius: 8,
                        offsetCenter: [
                            0,
                            '-9%'
                        ],
                        color: 'inherit',
                        fontSize: valueFontSize,
                        formatter: data.value === null ? // at this level because the `formatter` function argument is `NaN`
                        // when the value is `null`, making it difficult to differentiate
                        // `null` from a true `NaN` case.
                        ()=>'null' : (value)=>{
                            return (0, _core.formatValue)(value, format);
                        }
                    },
                    data: [
                        {
                            value: data.value,
                            name: data.label,
                            // TODO: new UX for series names, create separate React component or reuse ListLegendItem
                            // https://echarts.apache.org/en/option.html#series-gauge.data.title
                            title: {
                                show: true,
                                color: chartsTheme.echartsTheme.textStyle?.color ?? 'inherit',
                                offsetCenter: [
                                    0,
                                    '55%'
                                ],
                                overflow: 'truncate',
                                fontSize: titleFontSize,
                                width: width * 0.8
                            }
                        }
                    ]
                }
            ]
        };
    }, [
        data,
        width,
        height,
        chartsTheme,
        format,
        axisLine,
        max,
        valueFontSize,
        progressWidth,
        titleFontSize
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.EChart, {
        style: {
            width: width,
            height: height
        },
        sx: {
            padding: `${chartsTheme.container.padding.default}px`
        },
        option: option,
        theme: chartsTheme.echartsTheme
    });
}
