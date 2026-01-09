/**
 * The Options object type supported by the TraceTable panel plugin.
 */
export interface TraceTableOptions {
    visual?: TraceTableVisualOptions;
    links?: TraceTableCustomLinks;
}
export interface TraceTableVisualOptions {
    palette?: TraceTablePaletteOptions;
}
export interface TraceTablePaletteOptions {
    mode: 'auto' | 'categorical';
}
export interface TraceTableCustomLinks {
    /**
     * Link to a trace.
     * Supported variables: datasourceName, traceId
     */
    trace?: string;
}
/**
 * Creates the initial/empty options for a TraceTable panel.
 */
export declare function createInitialTraceTableOptions(): TraceTableOptions;
//# sourceMappingURL=trace-table-model.d.ts.map