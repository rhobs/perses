import { LabelFilter } from '../utils/types';
import { PyroscopeDatasourceSelector } from './pyroscope-selectors';
/**
 * The spec/options for the PyroscopeProfileQuery plugin.
 */
export interface PyroscopeProfileQuerySpec {
    datasource?: PyroscopeDatasourceSelector;
    maxNodes?: number;
    profileType: string;
    filters?: LabelFilter[];
    service?: string;
}
//# sourceMappingURL=profile-query-model.d.ts.map