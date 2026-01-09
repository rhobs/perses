import { DatasourceSelector } from '@perses-dev/core';
import { DatasourceSelectValue } from '@perses-dev/plugin-system';
export declare const VICTORIALOGS_DATASOURCE_KIND: "VictoriaLogsDatasource";
export interface VictoriaLogsDatasourceSelector extends DatasourceSelector {
    kind: typeof VICTORIALOGS_DATASOURCE_KIND;
}
export declare const DEFAULT_VICTORIALOGS: VictoriaLogsDatasourceSelector;
export declare function isDefaultVictoriaLogsSelector(datasourceSelectValue: DatasourceSelectValue<VictoriaLogsDatasourceSelector>): boolean;
export declare function isVictoriaLogsDatasourceSelector(datasourceSelectValue: DatasourceSelectValue<DatasourceSelector>): datasourceSelectValue is VictoriaLogsDatasourceSelector;
//# sourceMappingURL=selectors.d.ts.map