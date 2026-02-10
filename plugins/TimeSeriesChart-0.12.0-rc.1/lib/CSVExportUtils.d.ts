export interface SeriesDataPoint {
    timestamp: number | string;
    value: unknown;
}
export interface DataSeries {
    name?: string;
    formattedName?: string;
    legendName?: string;
    displayName?: string;
    legend?: string;
    labels?: Record<string, string>;
    values: Array<[number | string, unknown]> | SeriesDataPoint[];
}
export interface ExportableData {
    series: DataSeries[];
    timeRange?: {
        start: string | number;
        end: string | number;
    };
    stepMs?: number;
    metadata?: Record<string, unknown>;
}
export declare const isExportableData: (data: unknown) => data is ExportableData;
export interface QueryDataInput {
    data?: unknown;
    error?: unknown;
    isFetching?: boolean;
}
export declare const extractExportableData: (queryResults: QueryDataInput[]) => ExportableData | undefined;
export declare const formatLegendName: (series: DataSeries, seriesIndex: number) => string;
export declare const sanitizeColumnName: (name: string) => string;
export declare const sanitizeFilename: (filename: string) => string;
export declare const formatTimestampISO: (timestamp: number | string) => string;
export declare const escapeCsvValue: (value: unknown) => string;
export interface ExportDataOptions {
    data: ExportableData;
}
export declare const exportDataAsCSV: ({ data }: ExportDataOptions) => Blob;
//# sourceMappingURL=CSVExportUtils.d.ts.map