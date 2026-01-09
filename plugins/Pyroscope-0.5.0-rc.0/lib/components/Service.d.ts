import { ReactElement } from 'react';
import { PyroscopeDatasourceSelector } from '../model';
export interface ServiceProps {
    datasource: PyroscopeDatasourceSelector;
    value: string;
    onChange?(value: string): void;
}
export declare function Service(props: ServiceProps): ReactElement;
//# sourceMappingURL=Service.d.ts.map