import { Definition, FormatOptions, ThresholdOptions } from '@perses-dev/core';
import { OptionsEditorProps } from '@perses-dev/plugin-system';
export declare const DEFAULT_FORMAT: FormatOptions;
export declare const DEFAULT_THRESHOLDS: ThresholdOptions;
export declare const DEFAULT_MIN_PERCENT = 0;
export declare const DEFAULT_MAX_PERCENT = 100;
export declare const DEFAULT_MIN_PERCENT_DECIMAL = 0;
export declare const DEFAULT_MAX_PERCENT_DECIMAL = 1;
export type LOG_BASE = undefined | 2 | 10;
export declare const LOG_BASE_CONFIG: Record<string, {
    label: string;
    log: LOG_BASE;
}>;
export declare const LOG_BASE_OPTIONS: {
    label: string;
    log: LOG_BASE;
    id: string;
}[];
/**
 * The schema for a HistogramChart panel.
 */
export interface HistogramChartDefinition extends Definition<HistogramChartOptions> {
    kind: 'HistogramChart';
}
/**
 * The Options object type supported by the HistogramChart panel plugin.
 */
export interface HistogramChartOptions {
    format?: FormatOptions;
    min?: number;
    max?: number;
    thresholds?: ThresholdOptions;
    logBase?: LOG_BASE;
}
export type HistogramChartOptionsEditorProps = OptionsEditorProps<HistogramChartOptions>;
/**
 * Creates the initial/empty options for a HistogramChart panel.
 */
export declare function createInitialHistogramChartOptions(): HistogramChartOptions;
//# sourceMappingURL=histogram-chart-model.d.ts.map