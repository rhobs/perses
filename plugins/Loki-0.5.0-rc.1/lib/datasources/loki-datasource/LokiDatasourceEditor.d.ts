import { ReactElement } from 'react';
import { LokiDatasourceSpec } from './loki-datasource-types';
export interface LokiDatasourceEditorProps {
    value: LokiDatasourceSpec;
    onChange: (next: LokiDatasourceSpec) => void;
    isReadonly?: boolean;
}
export declare function LokiDatasourceEditor(props: LokiDatasourceEditorProps): ReactElement;
//# sourceMappingURL=LokiDatasourceEditor.d.ts.map