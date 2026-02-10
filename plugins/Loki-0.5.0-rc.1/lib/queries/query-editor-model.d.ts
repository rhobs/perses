import { OptionsEditorProps } from '@perses-dev/plugin-system';
/**
 * Generic type for any Loki query spec that has a query field
 */
type LokiQuerySpec = {
    query: string;
};
/**
 * A hook for managing the `query` state in Loki query specs. Returns the `query` value, along with
 * `onChange` and `onBlur` event handlers to the input. Keeps a local copy of the user's input and only syncs those
 * changes with the overall spec value once the input is blurred to prevent re-running queries in the panel's preview
 * every time the user types.
 */
export declare function useQueryState<T extends LokiQuerySpec>(props: OptionsEditorProps<T>): {
    query: string;
    handleQueryChange: (e: string) => void;
    handleQueryBlur: () => void;
};
export {};
//# sourceMappingURL=query-editor-model.d.ts.map