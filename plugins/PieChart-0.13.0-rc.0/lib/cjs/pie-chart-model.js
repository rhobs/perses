// Copyright 2024 The Perses Authors
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
    get DEFAULT_MODE () {
        return DEFAULT_MODE;
    },
    get DEFAULT_SORT () {
        return DEFAULT_SORT;
    },
    get createInitialPieChartOptions () {
        return createInitialPieChartOptions;
    }
});
const _core = require("@perses-dev/core");
const DEFAULT_FORMAT = {
    unit: 'decimal',
    shortValues: true
};
const DEFAULT_SORT = 'desc';
const DEFAULT_MODE = 'value';
function createInitialPieChartOptions() {
    return {
        calculation: _core.DEFAULT_CALCULATION,
        format: DEFAULT_FORMAT,
        mode: DEFAULT_MODE,
        radius: 50,
        showLabels: false,
        sort: DEFAULT_SORT
    };
}
