import { OptionsEditorProps } from '@perses-dev/plugin-system';
import { TempoTraceQuerySpec } from '../../model/trace-query-model';
export type TraceQueryEditorProps = OptionsEditorProps<TempoTraceQuerySpec>;
/**
 * A hook for managing the `query` state in PrometheusTimeSeriesQuerySpec. Returns the `query` value, along with
 * `onChange` and `onBlur` event handlers to the input. Keeps a local copy of the user's input and only syncs those
 * changes with the overall spec value once the input is blurred to prevent re-running queries in the panel's preview
 * every time the user types.
 */
export declare function useQueryState(props: TraceQueryEditorProps): {
    query: string;
    handleQueryChange: (e: string) => void;
    handleQueryBlur: () => void;
};
//# sourceMappingURL=query-editor-model.d.ts.map