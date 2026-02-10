export type LokiResultType = 'vector' | 'matrix' | 'streams';
export interface LokiQueryStats {
    ingester?: Record<string, unknown>;
    store?: Record<string, unknown>;
    summary?: Record<string, unknown>;
    [key: string]: unknown;
}
export interface LokiVectorResult {
    metric: Record<string, string>;
    value: [number, string];
}
export interface LokiMatrixResult {
    metric: Record<string, string>;
    values: Array<[number, string]>;
}
export interface LokiStreamResult {
    stream: Record<string, string>;
    values: Array<[string, string]>;
}
export interface LokiQueryResponse {
    status: 'success' | 'error';
    data: {
        resultType: 'vector' | 'streams';
        result: LokiVectorResult[] | LokiStreamResult[];
        stats?: LokiQueryStats;
    };
}
export type LokiQueryRangeResponse = LokiQueryRangeMatrixResponse & LokiQueryRangeStreamsResponse;
export interface LokiQueryRangeMatrixResponse {
    status: 'success' | 'error';
    data: {
        resultType: 'matrix';
        result: LokiMatrixResult[];
        stats?: LokiQueryStats;
    };
}
export interface LokiQueryRangeStreamsResponse {
    status: 'success' | 'error';
    data: {
        resultType: 'streams';
        result: LokiStreamResult[];
        stats?: LokiQueryStats;
    };
}
export interface LokiLabelsResponse {
    status: 'success' | 'error';
    data: string[];
}
export interface LokiLabelValuesResponse {
    status: 'success' | 'error';
    data: string[];
}
export interface LokiSeriesResponse {
    status: 'success' | 'error';
    data: Array<Record<string, string>>;
}
export interface LokiIndexStatsResponse {
    streams: number;
    chunks: number;
    entries: number;
    bytes: number;
}
export type LokiVolumeResponse = Record<string, unknown>;
export type LokiRequestHeaders = Record<string, string>;
//# sourceMappingURL=loki-client-types.d.ts.map