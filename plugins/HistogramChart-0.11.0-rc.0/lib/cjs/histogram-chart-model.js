// Copyright 2025 The Perses Authors
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
    get DEFAULT_FORMAT () {
        return DEFAULT_FORMAT;
    },
    get DEFAULT_MAX_PERCENT () {
        return DEFAULT_MAX_PERCENT;
    },
    get DEFAULT_MAX_PERCENT_DECIMAL () {
        return DEFAULT_MAX_PERCENT_DECIMAL;
    },
    get DEFAULT_MIN_PERCENT () {
        return DEFAULT_MIN_PERCENT;
    },
    get DEFAULT_MIN_PERCENT_DECIMAL () {
        return DEFAULT_MIN_PERCENT_DECIMAL;
    },
    get DEFAULT_THRESHOLDS () {
        return DEFAULT_THRESHOLDS;
    },
    get createInitialHistogramChartOptions () {
        return createInitialHistogramChartOptions;
    }
});
const DEFAULT_FORMAT = {
    unit: 'decimal'
};
const DEFAULT_THRESHOLDS = {
    defaultColor: '#56b4e9'
};
const DEFAULT_MIN_PERCENT = 0;
const DEFAULT_MAX_PERCENT = 100;
const DEFAULT_MIN_PERCENT_DECIMAL = 0;
const DEFAULT_MAX_PERCENT_DECIMAL = 1;
function createInitialHistogramChartOptions() {
    return {
        format: DEFAULT_FORMAT
    };
}
