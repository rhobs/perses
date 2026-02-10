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
Object.defineProperty(exports, "getLokiLogData", {
    enumerable: true,
    get: function() {
        return getLokiLogData;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const _constants = require("../constants");
function convertStreamsToLogs(streams) {
    const entries = [];
    streams.forEach((stream)=>{
        stream.values.forEach(([timestamp, logLine])=>{
            entries.push({
                timestamp: Number(timestamp) / 1000000000,
                line: logLine,
                labels: stream.stream
            });
        });
    });
    return {
        entries,
        totalCount: entries.length
    };
}
const getLokiLogData = async (spec, context)=>{
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
    const response = await client.queryRange({
        query,
        start: start.getTime().toString(),
        end: end.getTime().toString(),
        direction: spec.direction
    });
    if (response.data.resultType === 'streams') {
        const logs = convertStreamsToLogs(response.data.result);
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
    }
    return {
        logs: {
            entries: [],
            totalCount: 0
        },
        timeRange: {
            start,
            end
        }
    };
};
