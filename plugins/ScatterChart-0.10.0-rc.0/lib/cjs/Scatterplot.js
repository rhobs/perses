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
Object.defineProperty(exports, "Scatterplot", {
    enumerable: true,
    get: function() {
        return Scatterplot;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _components = require("@perses-dev/components");
const _core = require("echarts/core");
const _charts = require("echarts/charts");
const _components1 = require("echarts/components");
const _renderers = require("echarts/renderers");
const _core1 = require("@perses-dev/core");
const _pluginsystem = require("@perses-dev/plugin-system");
(0, _core.use)([
    _components1.DatasetComponent,
    _components1.DataZoomComponent,
    _components1.LegendComponent,
    _charts.ScatterChart,
    _components1.GridComponent,
    _components1.TitleComponent,
    _components1.TooltipComponent,
    _renderers.CanvasRenderer
]);
const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'long',
    timeStyle: 'medium'
}).format;
function Scatterplot(props) {
    const { width, height, options, link: linkTemplate } = props;
    const chartsTheme = (0, _components.useChartsTheme)();
    const { absoluteTimeRange } = (0, _pluginsystem.useTimeRange)();
    const variableValues = (0, _pluginsystem.useAllVariableValues)();
    const { navigate } = (0, _pluginsystem.useRouterContext)();
    // Apache EChart Options Docs: https://echarts.apache.org/en/option.html
    const eChartOptions = {
        dataset: options.dataset,
        series: options.series,
        dataZoom: options.dataZoom,
        grid: {
            top: 45,
            bottom: 20,
            left: 30,
            right: 20
        },
        xAxis: {
            type: 'time',
            min: absoluteTimeRange.start,
            max: absoluteTimeRange.end
        },
        yAxis: {
            scale: true,
            type: 'value',
            name: 'Duration',
            splitNumber: 4,
            axisLabel: {
                formatter: (durationMs)=>(0, _core1.formatValue)(durationMs, {
                        unit: 'milliseconds'
                    })
            }
        },
        animation: false,
        tooltip: {
            padding: 5,
            borderWidth: 1,
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter: function(params) {
                // TODO: import type from ECharts instead of using any
                const data = params[0].data;
                return [
                    `<b>Service name</b>: ${data.rootServiceName}<br/>`,
                    `<b>Span name</b>: ${data.rootTraceName}<br/>`,
                    `<b>Time</b>: ${DATE_FORMATTER(data.startTime)}<br/>`,
                    `<b>Duration</b>: ${(0, _core1.formatValue)(data.durationMs, {
                        unit: 'milliseconds'
                    })}<br/>`,
                    `<b>Span count</b>: ${data.spanCount} (${data.errorCount} errors)<br/>`
                ].join('');
            }
        },
        legend: {
            show: true,
            type: 'scroll',
            orient: 'horizontal',
            bottom: 0
        }
    };
    const handleEvents = (0, _react.useMemo)(()=>{
        const handlers = {};
        if (navigate && linkTemplate) {
            handlers.click = (params)=>{
                const linkVariables = params.data.linkVariables;
                const link = (0, _pluginsystem.replaceVariablesInString)(linkTemplate, variableValues, linkVariables);
                navigate(link);
            };
        }
        return handlers;
    }, [
        linkTemplate,
        navigate,
        variableValues
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.EChart, {
        style: {
            width: width,
            height: height
        },
        option: eChartOptions,
        theme: chartsTheme.echartsTheme,
        onEvents: handleEvents
    });
}
