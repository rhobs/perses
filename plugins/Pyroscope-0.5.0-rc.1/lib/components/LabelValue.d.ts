import { ReactElement } from 'react';
import { PyroscopeDatasourceSelector } from '../model';
export interface LabelValueProps {
    datasource: PyroscopeDatasourceSelector;
    value: string;
    labelName: string;
    onChange?(value: string): void;
}
export declare function LabelValue(props: LabelValueProps): ReactElement;
//# sourceMappingURL=LabelValue.d.ts.map