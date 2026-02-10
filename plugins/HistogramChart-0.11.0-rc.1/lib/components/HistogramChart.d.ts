import { ReactElement } from 'react';
import { FormatOptions, BucketTuple, ThresholdOptions } from '@perses-dev/core';
import { LOG_BASE } from '../histogram-chart-model';
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
    logBase?: LOG_BASE;
}
export declare function HistogramChart({ width, height, data, format, min, max, thresholds, logBase, }: HistogramChartProps): ReactElement | null;
//# sourceMappingURL=HistogramChart.d.ts.map