import { ReactElement } from 'react';
import { Viewport } from '../utils';
import { CustomLinks, TracingGanttChartOptions } from '../../gantt-chart-model';
import { Span, Trace } from '../trace';
export interface GanttTableProps {
    options: TracingGanttChartOptions;
    customLinks?: CustomLinks;
    trace: Trace;
    viewport: Viewport;
    selectedSpan?: Span;
    onSpanClick: (span: Span) => void;
}
export declare function GanttTable(props: GanttTableProps): ReactElement;
//# sourceMappingURL=GanttTable.d.ts.map