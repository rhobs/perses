import { replaceVariables, parseVariables, datasourceSelectValueToSelector, isVariableDatasource } from '@perses-dev/plugin-system';
import { DEFAULT_PROM, getPrometheusTimeRange, PROM_DATASOURCE_KIND } from '../model';
import { stringArrayToVariableOptions, PrometheusLabelValuesVariableEditor } from './prometheus-variables';
export const PrometheusLabelValuesVariable = {
    getVariableOptions: async (spec, ctx)=>{
        const pluginDef = spec;
        const datasourceSelector = datasourceSelectValueToSelector(spec.datasource ?? DEFAULT_PROM, ctx.variables, await ctx.datasourceStore.listDatasourceSelectItems(PROM_DATASOURCE_KIND)) ?? DEFAULT_PROM;
        const client = await ctx.datasourceStore.getDatasourceClient(datasourceSelector);
        const match = pluginDef.matchers ? pluginDef.matchers.map((m)=>replaceVariables(m, ctx.variables)) : undefined;
        const timeRange = getPrometheusTimeRange(ctx.timeRange);
        const { data: options } = await client.labelValues({
            labelName: replaceVariables(pluginDef.labelName, ctx.variables),
            'match[]': match,
            ...timeRange
        });
        return {
            data: stringArrayToVariableOptions(options)
        };
    },
    dependsOn: (spec)=>{
        const matcherVariables = spec.matchers?.map((m)=>parseVariables(m)).flat() || [];
        const labelVariables = parseVariables(spec.labelName);
        const datasourceVariables = spec.datasource && isVariableDatasource(spec.datasource) ? parseVariables(spec.datasource) : [];
        return {
            variables: [
                ...matcherVariables,
                ...labelVariables,
                ...datasourceVariables
            ]
        };
    },
    OptionsEditorComponent: PrometheusLabelValuesVariableEditor,
    createInitialOptions: ()=>({
            labelName: ''
        })
};

//# sourceMappingURL=PrometheusLabelValuesVariable.js.map