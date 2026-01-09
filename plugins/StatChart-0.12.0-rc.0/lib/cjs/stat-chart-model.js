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
    get COLOR_MODE_LABELS () {
        return COLOR_MODE_LABELS;
    },
    get SHOW_LEGEND_LABELS () {
        return SHOW_LEGEND_LABELS;
    },
    get createInitialStatChartOptions () {
        return createInitialStatChartOptions;
    }
});
const COLOR_MODE_LABELS = [
    {
        id: 'none',
        label: 'None'
    },
    {
        id: 'value',
        label: 'Text'
    },
    {
        id: 'background_solid',
        label: 'Background'
    }
];
const SHOW_LEGEND_LABELS = [
    {
        id: 'auto',
        label: 'Auto',
        description: 'Show legend for multi-series, hide legend for single series'
    },
    {
        id: 'on',
        label: 'On',
        description: 'Always show legend'
    },
    {
        id: 'off',
        label: 'Off',
        description: 'Always hide legend'
    }
];
function createInitialStatChartOptions() {
    return {
        calculation: 'last-number',
        format: {
            unit: 'decimal'
        },
        sparkline: {},
        legendMode: 'auto'
    };
}
