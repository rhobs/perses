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
    get calculatePercentages () {
        return calculatePercentages;
    },
    get sortSeriesData () {
        return sortSeriesData;
    }
});
const _piechartmodel = require("./pie-chart-model");
function calculatePercentages(data) {
    const sum = data.reduce((accumulator, { value })=>accumulator + (value ?? 0), 0);
    return data.map((seriesData)=>{
        const percentage = (seriesData.value ?? 0) / sum * 100;
        return {
            ...seriesData,
            value: Number(percentage.toFixed(2))
        };
    });
}
function sortSeriesData(data, sortOrder = _piechartmodel.DEFAULT_SORT) {
    return data.sort((a, b)=>{
        // Handle null values - push them to the end regardless of sort order
        if (a.value === null && b.value === null) return 0;
        if (a.value === null) return 1;
        if (b.value === null) return -1;
        // Sort by value
        const diff = (a.value ?? 0) - (b.value ?? 0);
        return sortOrder === 'asc' ? diff : -diff;
    });
}
