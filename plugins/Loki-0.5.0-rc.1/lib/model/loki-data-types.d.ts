import { LogData, AbsoluteTimeRange, TimeSeries, TimeSeriesData, TimeSeriesMetadata } from '@perses-dev/core';
export interface LokiTimeSeriesData extends TimeSeriesData {
    logs?: LogData;
    resultType?: 'matrix' | 'streams';
}
export interface LokiQueryResult {
    timeRange?: AbsoluteTimeRange;
    stepMs?: number;
    series: TimeSeries[];
    logs?: LogData;
    resultType: 'matrix' | 'streams';
    metadata?: TimeSeriesMetadata;
}
//# sourceMappingURL=loki-data-types.d.ts.map