import { FontSizeOption } from '@perses-dev/components';
import { CalculationType, Definition, FormatOptions, ThresholdOptions, ValueMapping } from '@perses-dev/core';
import { OptionsEditorProps } from '@perses-dev/plugin-system';
/**
 * The schema for a StatChart panel.
 */
export interface StatChartDefinition extends Definition<StatChartOptions> {
    kind: 'StatChart';
}
export type ColorMode = 'none' | 'value' | 'background_solid';
export type ColorModeLabelItem = {
    id: ColorMode;
    label: string;
};
export declare const COLOR_MODE_LABELS: ColorModeLabelItem[];
export type legendMode = 'auto' | 'on' | 'off';
export type ShowLegendLabelItem = {
    id: legendMode;
    label: string;
    description?: string;
};
export declare const SHOW_LEGEND_LABELS: ShowLegendLabelItem[];
export interface StatChartOptions {
    calculation: CalculationType;
    format: FormatOptions;
    metricLabel?: string;
    thresholds?: ThresholdOptions;
    sparkline?: StatChartSparklineOptions;
    valueFontSize?: FontSizeOption;
    mappings?: ValueMapping[];
    colorMode?: ColorMode;
    legendMode?: legendMode;
}
export interface StatChartSparklineOptions {
    color?: string;
    width?: number;
}
export type StatChartOptionsEditorProps = OptionsEditorProps<StatChartOptions>;
export declare function createInitialStatChartOptions(): StatChartOptions;
//# sourceMappingURL=stat-chart-model.d.ts.map