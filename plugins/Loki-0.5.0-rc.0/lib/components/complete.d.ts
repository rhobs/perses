import { Completion, CompletionContext, CompletionResult } from '@codemirror/autocomplete';
import { EditorState } from '@codemirror/state';
import { Tree } from '@lezer/common';
import { EditorView } from '@uiw/react-codemirror';
import { CompletionConfig } from './logql-extension';
/** CompletionScope specifies the completion kind, e.g. whether to complete label names or values */
type CompletionScope = {
    kind: 'LabelName';
} | {
    kind: 'LabelValue';
    label: string;
};
/**
 * CompletionInfo specifies the identified scope and position of the completion in the current editor text.
 */
export interface CompletionInfo {
    scope: CompletionScope;
    from: number;
    to?: number;
}
export declare function complete(completionCfg: CompletionConfig, { state, pos }: CompletionContext): Promise<CompletionResult | null>;
/**
 * Identify completion scope (e.g. LabelName, LabelValue) and position, based on the current node in the syntax tree.
 *
 * Function is exported for tests only.
 */
export declare function identifyCompletion(state: EditorState, pos: number, tree: Tree): CompletionInfo | undefined;
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