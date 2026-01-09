import { Completion, CompletionContext, CompletionResult } from '@codemirror/autocomplete';
import { EditorState } from '@codemirror/state';
import { Tree } from '@lezer/common';
import { EditorView } from '@uiw/react-codemirror';
import { CompletionConfig } from './TraceQLExtension';
/** CompletionScope specifies the completion kind, e.g. whether to complete tag names or values etc. */
type CompletionScope = {
    kind: 'Scopes';
} | {
    kind: 'TagName';
    scope: 'resource' | 'span' | 'intrinsic';
} | {
    kind: 'TagValue';
    tag: string;
};
/**
 * Completions specifies the identified scopes and position of the completion in the current editor text.
 * For example, when entering '{' the following completions are possible: Scopes(), TagName(scope=intrinsic)
 */
export interface Completions {
    scopes: CompletionScope[];
    from: number;
    to?: number;
}
export declare function complete(completionCfg: CompletionConfig, { state, pos }: CompletionContext): Promise<CompletionResult | null>;
/**
 * Identify completion scopes (e.g. TagValue) and position, based on the current node in the syntax tree.
 *
 * For development, you can visualize the tree of a TraceQL query using this tool:
 * https://github.com/grafana/lezer-traceql/blob/main/tools/tree-viz.html
 *
 * Function is exported for tests only.
 */
export declare function identifyCompletions(state: EditorState, pos: number, tree: Tree): Completions | undefined;
/**
 * Add quotes to the completion text in case quotes are not present already.
 * This handles the following cases:
 * { name=HTTP
 * { name="x
 * { name="x" where cursor is after the 'x'
 */
export declare function applyQuotedCompletion(view: EditorView, completion: Completion, from: number, to: number): void;
export {};
//# sourceMappingURL=complete.d.ts.map