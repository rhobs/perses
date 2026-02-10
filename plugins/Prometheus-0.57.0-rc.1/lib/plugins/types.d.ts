import { DurationString, HTTPProxy } from '@perses-dev/core';
import { DatasourceSelectValue } from '@perses-dev/plugin-system';
import { PrometheusDatasourceSelector } from '../model';
export declare const DEFAULT_SCRAPE_INTERVAL: DurationString;
export interface PrometheusDatasourceSpec {
    directUrl?: string;
    proxy?: HTTPProxy;
    scrapeInterval?: DurationString;
    queryParams?: Record<string, string>;
}
export interface PrometheusVariableOptionsBase {
    datasource?: DatasourceSelectValue<PrometheusDatasourceSelector>;
}
export type PrometheusLabelNamesVariableOptions = PrometheusVariableOptionsBase & {
    matchers?: string[];
};
export type PrometheusLabelValuesVariableOptions = PrometheusVariableOptionsBase & {
    labelName: string;
    matchers?: string[];
};
export type PrometheusPromQLVariableOptions = PrometheusVariableOptionsBase & {
    expr: string;
    labelName: string;
};
//# sourceMappingURL=types.d.ts.map