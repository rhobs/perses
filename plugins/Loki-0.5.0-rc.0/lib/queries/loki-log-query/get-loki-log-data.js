import { replaceVariables } from '@perses-dev/plugin-system';
import { DEFAULT_DATASOURCE } from '../constants';
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
export const getLokiLogData = async (spec, context)=>{
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
    const query = replaceVariables(spec.query, context.variableState);
    const client = await context.datasourceStore.getDatasourceClient(spec.datasource ?? DEFAULT_DATASOURCE);
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

//# sourceMappingURL=get-loki-log-data.js.map