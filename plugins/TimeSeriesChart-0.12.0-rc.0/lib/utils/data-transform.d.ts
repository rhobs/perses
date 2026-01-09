import type { YAXisComponentOption } from 'echarts';
import { LineSeriesOption } from 'echarts/charts';
import { StepOptions, TimeScale, TimeSeries, TimeSeriesData } from '@perses-dev/core';
import { LegacyTimeSeries, EChartsDataFormat, TimeSeriesOption } from '@perses-dev/components';
import { useTimeSeriesQueries, PanelData } from '@perses-dev/plugin-system';
import { TimeSeriesChartVisualOptions, TimeSeriesChartYAxisOptions, LineStyleType, LOG_BASE } from '../time-series-chart-model';
export type RunningQueriesState = ReturnType<typeof useTimeSeriesQueries>;
export declare const EMPTY_GRAPH_DATA: EChartsDataFormat;
export declare const HIDE_DATAPOINTS_LIMIT = 70;
export declare const BLUR_FADEOUT_OPACITY = 0.5;
/**
 * Given a list of running queries, calculates a common time scale for use on
 * the x axis (i.e. start/end dates and a step that is divisible into all of
 * the queries' steps).
 */
export declare function getCommonTimeScaleForQueries(queries: Array<PanelData<TimeSeriesData>>): TimeScale | undefined;
/**
 * Gets ECharts line series option properties for regular trends
 */
export declare function getTimeSeries(id: string, datasetIndex: number, formattedName: string, visual: TimeSeriesChartVisualOptions, timeScale: TimeScale, paletteColor: string, querySettings?: {
    lineStyle?: LineStyleType;
    areaOpacity?: number;
}): TimeSeriesOption;
/**
 * Gets threshold-specific line series styles
 * markLine cannot be used since it does not update yAxis max / min
 * and threshold data needs to show in the tooltip
 */
export declare function getThresholdSeries(name: string, threshold: StepOptions, seriesIndex: number): LineSeriesOption;
/**
 * Converts percent threshold into absolute step value
 * If max is undefined, use the max value from time series data as default
 */
export declare function convertPercentThreshold(percent: number, data: LegacyTimeSeries[] | TimeSeries[], max?: number, min?: number): number;
/**
 * Converts Perses panel yAxis from dashboard spec to ECharts supported yAxis options.
 * Handles both linear and logarithmic scales with appropriate min/max calculations.
 */
export declare function convertPanelYAxis(inputAxis: TimeSeriesChartYAxisOptions | undefined, useLogarithmicBase: LOG_BASE): YAXisComponentOption;
/**
 * Rounds down to nearest number with one significant digit.
 *
 * Examples:
 * 1. 675 --> 600
 * 2. 0.567 --> 0.5
 * 3. -12 --> -20
 */
export declare function roundDown(num: number): number;
//# sourceMappingURL=data-transform.d.ts.map