import { replaceVariables, parseVariables, datasourceSelectValueToSelector, isVariableDatasource } from '@perses-dev/plugin-system';
import { DEFAULT_PROM, getPrometheusTimeRange, PROM_DATASOURCE_KIND } from '../model';
import { stringArrayToVariableOptions, PrometheusLabelNamesVariableEditor } from './prometheus-variables';
export const PrometheusLabelNamesVariable = {
    getVariableOptions: async (spec, ctx)=>{
        const datasourceSelector = datasourceSelectValueToSelector(spec.datasource ?? DEFAULT_PROM, ctx.variables, await ctx.datasourceStore.listDatasourceSelectItems(PROM_DATASOURCE_KIND)) ?? DEFAULT_PROM;
        const client = await ctx.datasourceStore.getDatasourceClient(datasourceSelector);
        const match = spec.matchers ? spec.matchers.map((m)=>replaceVariables(m, ctx.variables)) : undefined;
        const timeRange = getPrometheusTimeRange(ctx.timeRange);
        const { data: options } = await client.labelNames({
            'match[]': match,
            ...timeRange
        });
        return {
            data: stringArrayToVariableOptions(options)
        };
    },
    dependsOn: (spec)=>{
        const matcherVariables = spec.matchers?.map((m)=>parseVariables(m)).flat() || [];
        const datasourceVariables = spec.datasource && isVariableDatasource(spec.datasource) ? parseVariables(spec.datasource) : [];
        return {
            variables: [
                ...matcherVariables,
                ...datasourceVariables
            ]
        };
    },
    OptionsEditorComponent: PrometheusLabelNamesVariableEditor,
    createInitialOptions: ()=>({})
};

//# sourceMappingURL=PrometheusLabelNamesVariable.js.map