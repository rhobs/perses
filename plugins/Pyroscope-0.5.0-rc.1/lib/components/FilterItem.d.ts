import { ReactElement } from 'react';
import { PyroscopeDatasourceSelector } from '../model';
import { LabelFilter } from '../utils/types';
export interface FilterItemProps {
    datasource: PyroscopeDatasourceSelector;
    value: LabelFilter;
    onChange?: (value: LabelFilter) => void;
    deleteItem?: () => void;
}
export declare function FilterItem(props: FilterItemProps): ReactElement;
//# sourceMappingURL=FilterItem.d.ts.map