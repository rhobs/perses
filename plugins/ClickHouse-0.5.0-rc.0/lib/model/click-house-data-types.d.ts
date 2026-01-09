import { LogData, TimeSeriesData } from '@perses-dev/core';
export interface ClickHouseTimeSeriesData extends TimeSeriesData {
    logs?: LogData;
}
export interface TimeSeriesEntry {
    time: string;
    log_count: number | string;
}
//# sourceMappingURL=click-house-data-types.d.ts.map