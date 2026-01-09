"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LokiLogQuery", {
    enumerable: true,
    get: function() {
        return LokiLogQuery;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const _getlokilogdata = require("./get-loki-log-data");
const _LokiLogQueryEditor = require("./LokiLogQueryEditor");
const LokiLogQuery = {
    getLogData: _getlokilogdata.getLokiLogData,
    OptionsEditorComponent: _LokiLogQueryEditor.LokiLogQueryEditor,
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
