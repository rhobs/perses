import { ReactElement } from 'react';
import { Span, Trace } from '../trace';
import { CustomLinks } from '../../gantt-chart-model';
export interface DetailPaneProps {
    customLinks?: CustomLinks;
    trace: Trace;
    span: Span;
    onCloseBtnClick: () => void;
}
/**
 * DetailPane renders a sidebar showing the span attributes etc.
 */
export declare function DetailPane(props: DetailPaneProps): ReactElement;
//# sourceMappingURL=DetailPane.d.ts.map