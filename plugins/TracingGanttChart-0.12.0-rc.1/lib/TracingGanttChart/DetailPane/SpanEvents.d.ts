import { ReactElement } from 'react';
import { Trace, Span } from '../trace';
import { CustomLinks } from '../../gantt-chart-model';
export interface SpanEventListProps {
    customLinks?: CustomLinks;
    trace: Trace;
    span: Span;
}
export declare function SpanEventList(props: SpanEventListProps): ReactElement;
//# sourceMappingURL=SpanEvents.d.ts.map