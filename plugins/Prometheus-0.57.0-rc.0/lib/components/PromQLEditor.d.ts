import { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { CompleteConfiguration } from '@prometheus-io/codemirror-promql';
import { ReactElement } from 'react';
import { PrometheusDatasourceSelector } from '../model';
export type PromQLEditorProps = {
    completeConfig: CompleteConfiguration;
    datasource: PrometheusDatasourceSelector;
    isReadOnly?: boolean;
    treeViewMetadata?: {
        minStepMs: number;
        intervalMs: number;
    };
} & Omit<ReactCodeMirrorProps, 'theme' | 'extensions'>;
export declare function PromQLEditor({ completeConfig, datasource, isReadOnly, treeViewMetadata, ...rest }: PromQLEditorProps): ReactElement;
//# sourceMappingURL=PromQLEditor.d.ts.map