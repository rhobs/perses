import { TimeSeriesQueryPlugin } from '@perses-dev/plugin-system';
import { LokiMatrixResult } from '../../model/loki-client-types';
import { LokiTimeSeriesQuerySpec } from './loki-time-series-query-types';
export type LokiMatrixResponse = {
    resultType: 'matrix';
    result: LokiMatrixResult[];
};
export declare const getLokiTimeSeriesData: TimeSeriesQueryPlugin<LokiTimeSeriesQuerySpec>['getTimeSeriesData'];
//# sourceMappingURL=get-loki-time-series-data.d.ts.map