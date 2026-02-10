import { ReactElement } from 'react';
import { ProfileData } from '@perses-dev/core';
export interface TableChartProps {
    width: number;
    height: number;
    data: ProfileData;
    searchValue: string;
    onSearchValueChange: (value: string) => void;
    onSelectedIdChange: (id: number) => void;
}
export declare function TableChart(props: TableChartProps): ReactElement;
//# sourceMappingURL=TableChart.d.ts.map