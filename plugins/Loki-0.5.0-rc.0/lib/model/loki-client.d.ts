import { LokiQueryResponse, LokiQueryRangeResponse, LokiLabelsResponse, LokiLabelValuesResponse, LokiSeriesResponse, LokiIndexStatsResponse, LokiVolumeResponse, LokiRequestHeaders } from './loki-client-types';
export interface LokiQueryParams {
    query: string;
    time?: string;
    direction?: 'forward' | 'backward';
    limit?: number;
}
export interface LokiQueryRangeParams {
    query: string;
    start: string;
    end: string;
    step?: string;
    interval?: string;
    direction?: 'forward' | 'backward';
    limit?: number;
}
export interface LokiVolumeParams {
    query: string;
    start: string;
    end: string;
    step?: string;
    limit?: number;
}
export interface LokiApiOptions {
    datasourceUrl: string;
    headers?: LokiRequestHeaders;
}
export interface LokiClient {
    options: {
        datasourceUrl: string;
    };
    query: (params: LokiQueryParams, headers?: LokiRequestHeaders) => Promise<LokiQueryResponse>;
    queryRange: (params: LokiQueryRangeParams, headers?: LokiRequestHeaders) => Promise<LokiQueryRangeResponse>;
    labels: (start?: string, end?: string, headers?: LokiRequestHeaders) => Promise<LokiLabelsResponse>;
    labelValues: (label: string, start?: string, end?: string, headers?: LokiRequestHeaders) => Promise<LokiLabelValuesResponse>;
    series: (match: string[], start?: string, end?: string, headers?: LokiRequestHeaders) => Promise<LokiSeriesResponse>;
    volume: (params: LokiVolumeParams, headers?: LokiRequestHeaders) => Promise<LokiVolumeResponse>;
    volumeRange: (params: LokiVolumeParams, headers?: LokiRequestHeaders) => Promise<LokiVolumeResponse>;
    indexStats: (query: string, start?: string, end?: string, headers?: LokiRequestHeaders) => Promise<LokiIndexStatsResponse>;
}
export declare function query(params: LokiQueryParams, options: LokiApiOptions): Promise<LokiQueryResponse>;
export declare function toUnixSeconds(val: string | number | Date): string;
export declare function queryRange(params: LokiQueryRangeParams, options: LokiApiOptions): Promise<LokiQueryRangeResponse>;
export declare function labels(start: string | undefined, end: string | undefined, options: LokiApiOptions): Promise<LokiLabelsResponse>;
export declare function labelValues(label: string, start: string | undefined, end: string | undefined, options: LokiApiOptions): Promise<LokiLabelValuesResponse>;
export declare function series(match: string[], start: string | undefined, end: string | undefined, options: LokiApiOptions): Promise<LokiSeriesResponse>;
export declare function volume(params: LokiVolumeParams, options: LokiApiOptions): Promise<LokiVolumeResponse>;
export declare function volumeRange(params: LokiVolumeParams, options: LokiApiOptions): Promise<LokiVolumeResponse>;
export declare function indexStats(query: string, start: string | undefined, end: string | undefined, options: LokiApiOptions): Promise<LokiIndexStatsResponse>;
//# sourceMappingURL=loki-client.d.ts.map