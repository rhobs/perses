"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VictoriaLogsLogQuery", {
    enumerable: true,
    get: function() {
        return VictoriaLogsLogQuery;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const _query = require("./query");
const _VictoriaLogsLogQueryEditor = require("./VictoriaLogsLogQueryEditor");
const VictoriaLogsLogQuery = {
    getLogData: _query.getVictoriaLogsLogData,
    OptionsEditorComponent: _VictoriaLogsLogQueryEditor.VictoriaLogsLogQueryEditor,
    createInitialOptions: ()=>({
            query: ''
        }),
    dependsOn: (spec)=>{
        const queryVariables = (0, _pluginsystem.parseVariables)(spec.query);
        const allVariables = [
            ...new Set([
                ...queryVariables
            ])
        ];
        return {
            variables: allVariables
        };
    }
};
