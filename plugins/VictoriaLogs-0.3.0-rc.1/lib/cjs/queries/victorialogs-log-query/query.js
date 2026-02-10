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
Object.defineProperty(exports, "getVictoriaLogsLogData", {
    enumerable: true,
    get: function() {
        return getVictoriaLogsLogData;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const _constants = require("../constants");
function convertStreamToLogs(data, defaultTime) {
    const entries = [];
    data.forEach((entry)=>{
        const { _msg, _time, ...labels } = entry;
        const time = !_time && !_msg ? defaultTime : Date.parse(_time);
        entries.push({
            timestamp: Number(time) / 1000,
            line: _msg || '',
            labels: labels
        });
    });
    return {
        entries,
        totalCount: entries.length
    };
}
const getVictoriaLogsLogData = async (spec, context)=>{
    if (!spec.query) {
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
    const response = await client.streamQueryRange({
        query,
        start: start.toISOString(),
        end: end.toISOString()
    });
    const logs = convertStreamToLogs(response, end.getTime().toString());
    return {
        logs,
        timeRange: {
            start,
            end
        },
        metadata: {
            executedQueryString: query
        }
    };
};
