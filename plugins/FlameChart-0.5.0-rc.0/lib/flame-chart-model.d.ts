import { Definition } from '@perses-dev/core';
import { OptionsEditorProps } from '@perses-dev/plugin-system';
/**
 * The schema for a FlameChart panel.
 */
export interface FlameChartDefinition extends Definition<FlameChartOptions> {
    kind: 'FlameChart';
}
export interface FlameChartOptions {
    palette: 'package-name' | 'value';
    showSettings: boolean;
    showSeries: boolean;
    showTable: boolean;
    showFlameGraph: boolean;
    traceHeight?: number;
}
export type FlameChartOptionsEditorProps = OptionsEditorProps<FlameChartOptions>;
export declare function createInitialFlameChartOptions(): FlameChartOptions;
//# sourceMappingURL=flame-chart-model.d.ts.map