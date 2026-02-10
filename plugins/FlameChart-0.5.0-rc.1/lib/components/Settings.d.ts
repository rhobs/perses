import { ReactElement } from 'react';
import { FlameChartOptions } from '../flame-chart-model';
export interface SettingsProps {
    value: FlameChartOptions;
    selectedId: number;
    onChangePalette: (palette: 'package-name' | 'value') => void;
    onSelectedIdChange: (newId: number) => void;
    onDisplayChange: (value: 'table' | 'flame-graph' | 'both') => void;
}
export declare function Settings(props: SettingsProps): ReactElement;
//# sourceMappingURL=Settings.d.ts.map