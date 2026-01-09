import { useDatasourceClient, useTimeRange } from '@perses-dev/plugin-system';
import { useQuery } from '@tanstack/react-query';
export const fieldItemsToVariableOptions = (values)=>{
    if (!values) return [];
    return values.map((value)=>({
            value: value.value,
            label: value.value
        }));
};
export function getVictoriaLogsTimeRange(timeRange) {
    const { start, end } = timeRange;
    return {
        start: start.toISOString(),
        end: end.toISOString()
    };
}
export function useFieldNames(query, datasource) {
    const { absoluteTimeRange: { start, end } } = useTimeRange();
    const { data: client } = useDatasourceClient(datasource);
    const enabled = !!client && !!query;
    return useQuery({
        enabled: enabled,
        queryKey: [
            'datasource',
            datasource.name,
            'query',
            query
        ],
        queryFn: async ()=>{
            return await client.fieldNames({
                start: start.toISOString(),
                end: end.toISOString(),
                query: query
            });
        }
    });
}
export function useFieldValues(field, query, datasource) {
    const { absoluteTimeRange: { start, end } } = useTimeRange();
    const { data: client } = useDatasourceClient(datasource);
    const enabled = !!client && !!query;
    return useQuery({
        enabled: enabled,
        queryKey: [
            'field',
            field,
            'datasource',
            datasource.name,
            'query',
            query
        ],
        queryFn: async ()=>{
            return await client.fieldValues({
                query: query,
                field: field,
                start: start.toISOString(),
                end: end.toISOString()
            });
        }
    });
}

//# sourceMappingURL=utils.js.map