import { replaceVariables, parseVariables, datasourceSelectValueToSelector, isVariableDatasource } from '@perses-dev/plugin-system';
import { DEFAULT_VICTORIALOGS, VICTORIALOGS_DATASOURCE_KIND } from '../../model';
import { VictoriaLogsFieldNamesVariableEditor } from './VictoriaLogsFieldNamesVariableEditor';
import { fieldItemsToVariableOptions, getVictoriaLogsTimeRange } from '../utils';
export const VictoriaLogsFieldNamesVariable = {
    getVariableOptions: async (spec, ctx)=>{
        const datasourceSelector = datasourceSelectValueToSelector(spec.datasource ?? DEFAULT_VICTORIALOGS, ctx.variables, await ctx.datasourceStore.listDatasourceSelectItems(VICTORIALOGS_DATASOURCE_KIND)) ?? DEFAULT_VICTORIALOGS;
        const client = await ctx.datasourceStore.getDatasourceClient(datasourceSelector);
        const timeRange = getVictoriaLogsTimeRange(ctx.timeRange);
        const query = replaceVariables(spec.query, ctx.variables);
        const { values } = query ? await client.fieldNames({
            query: query,
            ...timeRange
        }) : {
            values: []
        };
        return {
            data: fieldItemsToVariableOptions(values)
        };
    },
    dependsOn: (spec)=>{
        const queryVariables = parseVariables(spec.query);
        const datasourceVariables = spec.datasource && isVariableDatasource(spec.datasource) ? parseVariables(spec.datasource) : [];
        return {
            variables: [
                ...queryVariables,
                ...datasourceVariables
            ]
        };
    },
    OptionsEditorComponent: VictoriaLogsFieldNamesVariableEditor,
    createInitialOptions: ()=>({
            query: ''
        })
};

//# sourceMappingURL=VictoriaLogsFieldNamesVariable.js.map