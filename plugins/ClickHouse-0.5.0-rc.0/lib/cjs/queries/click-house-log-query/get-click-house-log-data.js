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
Object.defineProperty(exports, "getClickHouseLogData", {
    enumerable: true,
    get: function() {
        return getClickHouseLogData;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const _constants = require("../constants");
function flattenObject(obj, parentKey = '', result = {}) {
    for (const [key, value] of Object.entries(obj)){
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            flattenObject(value, newKey, result);
        } else {
            result[newKey] = value;
        }
    }
    return result;
}
function convertStreamsToLogs(streams) {
    const entries = streams.map((entry)=>{
        const flattened = flattenObject(entry);
        if (!flattened.Timestamp && flattened.log_time) {
            flattened.Timestamp = flattened.log_time;
        }
        const sortedEntry = {};
        Object.keys(flattened).sort((a, b)=>a.localeCompare(b)).forEach((key)=>{
            sortedEntry[key] = flattened[key];
        });
        const line = Object.entries(sortedEntry).filter(([key])=>key !== 'Timestamp').map(([key, value])=>`<${key}> ${value === '' || value === null || value === undefined ? '--' : value}`).join(' ');
        return {
            timestamp: sortedEntry?.Timestamp,
            labels: sortedEntry,
            line
        };
    });
    return {
        entries,
        totalCount: entries.length
    };
}
const getClickHouseLogData = async (spec, context)=>{
    if (spec.query === undefined || spec.query === null || spec.query === '') {
        return {
            logs: {
                entries: [],
                totalCount: 0
            },
            timeRange: {
                start: context.timeRange.start,
                end: context.timeRange.end
            }
        };
    }
    const query = (0, _pluginsystem.replaceVariables)(spec.query, context.variableState);
    const client = await context.datasourceStore.getDatasourceClient(spec.datasource ?? _constants.DEFAULT_DATASOURCE);
    const { start, end } = context.timeRange;
    const response = await client.query({
        start: start.getTime().toString(),
        end: end.getTime().toString(),
        query
    });
    return {
        timeRange: {
            start,
            end
        },
        logs: convertStreamsToLogs(response.data),
        metadata: {
            executedQueryString: query
        }
    };
};
