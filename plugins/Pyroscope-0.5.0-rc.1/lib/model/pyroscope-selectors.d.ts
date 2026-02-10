import { DatasourceSelector } from '@perses-dev/core';
export declare const PYROSCOPE_DATASOURCE_KIND: "PyroscopeDatasource";
/**
 * DatasourceSelector for Pyroscope Datasources.
 */
export interface PyroscopeDatasourceSelector extends DatasourceSelector {
    kind: typeof PYROSCOPE_DATASOURCE_KIND;
}
/**
 * A default selector that asks for the default Pyroscope Datasource.
 */
export declare const DEFAULT_PYROSCOPE: PyroscopeDatasourceSelector;
/**
 * Returns true if the provided PyroscopeDatasourceSelector is the default one.
 */
export declare function isDefaultPyroscopeSelector(selector: PyroscopeDatasourceSelector): boolean;
/**
 * Type guard to make sure a DatasourceSelector is a Pyroscope one.
 */
export declare function isPyroscopeDatasourceSelector(selector: DatasourceSelector): selector is PyroscopeDatasourceSelector;
//# sourceMappingURL=pyroscope-selectors.d.ts.map