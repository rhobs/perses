import { ReactElement } from 'react';
export interface PieChartData {
    id?: string;
    name: string;
    value: number | null;
}
export interface PieChartBaseProps {
    width: number;
    height: number;
    data: PieChartData[] | null;
    showLabels?: boolean;
}
export declare function PieChartBase(props: PieChartBaseProps): ReactElement;
//# sourceMappingURL=PieChartBase.d.ts.map