import { ReactElement } from 'react';
import { VictoriaLogsDatasourceSpec } from './types';
export interface VictoriaLogsDatasourceEditorProps {
    value: VictoriaLogsDatasourceSpec;
    onChange: (next: VictoriaLogsDatasourceSpec) => void;
    isReadonly?: boolean;
}
export declare function VictoriaLogsDatasourceEditor(props: VictoriaLogsDatasourceEditorProps): ReactElement;
//# sourceMappingURL=VictoriaLogsDatasourceEditor.d.ts.map