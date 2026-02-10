// Copyright The Perses Authors
// Licensed under the Apache License, Version 2.0 (the \"License\");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an \"AS IS\" BASIS,
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
    get generateCompleteTimestamps () {
        return generateCompleteTimestamps;
    },
    get getCommonTimeScaleForQueries () {
        return getCommonTimeScaleForQueries;
    }
});
const _core = require("@perses-dev/core");
function getCommonTimeScaleForQueries(queries) {
    const seriesData = queries.map((query)=>query.data);
    return (0, _core.getCommonTimeScale)(seriesData);
}
function generateCompleteTimestamps(timescale) {
    if (!timescale) {
        return [];
    }
    const { startMs, endMs, stepMs } = timescale;
    const timestamps = [];
    for(let time = startMs; time <= endMs; time += stepMs){
        timestamps.push(time);
    }
    return timestamps;
}
