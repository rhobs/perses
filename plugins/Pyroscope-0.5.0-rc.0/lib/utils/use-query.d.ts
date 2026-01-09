import { DatasourceSelector, StatusError } from '@perses-dev/core';
import { UseQueryResult } from '@tanstack/react-query';
import { SearchLabelNamesResponse, SearchLabelValuesResponse, SearchProfileTypesResponse } from '../model';
export declare function useLabelNames(datasource: DatasourceSelector): UseQueryResult<SearchLabelNamesResponse, StatusError>;
export declare function useLabelValues(datasource: DatasourceSelector, labelName: string): UseQueryResult<SearchLabelValuesResponse, StatusError>;
export declare function useProfileTypes(datasource: DatasourceSelector): UseQueryResult<SearchProfileTypesResponse, StatusError>;
export declare function useServices(datasource: DatasourceSelector): UseQueryResult<SearchLabelValuesResponse, StatusError>;
export declare function filterLabelNamesOptions(labelNamesOptions: string[]): string[];
//# sourceMappingURL=use-query.d.ts.map