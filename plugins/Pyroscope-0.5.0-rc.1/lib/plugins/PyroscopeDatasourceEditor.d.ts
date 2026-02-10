import { ReactElement } from 'react';
import { PyroscopeDatasourceSpec } from './pyroscope-datasource-types';
export interface PyroscopeDatasourceEditorProps {
    value: PyroscopeDatasourceSpec;
    onChange: (next: PyroscopeDatasourceSpec) => void;
    isReadonly?: boolean;
}
export declare function PyroscopeDatasourceEditor(props: PyroscopeDatasourceEditorProps): ReactElement;
//# sourceMappingURL=PyroscopeDatasourceEditor.d.ts.map