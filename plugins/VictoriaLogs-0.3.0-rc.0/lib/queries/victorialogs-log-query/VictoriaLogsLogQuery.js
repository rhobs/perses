import { parseVariables } from '@perses-dev/plugin-system';
import { getVictoriaLogsLogData } from './query';
import { VictoriaLogsLogQueryEditor } from './VictoriaLogsLogQueryEditor';
export const VictoriaLogsLogQuery = {
    getLogData: getVictoriaLogsLogData,
    OptionsEditorComponent: VictoriaLogsLogQueryEditor,
    createInitialOptions: ()=>({
            query: ''
        }),
    dependsOn: (spec)=>{
        const queryVariables = parseVariables(spec.query);
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

//# sourceMappingURL=VictoriaLogsLogQuery.js.map