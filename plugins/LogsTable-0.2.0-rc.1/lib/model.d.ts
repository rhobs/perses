import { LogData, ThresholdOptions } from '@perses-dev/core';
import { PanelProps, LegendSpecOptions, SelectionOptions, OptionsEditorProps, ActionOptions } from '@perses-dev/plugin-system';
export type LogsTableProps = PanelProps<LogsTableOptions, LogsQueryData>;
export interface LogsQueryData {
    logs?: LogData;
}
export interface LogsTableOptions {
    legend?: LegendSpecOptions;
    thresholds?: ThresholdOptions;
    allowWrap?: boolean;
    enableDetails?: boolean;
    showTime?: boolean;
    showAll?: boolean;
    selection?: SelectionOptions;
    actions?: ActionOptions;
}
export type LogsTableSettingsEditorProps = OptionsEditorProps<LogsTableOptions>;
//# sourceMappingURL=model.d.ts.map