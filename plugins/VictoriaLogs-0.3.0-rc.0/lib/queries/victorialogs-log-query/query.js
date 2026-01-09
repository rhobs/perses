import { replaceVariables } from '@perses-dev/plugin-system';
import { DEFAULT_DATASOURCE } from '../constants';
function convertStreamToLogs(data, defaultTime) {
    const entries = [];
    data.forEach((entry)=>{
        const { _msg, _time, ...labels } = entry;
        const time = !_time && !_msg ? defaultTime : Date.parse(_time);
        entries.push({
            timestamp: Number(time) / 1000,
            line: _msg || "",
            labels: labels
        });
    });
    return {
        entries,
        totalCount: entries.length
    };
}
export const getVictoriaLogsLogData = async (spec, context)=>{
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

//# sourceMappingURL=query.js.map