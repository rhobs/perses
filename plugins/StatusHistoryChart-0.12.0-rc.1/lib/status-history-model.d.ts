import { ValueMapping } from '@perses-dev/core';
import { LegendSpecOptions, OptionsEditorProps } from '@perses-dev/plugin-system';
export declare function createInitialStatusHistoryChartOptions(): Record<string, unknown>;
export interface StatusHistoryChartOptions {
    legend?: LegendSpecOptions;
    mappings?: ValueMapping[];
    sorting?: StatusHistorySorting;
}
export type StatusHistorySorting = 'asc' | 'desc';
export type StatusHistroyChartEditorProps = OptionsEditorProps<StatusHistoryChartOptions>;
//# sourceMappingURL=status-history-model.d.ts.map