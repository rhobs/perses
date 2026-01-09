"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VictoriaLogsFieldValuesVariable", {
    enumerable: true,
    get: function() {
        return VictoriaLogsFieldValuesVariable;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const _model = require("../../model");
const _VictoriaLogsFieldValuesVariableEditor = require("./VictoriaLogsFieldValuesVariableEditor");
const _utils = require("../utils");
const VictoriaLogsFieldValuesVariable = {
    getVariableOptions: async (spec, ctx)=>{
        const datasourceSelector = (0, _pluginsystem.datasourceSelectValueToSelector)(spec.datasource ?? _model.DEFAULT_VICTORIALOGS, ctx.variables, await ctx.datasourceStore.listDatasourceSelectItems(_model.VICTORIALOGS_DATASOURCE_KIND)) ?? _model.DEFAULT_VICTORIALOGS;
        const client = await ctx.datasourceStore.getDatasourceClient(datasourceSelector);
        const query = (0, _pluginsystem.replaceVariables)(spec.query, ctx.variables);
        const timeRange = (0, _utils.getVictoriaLogsTimeRange)(ctx.timeRange);
        const { values } = query ? await client.fieldValues({
            field: (0, _pluginsystem.replaceVariables)(spec.field, ctx.variables),
            query: query,
            ...timeRange
        }) : {
            values: []
        };
        return {
            data: (0, _utils.fieldItemsToVariableOptions)(values)
        };
    },
    dependsOn: (spec)=>{
        const queryVariables = (0, _pluginsystem.parseVariables)(spec.query);
        const labelVariables = (0, _pluginsystem.parseVariables)(spec.field);
        const datasourceVariables = spec.datasource && (0, _pluginsystem.isVariableDatasource)(spec.datasource) ? (0, _pluginsystem.parseVariables)(spec.datasource) : [];
        return {
            variables: [
                ...queryVariables,
                ...labelVariables,
                ...datasourceVariables
            ]
        };
    },
    OptionsEditorComponent: _VictoriaLogsFieldValuesVariableEditor.VictoriaLogsFieldValuesVariableEditor,
    createInitialOptions: ()=>({
            field: '',
            query: ''
        })
};
