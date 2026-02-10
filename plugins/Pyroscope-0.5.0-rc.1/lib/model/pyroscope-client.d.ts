import { RequestHeaders } from '@perses-dev/core';
import { DatasourceClient } from '@perses-dev/plugin-system';
import { SearchProfilesParameters, SearchProfilesResponse, SearchProfileTypesParameters, SearchProfileTypesResponse, SearchLabelNamesParameters, SearchLabelNamesResponse, SearchLabelValuesParameters, SearchLabelValuesResponse } from './api-types';
interface PyroscopeClientOptions {
    datasourceUrl: string;
    headers?: RequestHeaders;
}
export interface PyroscopeClient extends DatasourceClient {
    options: PyroscopeClientOptions;
    searchProfiles(params: SearchProfilesParameters, headers?: RequestHeaders): Promise<SearchProfilesResponse>;
    searchProfileTypes(params: SearchProfileTypesParameters, headers: RequestHeaders, body: Record<string, string | number>): Promise<SearchProfileTypesResponse>;
    searchLabelNames(params: SearchLabelNamesParameters, headers: RequestHeaders, body: Record<string, string | number>): Promise<SearchLabelNamesResponse>;
    searchLabelValues(params: SearchLabelValuesParameters, headers: RequestHeaders, body: Record<string, string | number>): Promise<SearchLabelValuesResponse>;
    searchServices(params: SearchLabelValuesParameters, headers: RequestHeaders): Promise<SearchLabelValuesResponse>;
}
export interface QueryOptions {
    datasourceUrl: string;
    headers?: RequestHeaders;
}
export declare const executeRequest: <T>(...args: Parameters<typeof global.fetch>) => Promise<T>;
/**
 * Returns profiling data.
 */
export declare function searchProfiles(params: SearchProfilesParameters, queryOptions: QueryOptions): Promise<SearchProfilesResponse>;
/**
 * Returns a list of all profile types.
 */
export declare function searchProfileTypes(params: SearchProfileTypesParameters, queryOptions: QueryOptions, body: Record<string, string | number>): Promise<SearchProfileTypesResponse>;
/**
 * Returns a list of all label names.
 */
export declare function searchLabelNames(params: SearchLabelNamesParameters, queryOptions: QueryOptions, body: Record<string, string | number>): Promise<SearchLabelNamesResponse>;
/**
 * Returns a list of all label values for a given label name.
 */
export declare function searchLabelValues(params: SearchLabelValuesParameters, queryOptions: QueryOptions, body: Record<string, string | number>): Promise<SearchLabelValuesResponse>;
/**
 * Returns a list of all services.
 * This is a special case of label values where the label name is "service_name".
 */
export declare function searchServices(params: SearchLabelValuesParameters, queryOptions: QueryOptions): Promise<SearchLabelValuesResponse>;
export {};
//# sourceMappingURL=pyroscope-client.d.ts.map