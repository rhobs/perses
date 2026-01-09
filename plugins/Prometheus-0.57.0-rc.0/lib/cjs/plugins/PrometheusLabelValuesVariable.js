"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PrometheusLabelValuesVariable", {
    enumerable: true,
    get: function() {
        return PrometheusLabelValuesVariable;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const _model = require("../model");
const _prometheusvariables = require("./prometheus-variables");
const PrometheusLabelValuesVariable = {
    getVariableOptions: async (spec, ctx)=>{
        const pluginDef = spec;
        const datasourceSelector = (0, _pluginsystem.datasourceSelectValueToSelector)(spec.datasource ?? _model.DEFAULT_PROM, ctx.variables, await ctx.datasourceStore.listDatasourceSelectItems(_model.PROM_DATASOURCE_KIND)) ?? _model.DEFAULT_PROM;
        const client = await ctx.datasourceStore.getDatasourceClient(datasourceSelector);
        const match = pluginDef.matchers ? pluginDef.matchers.map((m)=>(0, _pluginsystem.replaceVariables)(m, ctx.variables)) : undefined;
        const timeRange = (0, _model.getPrometheusTimeRange)(ctx.timeRange);
        const { data: options } = await client.labelValues({
            labelName: (0, _pluginsystem.replaceVariables)(pluginDef.labelName, ctx.variables),
            'match[]': match,
            ...timeRange
        });
        return {
            data: (0, _prometheusvariables.stringArrayToVariableOptions)(options)
        };
    },
    dependsOn: (spec)=>{
        const matcherVariables = spec.matchers?.map((m)=>(0, _pluginsystem.parseVariables)(m)).flat() || [];
        const labelVariables = (0, _pluginsystem.parseVariables)(spec.labelName);
        const datasourceVariables = spec.datasource && (0, _pluginsystem.isVariableDatasource)(spec.datasource) ? (0, _pluginsystem.parseVariables)(spec.datasource) : [];
        return {
            variables: [
                ...matcherVariables,
                ...labelVariables,
                ...datasourceVariables
            ]
        };
    },
    OptionsEditorComponent: _prometheusvariables.PrometheusLabelValuesVariableEditor,
    createInitialOptions: ()=>({
            labelName: ''
        })
};
