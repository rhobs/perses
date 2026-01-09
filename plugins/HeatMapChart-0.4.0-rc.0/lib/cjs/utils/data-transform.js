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
