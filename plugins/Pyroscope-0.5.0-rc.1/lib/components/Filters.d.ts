import { ReactElement } from 'react';
import { PyroscopeDatasourceSelector } from '../model';
import { LabelFilter } from '../utils/types';
export interface FiltersProps {
    datasource: PyroscopeDatasourceSelector;
    value: LabelFilter[];
    onChange?: (value: LabelFilter[]) => void;
}
export declare function Filters(props: FiltersProps): ReactElement;
//# sourceMappingURL=Filters.d.ts.map