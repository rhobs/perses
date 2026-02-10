import { otlptracev1 } from '@perses-dev/core';
import { TracingGanttChartPanelProps } from './TracingGanttChartPanel';
export declare function DownloadTraceAction(props: TracingGanttChartPanelProps): import("react/jsx-runtime").JSX.Element | null;
/**
 * A trace can only contain spans with the same trace id. Therefore, let's return the trace id of the first span.
 * Exported for tests only.
 */
export declare function getFilename(trace: otlptracev1.TracesData): string;
//# sourceMappingURL=PanelActions.d.ts.map