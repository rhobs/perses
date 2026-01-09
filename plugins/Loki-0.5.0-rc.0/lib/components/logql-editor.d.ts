import { ReactElement } from 'react';
import { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { CompletionConfig } from './logql-extension';
export type LogQLEditorProps = Omit<ReactCodeMirrorProps, 'theme' | 'extensions'> & {
    completionConfig?: CompletionConfig;
};
export declare function LogQLEditor(props: LogQLEditorProps): ReactElement;
//# sourceMappingURL=logql-editor.d.ts.map