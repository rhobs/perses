import { ChangeEventHandler } from 'react';
import { FlameChartOptionsEditorProps } from '../flame-chart-model';
/**
 * Hook to manage `palette` state.
 */
export declare function usePaletteState(props: FlameChartOptionsEditorProps): {
    handlePaletteChange: (newPalette: 'package-name' | 'value') => void;
};
/**
 * Hook to manage `traceHeight` state.
 */
export declare function useTraceHeightState(props: FlameChartOptionsEditorProps): {
    handleTraceHeightChange: ChangeEventHandler<HTMLInputElement>;
};
/**
 * Hook to manage `showSettings` state.
 */
export declare function useShowSettingsState(props: FlameChartOptionsEditorProps): {
    handleShowSettingsChange: (newValue: boolean) => void;
};
/**
 * Hook to manage `showSeries` state.
 */
export declare function useShowSeriesState(props: FlameChartOptionsEditorProps): {
    handleShowSeriesChange: (newValue: boolean) => void;
};
/**
 * Hook to manage `showTable` state.
 */
export declare function useShowTableState(props: FlameChartOptionsEditorProps): {
    handleShowTableChange: (newValue: boolean) => void;
};
/**
 * Hook to manage `showFlameGraph` state.
 */
export declare function useShowFlameGraphState(props: FlameChartOptionsEditorProps): {
    handleShowFlameGraphChange: (newValue: boolean) => void;
};
/**
 * Reset all settings to their initial values
 */
export declare function resetSettings(props: FlameChartOptionsEditorProps): void;
//# sourceMappingURL=utils.d.ts.map