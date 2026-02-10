import { ActionOptions, OptionsEditorProps, SelectionOptions } from '@perses-dev/plugin-system';
export interface TimeSeriesTableOptions {
    /**
     * Enable row selection with checkboxes
     */
    selection?: SelectionOptions;
    /**
     * Configure actions that can be executed on selected rows
     */
    actions?: ActionOptions;
}
export type TimeSeriesTableSettingsEditorProps = OptionsEditorProps<TimeSeriesTableOptions>;
//# sourceMappingURL=model.d.ts.map