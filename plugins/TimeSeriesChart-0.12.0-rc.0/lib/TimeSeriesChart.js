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
import { createInitialTimeSeriesChartOptions } from './time-series-chart-model';
import { TimeSeriesChartGeneralSettings } from './GeneralSettingsEditor';
import { QuerySettingsEditor } from './QuerySettingsEditor';
import { TimeSeriesChartPanel } from './TimeSeriesChartPanel';
import { TimeSeriesExportAction } from './TimeSeriesExportAction';
export const TimeSeriesChart = {
    PanelComponent: TimeSeriesChartPanel,
    supportedQueryTypes: [
        'TimeSeriesQuery'
    ],
    panelOptionsEditorComponents: [
        {
            label: 'General Settings',
            content: TimeSeriesChartGeneralSettings
        },
        {
            label: 'Query Settings',
            content: QuerySettingsEditor
        }
    ],
    createInitialOptions: createInitialTimeSeriesChartOptions,
    actions: [
        {
            component: TimeSeriesExportAction,
            location: 'header'
        }
    ]
};

//# sourceMappingURL=TimeSeriesChart.js.map