import { TimeSeriesQueryPlugin } from '@perses-dev/plugin-system';
import { VictoriaLogsTimeSeriesQuerySpec } from './types';
export type VictoriaLogsMatrixResult = {
    metric: Record<string, string>;
    values: Array<[number, string]>;
};
export type VictoriaLogsMatrixResponse = {
    resultType: 'matrix';
    result: VictoriaLogsMatrixResult[];
};
export declare const getVictoriaLogsTimeSeriesData: TimeSeriesQueryPlugin<VictoriaLogsTimeSeriesQuerySpec>['getTimeSeriesData'];
//# sourceMappingURL=query.d.ts.map