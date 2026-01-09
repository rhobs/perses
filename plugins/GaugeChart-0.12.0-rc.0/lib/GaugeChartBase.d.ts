import { FormatOptions } from '@perses-dev/core';
import { GaugeSeriesOption } from 'echarts/charts';
import { ReactElement } from 'react';
export type GaugeChartValue = number | null | undefined;
export type GaugeSeries = {
    value: GaugeChartValue;
    label: string;
};
export interface GaugeChartBaseProps {
    width: number;
    height: number;
    data: GaugeSeries;
    format: FormatOptions;
    axisLine: GaugeSeriesOption['axisLine'];
    max?: number;
    valueFontSize: string;
    progressWidth: number;
    titleFontSize: number;
}
export declare function GaugeChartBase(props: GaugeChartBaseProps): ReactElement;
//# sourceMappingURL=GaugeChartBase.d.ts.map