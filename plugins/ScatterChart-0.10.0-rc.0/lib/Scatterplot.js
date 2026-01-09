import { jsx as _jsx } from "react/jsx-runtime";
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
import { useMemo } from 'react';
import { EChart, useChartsTheme } from '@perses-dev/components';
import { use } from 'echarts/core';
import { ScatterChart as EChartsScatterChart } from 'echarts/charts';
import { DatasetComponent, DataZoomComponent, LegendComponent, GridComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { formatValue } from '@perses-dev/core';
import { replaceVariablesInString, useAllVariableValues, useRouterContext, useTimeRange } from '@perses-dev/plugin-system';
use([
    DatasetComponent,
    DataZoomComponent,
    LegendComponent,
    EChartsScatterChart,
    GridComponent,
    TitleComponent,
    TooltipComponent,
    CanvasRenderer
]);
const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'long',
    timeStyle: 'medium'
}).format;
export function Scatterplot(props) {
    const { width, height, options, link: linkTemplate } = props;
    const chartsTheme = useChartsTheme();
    const { absoluteTimeRange } = useTimeRange();
    const variableValues = useAllVariableValues();
    const { navigate } = useRouterContext();
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
                formatter: (durationMs)=>formatValue(durationMs, {
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
                    `<b>Duration</b>: ${formatValue(data.durationMs, {
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
    const handleEvents = useMemo(()=>{
        const handlers = {};
        if (navigate && linkTemplate) {
            handlers.click = (params)=>{
                const linkVariables = params.data.linkVariables;
                const link = replaceVariablesInString(linkTemplate, variableValues, linkVariables);
                navigate(link);
            };
        }
        return handlers;
    }, [
        linkTemplate,
        navigate,
        variableValues
    ]);
    return /*#__PURE__*/ _jsx(EChart, {
        style: {
            width: width,
            height: height
        },
        option: eChartOptions,
        theme: chartsTheme.echartsTheme,
        onEvents: handleEvents
    });
}

//# sourceMappingURL=Scatterplot.js.map