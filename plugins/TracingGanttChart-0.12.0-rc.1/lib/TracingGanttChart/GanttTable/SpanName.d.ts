import { ReactElement } from 'react';
import { Span } from '../trace';
import { CustomLinks } from '../../gantt-chart-model';
export interface SpanNameProps {
    customLinks?: CustomLinks;
    span: Span;
    nameColumnWidth: number;
}
/**
 * SpanName renders the entire left column of a SpanRow, i.e. the hierarchy and the service and span name
 */
export declare function SpanName(props: SpanNameProps): ReactElement;
//# sourceMappingURL=SpanName.d.ts.map