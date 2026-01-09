import { VictoriaLogsFieldItem, VictoriaLogsFieldNamesResponse, VictoriaLogsFieldValuesResponse } from '../model';
import { VariableOption } from '@perses-dev/plugin-system';
import { AbsoluteTimeRange, DatasourceSelector, StatusError } from '@perses-dev/core';
import { UseQueryResult } from '@tanstack/react-query';
export declare const fieldItemsToVariableOptions: (values?: VictoriaLogsFieldItem[]) => VariableOption[];
export declare function getVictoriaLogsTimeRange(timeRange: AbsoluteTimeRange): {
    start: string;
    end: string;
};
export declare function useFieldNames(query: string, datasource: DatasourceSelector): UseQueryResult<VictoriaLogsFieldNamesResponse, StatusError>;
export declare function useFieldValues(field: string, query: string, datasource: DatasourceSelector): UseQueryResult<VictoriaLogsFieldValuesResponse, StatusError>;
//# sourceMappingURL=utils.d.ts.map