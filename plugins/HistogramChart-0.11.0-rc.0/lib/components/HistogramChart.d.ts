import { ReactElement } from 'react';
import { FormatOptions, BucketTuple, ThresholdOptions } from '@perses-dev/core';
export interface HistogramChartData {
    buckets: BucketTuple[];
}
export interface HistogramChartProps {
    width: number;
    height: number;
    data: HistogramChartData;
    format?: FormatOptions;
    min?: number;
    max?: number;
    thresholds?: ThresholdOptions;
}
export declare function HistogramChart({ width, height, data, format, min, max, thresholds, }: HistogramChartProps): ReactElement | null;
//# sourceMappingURL=HistogramChart.d.ts.map