import { ProfileQueryPlugin } from '@perses-dev/plugin-system';
import { AbsoluteTimeRange } from '@perses-dev/core';
import { PyroscopeProfileQuerySpec } from '../../model';
export declare function getUnixTimeRange(timeRange: AbsoluteTimeRange): {
    start: number;
    end: number;
};
export declare const getProfileData: ProfileQueryPlugin<PyroscopeProfileQuerySpec>['getProfileData'];
//# sourceMappingURL=get-profile-data.d.ts.map