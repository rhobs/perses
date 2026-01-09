import { DatasourceSelector } from '@perses-dev/core';
import { DatasourceSelectValue } from '@perses-dev/plugin-system';
export declare const LOKI_DATASOURCE_KIND: "LokiDatasource";
export interface LokiDatasourceSelector extends DatasourceSelector {
    kind: typeof LOKI_DATASOURCE_KIND;
}
export declare const DEFAULT_LOKI: LokiDatasourceSelector;
export declare function isDefaultLokiSelector(datasourceSelectValue: DatasourceSelectValue): boolean;
export declare function isLokiDatasourceSelector(datasourceSelectValue: DatasourceSelectValue): datasourceSelectValue is LokiDatasourceSelector;
//# sourceMappingURL=loki-selectors.d.ts.map