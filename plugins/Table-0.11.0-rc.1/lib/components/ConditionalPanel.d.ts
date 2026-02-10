import { Grid2Props as GridProps } from '@mui/material';
import { CellSettings } from '../models';
export interface ConditionalRuleProps extends Omit<GridProps, 'onChange'> {
    cell: CellSettings;
    onChange: (cell: CellSettings) => void;
    onDelete: () => void;
}
export declare function ConditionalRule({ cell, onChange, onDelete, ...props }: ConditionalRuleProps): import("react/jsx-runtime").JSX.Element;
export interface ConditionalPanelProps {
    cellSettings?: CellSettings[];
    onChange: (cellSettings: CellSettings[] | undefined) => void;
    addButtonText?: string;
}
export declare function ConditionalPanel({ cellSettings, onChange, addButtonText, }: ConditionalPanelProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ConditionalPanel.d.ts.map