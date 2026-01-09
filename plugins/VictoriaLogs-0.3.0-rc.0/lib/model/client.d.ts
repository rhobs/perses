import { VictoriaLogsStreamQueryRangeResponse, VictoriaLogsStatsQueryRangeResponse, VictoriaLogsFieldNamesResponse, VictoriaLogsFieldValuesResponse, VictoriaLogsRequestHeaders } from './types';
export interface VictoriaLogsBaseParams {
    start: string;
    end: string;
}
export interface VictoriaLogsStreamQueryRangeParams extends VictoriaLogsBaseParams {
    query: string;
    limit?: number;
    offset?: number;
}
export interface VictoriaLogsStatsQueryRangeParams extends VictoriaLogsBaseParams {
    query: string;
    step?: string;
}
export interface VictoriaLogsFieldNamesParams extends VictoriaLogsBaseParams {
    query: string;
}
export interface VictoriaLogsFieldValuesParams extends VictoriaLogsBaseParams {
    query: string;
    field: string;
}
export interface VictoriaLogsApiOptions {
    datasourceUrl: string;
    headers?: VictoriaLogsRequestHeaders;
}
export interface VictoriaLogsClient {
    options: {
        datasourceUrl: string;
    };
    streamQueryRange: (params: VictoriaLogsStreamQueryRangeParams, headers?: VictoriaLogsRequestHeaders) => Promise<VictoriaLogsStreamQueryRangeResponse>;
    statsQueryRange: (params: VictoriaLogsStatsQueryRangeParams, headers?: VictoriaLogsRequestHeaders) => Promise<VictoriaLogsStatsQueryRangeResponse>;
    fieldNames: (params: VictoriaLogsFieldNamesParams, headers?: VictoriaLogsRequestHeaders) => Promise<VictoriaLogsFieldNamesResponse>;
    fieldValues: (params: VictoriaLogsFieldValuesParams, headers?: VictoriaLogsRequestHeaders) => Promise<VictoriaLogsFieldValuesResponse>;
}
export declare function streamQueryRange(params: VictoriaLogsStreamQueryRangeParams, options: VictoriaLogsApiOptions): Promise<VictoriaLogsStreamQueryRangeResponse>;
export declare function statsQueryRange(params: VictoriaLogsStatsQueryRangeParams, options: VictoriaLogsApiOptions): Promise<VictoriaLogsStatsQueryRangeResponse>;
export declare function fieldNames(params: VictoriaLogsFieldNamesParams, options: VictoriaLogsApiOptions): Promise<VictoriaLogsFieldNamesResponse>;
export declare function fieldValues(params: VictoriaLogsFieldValuesParams, options: VictoriaLogsApiOptions): Promise<VictoriaLogsFieldValuesResponse>;
//# sourceMappingURL=client.d.ts.map