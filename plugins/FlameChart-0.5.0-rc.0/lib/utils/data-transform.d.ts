import { ProfileMetaData, StackTrace } from '@perses-dev/core';
import { FlameChartSample as Sample, TableChartSample } from './data-model';
/**
 * Filter the global stacktrace by a function ID to focus on that function and display its corresponding flame chart
 */
export declare function filterStackTraceById(trace: StackTrace, id: number | undefined): StackTrace;
/**
 * Build series data for the flame chart option
 */
export declare function buildSamples(palette: string, metadata: ProfileMetaData | undefined, traces: StackTrace, searchValue: string, id?: number): Sample[];
/**
 * Transform query results to a tabular format for the table chart
 */
export declare function tableRecursionJson(jsonObj: StackTrace, searchValue: string): TableChartSample[];
/**
 * Finds the total sample value of the series data item with the specified name.
 */
export declare function findTotalSampleByName(seriesData: Sample[], name: number | undefined): number | undefined;
export declare function getMaxDepth(trace: StackTrace): number;
//# sourceMappingURL=data-transform.d.ts.map