import { ReactElement } from 'react';
import { ColumnSettings } from '../../models';
export interface ColumnsEditorProps {
    columnSettings: ColumnSettings[];
    onChange: (columnOptions: ColumnSettings[]) => void;
}
export declare function ColumnsEditor({ columnSettings, onChange }: ColumnsEditorProps): ReactElement;
//# sourceMappingURL=ColumnsEditor.d.ts.map