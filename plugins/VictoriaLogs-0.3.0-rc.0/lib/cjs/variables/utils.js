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
    get fieldItemsToVariableOptions () {
        return fieldItemsToVariableOptions;
    },
    get getVictoriaLogsTimeRange () {
        return getVictoriaLogsTimeRange;
    },
    get useFieldNames () {
        return useFieldNames;
    },
    get useFieldValues () {
        return useFieldValues;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const _reactquery = require("@tanstack/react-query");
const fieldItemsToVariableOptions = (values)=>{
    if (!values) return [];
    return values.map((value)=>({
            value: value.value,
            label: value.value
        }));
};
function getVictoriaLogsTimeRange(timeRange) {
    const { start, end } = timeRange;
    return {
        start: start.toISOString(),
        end: end.toISOString()
    };
}
function useFieldNames(query, datasource) {
    const { absoluteTimeRange: { start, end } } = (0, _pluginsystem.useTimeRange)();
    const { data: client } = (0, _pluginsystem.useDatasourceClient)(datasource);
    const enabled = !!client && !!query;
    return (0, _reactquery.useQuery)({
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
function useFieldValues(field, query, datasource) {
    const { absoluteTimeRange: { start, end } } = (0, _pluginsystem.useTimeRange)();
    const { data: client } = (0, _pluginsystem.useDatasourceClient)(datasource);
    const enabled = !!client && !!query;
    return (0, _reactquery.useQuery)({
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
