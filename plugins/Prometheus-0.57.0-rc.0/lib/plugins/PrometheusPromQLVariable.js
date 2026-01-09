import { replaceVariables, parseVariables, datasourceSelectValueToSelector, isVariableDatasource } from '@perses-dev/plugin-system';
import { DEFAULT_PROM, PROM_DATASOURCE_KIND } from '../model';
import { capturingMatrix, capturingVector, stringArrayToVariableOptions, PrometheusPromQLVariableEditor } from './prometheus-variables';
export const PrometheusPromQLVariable = {
    getVariableOptions: async (spec, ctx)=>{
        const datasourceSelector = datasourceSelectValueToSelector(spec.datasource ?? DEFAULT_PROM, ctx.variables, await ctx.datasourceStore.listDatasourceSelectItems(PROM_DATASOURCE_KIND)) ?? DEFAULT_PROM;
        const client = await ctx.datasourceStore.getDatasourceClient(datasourceSelector);
        // TODO we may want to manage a range query as well.
        const { data: options } = await client.instantQuery({
            query: replaceVariables(spec.expr, ctx.variables)
        });
        const labelName = replaceVariables(spec.labelName, ctx.variables);
        let values = [];
        if (options?.resultType === 'matrix') {
            values = capturingMatrix(options, labelName);
        } else if (options?.resultType === 'vector') {
            values = capturingVector(options, labelName);
        }
        return {
            data: stringArrayToVariableOptions(values)
        };
    },
    dependsOn: (spec)=>{
        const exprVariables = parseVariables(spec.expr);
        const labelVariables = parseVariables(spec.labelName);
        const datasourceVariables = spec.datasource && isVariableDatasource(spec.datasource) ? parseVariables(spec.datasource) : [];
        return {
            variables: [
                ...exprVariables,
                ...labelVariables,
                ...datasourceVariables
            ]
        };
    },
    OptionsEditorComponent: PrometheusPromQLVariableEditor,
    createInitialOptions: ()=>({
            expr: '',
            labelName: ''
        })
};

//# sourceMappingURL=PrometheusPromQLVariable.js.map