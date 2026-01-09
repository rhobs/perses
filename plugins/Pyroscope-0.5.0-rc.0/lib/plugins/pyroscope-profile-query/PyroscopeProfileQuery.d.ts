import { LabelFilter } from '../../utils/types';
import { PyroscopeProfileQueryEditor } from './PyroscopeProfileQueryEditor';
export declare const PyroscopeProfileQuery: {
    getProfileData: (spec: import("../..").PyroscopeProfileQuerySpec, ctx: import("@perses-dev/plugin-system").ProfileQueryContext, abortSignal?: AbortSignal) => Promise<import("@perses-dev/core").ProfileData>;
    OptionsEditorComponent: typeof PyroscopeProfileQueryEditor;
    createInitialOptions: () => {
        maxNodes: number;
        datasource?: string;
        service: string;
        profileType: string;
        filters: LabelFilter[];
    };
};
//# sourceMappingURL=PyroscopeProfileQuery.d.ts.map