import { ReactElement } from 'react';
import { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { TempoClient } from '../model';
export interface TraceQLEditorProps extends Omit<ReactCodeMirrorProps, 'theme' | 'extensions'> {
    client?: TempoClient;
}
export declare function TraceQLEditor({ client, ...rest }: TraceQLEditorProps): ReactElement;
//# sourceMappingURL=TraceQLEditor.d.ts.map