export type VictoriaLogsResultType = 'vector' | 'matrix' | 'streams';
export interface VictoriaLogsQueryStats {
    ingester?: Record<string, unknown>;
    store?: Record<string, unknown>;
    summary?: Record<string, unknown>;
    [key: string]: unknown;
}
export type VictoriaLogsLogEntry = {
    _msg: string;
    _time: string;
    [key: string]: string;
};
export type VictoriaLogsStreamQueryRangeResponse = VictoriaLogsLogEntry[];
export type VictoriaLogsStatsQueryRangeResult = {
    metric: Record<string, string>;
    values: Array<[number, string]>;
};
export type VictoriaLogsStatsQueryRangeData = {
    resultType: string;
    result: VictoriaLogsStatsQueryRangeResult[];
};
export type VictoriaLogsStatsQueryRangeResponse = {
    status: 'success' | 'error';
    error?: string;
    data: VictoriaLogsStatsQueryRangeData;
};
export type VictoriaLogsFieldItem = {
    value: string;
    hits: number;
};
export interface VictoriaLogsFieldNamesResponse {
    values: VictoriaLogsFieldItem[];
}
export interface VictoriaLogsFieldValuesResponse {
    values: VictoriaLogsFieldItem[];
}
export interface VictoriaLogsIndexStatsResponse {
    streams: number;
    chunks: number;
    entries: number;
    bytes: number;
}
export type VictoriaLogsRequestHeaders = Record<string, string>;
//# sourceMappingURL=types.d.ts.map