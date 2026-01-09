import { ReactElement } from 'react';
import { ProfileData } from '@perses-dev/core';
export interface FlameChartProps {
    width: number;
    height: number;
    data: ProfileData;
    palette: 'package-name' | 'value';
    selectedId: number;
    searchValue: string;
    onSelectedIdChange: (newId: number) => void;
}
export declare function FlameChart(props: FlameChartProps): ReactElement;
//# sourceMappingURL=FlameChart.d.ts.map