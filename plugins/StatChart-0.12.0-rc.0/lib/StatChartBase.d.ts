import { FC } from 'react';
import { FormatOptions } from '@perses-dev/core';
import { LineSeriesOption } from 'echarts/charts';
import { FontSizeOption, GraphSeries } from '@perses-dev/components';
import { ColorMode } from './stat-chart-model';
export interface StatChartData {
    color: string;
    calculatedValue?: string | number | null;
    seriesData?: GraphSeries;
}
export interface StatChartProps {
    width: number;
    height: number;
    data: StatChartData;
    format?: FormatOptions;
    sparkline?: LineSeriesOption;
    showSeriesName?: boolean;
    valueFontSize?: FontSizeOption;
    colorMode?: ColorMode;
}
export declare const StatChartBase: FC<StatChartProps>;
//# sourceMappingURL=StatChartBase.d.ts.map