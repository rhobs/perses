import { OptionsEditorProps } from '@perses-dev/plugin-system';
import { PyroscopeProfileQuerySpec } from '../../model/profile-query-model';
import { LabelFilter } from '../../utils/types';
export type ProfileQueryEditorProps = OptionsEditorProps<PyroscopeProfileQuerySpec>;
/**
 * Hook to manage `maxNodes` state to ensure panel preview rerender when maxNodes is changed.
 */
export declare function useMaxNodesState(props: ProfileQueryEditorProps): {
    maxNodes: string;
    handleMaxNodesChange: (e: string) => void;
    maxNodesHasError: boolean;
};
/**
 * Hook to manage `profileType` state to ensure panel preview rerender when profileType is changed.
 */
export declare function useProfileTypeState(props: ProfileQueryEditorProps): {
    profileType: string;
    handleProfileTypeChange: (e: string) => void;
};
/**
 * Hook to manage `service` state to ensure panel preview rerender when service is changed.
 */
export declare function useServiceState(props: ProfileQueryEditorProps): {
    service: string;
    handleServiceChange: (e: string) => void;
};
/**
 * Hook to manage `filters` state to ensure panel preview rerender when filters is changed.
 */
export declare function useFiltersState(props: ProfileQueryEditorProps): {
    filters: LabelFilter[];
    handleFiltersChange: (f: LabelFilter[]) => void;
};
//# sourceMappingURL=query-editor-model.d.ts.map