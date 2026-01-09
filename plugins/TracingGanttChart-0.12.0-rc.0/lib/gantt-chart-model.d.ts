/**
 * The Options object type supported by the TracingGanttChart panel plugin.
 */
export interface TracingGanttChartOptions {
    visual?: TracingGanttChartVisualOptions;
    links?: TracingGanttChartCustomLinks;
    /**
     * Span ID of the initially selected span.
     * This property is used in the explore view when clicking on span links, and is intentionally not exposed in the Cue schema.
     */
    selectedSpanId?: string;
}
export interface TracingGanttChartVisualOptions {
    palette?: TracingGanttChartPaletteOptions;
}
export interface TracingGanttChartPaletteOptions {
    mode: 'auto' | 'categorical';
}
export interface TracingGanttChartCustomLinks {
    /**
     * Link to a trace.
     * Supported variables: datasourceName, traceId
     */
    trace?: string;
    /**
     * Link to a trace, with the span selected.
     * Supported variables: datasourceName, traceId, spanId
     */
    span?: string;
    attributes?: TracingGanttChartCustomAttributeLink[];
}
export interface TracingGanttChartCustomAttributeLink {
    name: string;
    /**
     * Link to an arbitrary attribute value.
     * Supported variables: datasourceName and all other attributes
     */
    link: string;
}
export interface CustomLinks {
    variables: Record<string, string>;
    links: TracingGanttChartCustomLinks;
}
/**
 * Creates the initial/empty options for a TracingGanttChart panel.
 */
export declare function createInitialTracingGanttChartOptions(): Record<string, unknown>;
//# sourceMappingURL=gantt-chart-model.d.ts.map