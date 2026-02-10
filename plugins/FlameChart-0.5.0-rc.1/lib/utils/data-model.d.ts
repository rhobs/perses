/**
 * FlameChart datamodel
 */
export interface FlameChartSample {
    name: number;
    value: [
        level: number,
        start_val: number,
        end_val: number,
        name: string,
        total_percentage: number,
        self_percentage: number,
        shortName: string,
        self: number,
        total: number
    ];
    itemStyle: {
        color: string;
    };
}
/**
 * TableChart datamodel
 */
export interface TableChartSample {
    id: number;
    name: string;
    self: number;
    total: number;
}
/**
 * SeriesChart datamodel
 */
export interface SeriesSample {
    id: number;
    value: [number, number];
}
//# sourceMappingURL=data-model.d.ts.map