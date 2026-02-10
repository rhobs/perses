import { ReactElement } from 'react';
import { TempoClient } from '../model';
export interface AttributeFiltersProps {
    client?: TempoClient;
    query: string;
    setQuery: (x: string) => void;
}
export declare function AttributeFilters(props: AttributeFiltersProps): ReactElement;
//# sourceMappingURL=AttributeFilters.d.ts.map