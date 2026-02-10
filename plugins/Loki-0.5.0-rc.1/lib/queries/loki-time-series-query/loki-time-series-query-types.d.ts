import { DatasourceSelector } from '@perses-dev/core';
import { LokiQueryRangeMatrixResponse } from '../../model/loki-client-types';
export interface LokiTimeSeriesQuerySpec {
    query: string;
    datasource?: DatasourceSelector;
    step?: string;
}
export type LokiTimeSeriesQueryResponse = LokiQueryRangeMatrixResponse;
//# sourceMappingURL=loki-time-series-query-types.d.ts.map