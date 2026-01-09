import { parseVariables } from '@perses-dev/plugin-system';
import { getLokiLogData } from './get-loki-log-data';
import { LokiLogQueryEditor } from './LokiLogQueryEditor';
export const LokiLogQuery = {
    getLogData: getLokiLogData,
    OptionsEditorComponent: LokiLogQueryEditor,
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

//# sourceMappingURL=LokiLogQuery.js.map