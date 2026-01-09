"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VictoriaLogsFieldNamesVariable", {
    enumerable: true,
    get: function() {
        return VictoriaLogsFieldNamesVariable;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const _model = require("../../model");
const _VictoriaLogsFieldNamesVariableEditor = require("./VictoriaLogsFieldNamesVariableEditor");
const _utils = require("../utils");
const VictoriaLogsFieldNamesVariable = {
    getVariableOptions: async (spec, ctx)=>{
        const datasourceSelector = (0, _pluginsystem.datasourceSelectValueToSelector)(spec.datasource ?? _model.DEFAULT_VICTORIALOGS, ctx.variables, await ctx.datasourceStore.listDatasourceSelectItems(_model.VICTORIALOGS_DATASOURCE_KIND)) ?? _model.DEFAULT_VICTORIALOGS;
        const client = await ctx.datasourceStore.getDatasourceClient(datasourceSelector);
        const timeRange = (0, _utils.getVictoriaLogsTimeRange)(ctx.timeRange);
        const query = (0, _pluginsystem.replaceVariables)(spec.query, ctx.variables);
        const { values } = query ? await client.fieldNames({
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
        const datasourceVariables = spec.datasource && (0, _pluginsystem.isVariableDatasource)(spec.datasource) ? (0, _pluginsystem.parseVariables)(spec.datasource) : [];
        return {
            variables: [
                ...queryVariables,
                ...datasourceVariables
            ]
        };
    },
    OptionsEditorComponent: _VictoriaLogsFieldNamesVariableEditor.VictoriaLogsFieldNamesVariableEditor,
    createInitialOptions: ()=>({
            query: ''
        })
};
