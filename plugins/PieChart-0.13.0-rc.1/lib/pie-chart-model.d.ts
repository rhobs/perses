import { ModeOption, SortOption } from '@perses-dev/components';
import { CalculationType, Definition, FormatOptions } from '@perses-dev/core';
import { LegendSpecOptions, OptionsEditorProps } from '@perses-dev/plugin-system';
export declare const DEFAULT_FORMAT: FormatOptions;
export declare const DEFAULT_SORT: SortOption;
export declare const DEFAULT_MODE: ModeOption;
export interface BarChartDefinition extends Definition<PieChartOptions> {
    kind: 'PieChart';
}
export interface PieChartOptions {
    calculation: CalculationType;
    format?: FormatOptions;
    colorPalette?: string[];
    legend?: LegendSpecOptions;
    mode?: ModeOption;
    radius: number;
    showLabels?: boolean;
    sort?: SortOption;
}
export type PieChartOptionsEditorProps = OptionsEditorProps<PieChartOptions>;
export declare function createInitialPieChartOptions(): PieChartOptions;
//# sourceMappingURL=pie-chart-model.d.ts.map