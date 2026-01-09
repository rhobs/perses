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
Object.defineProperty(exports, "TimeSeriesChart", {
    enumerable: true,
    get: function() {
        return TimeSeriesChart;
    }
});
const _timeserieschartmodel = require("./time-series-chart-model");
const _GeneralSettingsEditor = require("./GeneralSettingsEditor");
const _QuerySettingsEditor = require("./QuerySettingsEditor");
const _TimeSeriesChartPanel = require("./TimeSeriesChartPanel");
const _TimeSeriesExportAction = require("./TimeSeriesExportAction");
const TimeSeriesChart = {
    PanelComponent: _TimeSeriesChartPanel.TimeSeriesChartPanel,
    supportedQueryTypes: [
        'TimeSeriesQuery'
    ],
    panelOptionsEditorComponents: [
        {
            label: 'General Settings',
            content: _GeneralSettingsEditor.TimeSeriesChartGeneralSettings
        },
        {
            label: 'Query Settings',
            content: _QuerySettingsEditor.QuerySettingsEditor
        }
    ],
    createInitialOptions: _timeserieschartmodel.createInitialTimeSeriesChartOptions,
    actions: [
        {
            component: _TimeSeriesExportAction.TimeSeriesExportAction,
            location: 'header'
        }
    ]
};
